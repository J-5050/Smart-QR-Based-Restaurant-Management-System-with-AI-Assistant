#!/usr/bin/env python3
import http.server
import socketserver
import json
import os
from urllib.parse import urlparse, unquote

import sys

# Port can be provided via env var or command-line arg
PORT = int(os.environ.get('PORT') or (sys.argv[1] if len(sys.argv) > 1 else 3000))
HERE = os.path.dirname(__file__)
DATA_FILE = os.path.join(HERE, 'data.json')
STATIC_DIR = os.path.abspath(os.path.join(HERE, '..'))

class Handler(http.server.SimpleHTTPRequestHandler):
    def _set_cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def _read_data(self):
        try:
            with open(DATA_FILE, 'r', encoding='utf8') as f:
                return json.load(f)
        except Exception:
            return {"orders": [], "nextOrderId": 1}

    def _write_data(self, data):
        with open(DATA_FILE, 'w', encoding='utf8') as f:
            json.dump(data, f, indent=2)

    def do_OPTIONS(self):
        self.send_response(200)
        self._set_cors()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path.startswith('/api/'):
            if parsed.path == '/api/orders':
                data = self._read_data()
                self.send_response(200)
                self._set_cors()
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(data.get('orders', [])).encode('utf8'))
                return
            if parsed.path == '/api/analytics':
                data = self._read_data()
                sales = sum((o.get('total') or 0) for o in data.get('orders', []) if o.get('status') != 'cancelled')
                itemsSold = {}
                for o in data.get('orders', []):
                    for it in o.get('items', []):
                        key = it.get('id') or it.get('name') or json.dumps(it)
                        itemsSold[key] = itemsSold.get(key, 0) + (it.get('qty') or 1)
                resp = { 'sales': sales, 'itemsSold': itemsSold, 'ordersCount': len(data.get('orders', [])) }
                self.send_response(200)
                self._set_cors()
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(resp).encode('utf8'))
                return
        # Fallback to static files from parent directory
        self.directory = STATIC_DIR
        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == '/api/orders':
            length = int(self.headers.get('content-length', 0))
            body = self.rfile.read(length).decode('utf8') if length else ''
            try:
                order = json.loads(body)
            except Exception:
                order = {}
            data = self._read_data()
            order['id'] = data.get('nextOrderId', 1)
            data['nextOrderId'] = order['id'] + 1
            order['status'] = order.get('status', 'pending')
            order['createdAt'] = order.get('createdAt') or __import__('datetime').datetime.utcnow().isoformat()
            data.setdefault('orders', []).append(order)
            self._write_data(data)
            self.send_response(201)
            self._set_cors()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(order).encode('utf8'))
            return
        # otherwise 404
        self.send_response(404)
        self._set_cors()
        self.end_headers()

    def do_PUT(self):
        parsed = urlparse(self.path)
        path = parsed.path
        if path.startswith('/api/orders/') and path.endswith('/status'):
            try:
                parts = path.split('/')
                order_id = int(parts[2])
            except Exception:
                self.send_response(400)
                self._set_cors()
                self.end_headers()
                return
            length = int(self.headers.get('content-length', 0))
            body = self.rfile.read(length).decode('utf8') if length else ''
            try:
                payload = json.loads(body)
                status = payload.get('status')
            except Exception:
                status = None
            if not status:
                self.send_response(400)
                self._set_cors()
                self.end_headers()
                return
            data = self._read_data()
            order = next((o for o in data.get('orders', []) if o.get('id') == order_id), None)
            if not order:
                self.send_response(404)
                self._set_cors()
                self.end_headers()
                return
            order['status'] = status
            order['updatedAt'] = __import__('datetime').datetime.utcnow().isoformat()
            self._write_data(data)
            self.send_response(200)
            self._set_cors()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(order).encode('utf8'))
            return
        self.send_response(404)
        self._set_cors()
        self.end_headers()

if __name__ == '__main__':
    os.chdir(STATIC_DIR)
    # Use a Threading server and allow address reuse where possible
    class ThreadingTCPServer(socketserver.ThreadingTCPServer):
        allow_reuse_address = True

    try:
        with ThreadingTCPServer(('', PORT), Handler) as httpd:
            print(f'Python fallback server running at http://localhost:{PORT}')
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print('Shutting down')
                httpd.server_close()
    except OSError as e:
        print('Failed to start server:', e)
        print('\nCommon reasons:')
        print('- Port', PORT, 'is already in use.')
        print('- Another process is listening on that port.')
        print('\nTo identify and free the port on Windows:')
        print('  1) Run: netstat -ano | findstr :%s' % PORT)
        print('  2) Note the PID from the rightmost column')
        print('  3) Terminate it: taskkill /PID <pid> /F')
        print('\nOr run this server on a different port:')
        print('  python python_server.py 4000')
