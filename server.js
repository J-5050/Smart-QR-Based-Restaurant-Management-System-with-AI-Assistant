const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const DATA_FILE = path.join(__dirname, 'data.json');

async function readData() {
  try {
    const txt = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(txt);
  } catch (e) {
    return { orders: [], nextOrderId: 1 };
  }
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend files from parent directory so you can open http://localhost:3000/menu.html
app.use(express.static(path.join(__dirname, '..')));

app.get('/api/orders', async (req, res) => {
  const data = await readData();
  res.json(data.orders);
});

app.post('/api/orders', async (req, res) => {
  const data = await readData();
  const order = req.body;
  order.id = data.nextOrderId++;
  order.status = 'pending';
  order.createdAt = new Date().toISOString();
  data.orders.push(order);
  await writeData(data);
  res.status(201).json(order);
});

app.put('/api/orders/:id/status', async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;
  const data = await readData();
  const order = data.orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = status;
  order.updatedAt = new Date().toISOString();
  await writeData(data);
  res.json(order);
});

app.get('/api/analytics', async (req, res) => {
  const data = await readData();
  const sales = data.orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0);
  const itemsSold = {};
  data.orders.forEach(o => (o.items || []).forEach(it => {
    const key = it.id || it.name || JSON.stringify(it);
    itemsSold[key] = (itemsSold[key] || 0) + (it.qty || 1);
  }));
  res.json({ sales, itemsSold, ordersCount: data.orders.length });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
