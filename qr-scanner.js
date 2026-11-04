// QR Code Scanner - Using qrious library (simplified version)

const QR_PATTERNS = [
    'table-1', 'table-2', 'table-3', 'table-4', 'table-5',
    'table-6', 'table-7', 'table-8', 'table-9', 'table-10',
    'table-11', 'table-12', 'table-13', 'table-14', 'table-15',
    'table-16', 'table-17', 'table-18', 'table-19', 'table-20'
];

/**
 * Initialize QR Code Scanner
 * Note: This is a simulation. For production, use a library like:
 * - jsQR
 * - instascan
 * - quagga2
 */

function initQRScanner() {
    const video = document.getElementById('qrVideo');
    if (!video) return;
    
    // Try to access camera
    const constraints = { video: { facingMode: 'environment' } };
    
    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            video.srcObject = stream;
            video.onloadedmetadata = function() {
                video.play();
                scanQRCode();
            };
        })
        .catch(err => {
            console.error('Camera access denied:', err);
            document.getElementById('qrResult').textContent = '❌ Camera not accessible. Using fallback method.';
            simulateQRScan();
        });
}

/**
 * Scan QR Code
 */
function scanQRCode() {
    const video = document.getElementById('qrVideo');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const scanInterval = setInterval(() => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Simple detection (in production, use jsQR or similar library)
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const result = detectQRCode(imageData);
            
            if (result) {
                clearInterval(scanInterval);
                handleQRScanned(result);
            }
        }
    }, 500);
    
    // Timeout after 30 seconds
    setTimeout(() => {
        clearInterval(scanInterval);
        console.log('QR scan timeout');
    }, 30000);
}

/**
 * Simple QR Code Detection (Placeholder)
 * In production, use jsQR library
 */
function detectQRCode(imageData) {
    // This is a placeholder - in real app, implement proper QR detection
    // For demo, randomly detect after a few attempts
    if (Math.random() > 0.7) {
        const qrCode = QR_PATTERNS[Math.floor(Math.random() * QR_PATTERNS.length)];
        return qrCode;
    }
    return null;
}

/**
 * Simulate QR Scan (Fallback)
 */
function simulateQRScan() {
    const modal = document.getElementById('qrModal');
    const resultElement = document.getElementById('qrResult');
    
    let scanProgress = 0;
    const scanInterval = setInterval(() => {
        scanProgress += 10;
        resultElement.textContent = `Scanning QR Code... ${scanProgress}%`;
        
        if (scanProgress >= 100) {
            clearInterval(scanInterval);
            const qrCode = QR_PATTERNS[Math.floor(Math.random() * QR_PATTERNS.length)];
            resultElement.textContent = `✅ QR Code Detected: ${qrCode}`;
            
            setTimeout(() => {
                handleQRScanned(qrCode);
            }, 1000);
        }
    }, 200);
}

/**
 * Generate QR Code for Table
 * Uses a simple SVG representation
 */
function generateTableQRCode(tableNumber) {
    // In production, use a library like qrious or qrcode.js
    // This creates a simple representation
    const qrData = `table-${tableNumber}`;
    const svg = `
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="white"/>
            <rect width="100" height="100" fill="black" x="10" y="10"/>
            <rect width="100" height="100" fill="black" x="100" y="100"/>
            <text x="100" y="140" text-anchor="middle" font-size="20" fill="black">${qrData}</text>
        </svg>
    `;
    return svg;
}

/**
 * Download QR Codes for All Tables
 */
function downloadTableQRCodes() {
    const zip = new Array();
    
    for (let tableNum = 1; tableNum <= 20; tableNum++) {
        const qrSvg = generateTableQRCode(tableNum);
        
        // Create downloadable QR code
        const element = document.createElement('a');
        element.setAttribute('href', 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(qrSvg));
        element.setAttribute('download', `table-${tableNum}-qr.svg`);
        element.click();
    }
}

// Initialize scanner when modal opens
document.addEventListener('DOMContentLoaded', () => {
    const qrModal = document.getElementById('qrModal');
    if (qrModal) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (qrModal.style.display === 'block') {
                    initQRScanner();
                }
            });
        });
        
        observer.observe(qrModal, { attributes: true });
    }
});

/**
 * Decode QR Code Data
 */
function decodeQRData(qrCode) {
    // Parse table number from QR code
    if (qrCode.startsWith('table-')) {
        const tableNumber = qrCode.replace('table-', '');
        return {
            type: 'table',
            tableNumber: parseInt(tableNumber),
            timestamp: new Date().toISOString()
        };
    }
    return null;
}
