// Voice Ordering Functionality

let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;

function bindVoiceButton() {
    const voiceBtn = document.querySelector('.voice-btn');
    if (!voiceBtn) return;

    const handleVoiceClick = () => {
        if (window.SpeechRecognition || window.webkitSpeechRecognition) {
            startWebSpeechOrder();
            return;
        }

        startVoiceOrder();
    };

    voiceBtn.onclick = handleVoiceClick;
}

// Start Voice Order
function startVoiceOrder() {
    const voiceBtn = document.querySelector('.voice-btn');

    if (!voiceBtn) {
        showNotification('Voice ordering is not available on this page.', 'error');
        return;
    }

    if (!navigator.mediaDevices || !window.MediaRecorder) {
        showNotification('🎤 Microphone not supported here, using demo voice order instead.', 'info');
        simulateSpeechToText();
        return;
    }

    if (!isRecording) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];

                mediaRecorder.ondataavailable = (event) => {
                    audioChunks.push(event.data);
                };

                mediaRecorder.onstop = () => {
                    processVoiceOrder();
                };

                mediaRecorder.start();
                isRecording = true;
                voiceBtn.classList.add('recording');
                showNotification('🎤 Recording... Speak your order', 'info');

                setTimeout(() => {
                    if (isRecording) {
                        stopVoiceRecording();
                    }
                }, 10000);
            })
            .catch(err => {
                showNotification('Microphone access denied. Demo voice order mode enabled.', 'info');
                console.error('Microphone error:', err);
                simulateSpeechToText();
            });
    } else {
        stopVoiceRecording();
    }
}

// Stop Voice Recording
function stopVoiceRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        isRecording = false;
        
        const voiceBtn = document.querySelector('.voice-btn');
        voiceBtn.classList.remove('recording');
        showNotification('🎤 Processing your voice command...', 'info');
    }
}

// Process Voice Order
function processVoiceOrder() {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    
    // Simulate speech-to-text conversion
    // In real application, you would use Web Speech API or send to backend
    simulateSpeechToText();
}

// Simulate Speech to Text
function simulateSpeechToText() {
    // Simulated voice commands examples
    const voiceCommands = [
        'One veg burger and two cold coffees',
        'Paneer butter masala with naan and lassi',
        'Butter chicken biryani',
        'Two chicken tikkas and garlic naan'
    ];
    
    const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
    processVoiceCommand(randomCommand);
}

// Process Voice Command
function processVoiceCommand(command) {
    showNotification(`🎤 Heard: "${command}"`, 'info');
    
    const commandLower = command.toLowerCase();
    const items = getMenuItems();
    
    const matches = [];
    
    // Try to find matching items
    items.forEach(item => {
        if (commandLower.includes(item.name.toLowerCase())) {
            // Extract quantity if mentioned
            const qtyMatch = command.match(/(one|two|three|four|five) .* (?:and|plus)?/i);
            const qtyMap = { 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5 };
            const quantity = qtyMap[command.split(' ')[0].toLowerCase()] || 1;
            
            matches.push({ item, quantity });
        }
    });
    
    if (matches.length > 0) {
        // Add matched items to cart
        matches.forEach(({ item, quantity }) => {
            if (typeof cart !== 'undefined') {
                const existingItem = cart.find(c => c.id === item.id);
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    cart.push({ ...item, quantity });
                }
            }
        });
        
        if (typeof updateCart === 'function') {
            updateCart();
            toggleCart();
        }
        
        showNotification(`✅ Added ${matches.length} item(s) to your cart!`, 'success');
    } else {
        showNotification('❌ Could not find matching items. Please try again.', 'error');
    }
}

// Web Speech API Alternative (works in most browsers)
function startWebSpeechOrder() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        showNotification('Speech recognition not supported in your browser', 'error');
        return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => {
        showNotification('🎤 Listening...', 'info');
        document.querySelector('.voice-btn').classList.add('recording');
    };
    
    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        processVoiceCommand(transcript);
    };
    
    recognition.onerror = (event) => {
        showNotification(`Error: ${event.error}`, 'error');
    };
    
    recognition.onend = () => {
        document.querySelector('.voice-btn').classList.remove('recording');
    };
    
    recognition.start();
}

// Try Web Speech API if available
document.addEventListener('DOMContentLoaded', () => {
    bindVoiceButton();
});
