// Chatbot Functionality

let chatHistory = [];

// Send Chat Message
function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addChatMessage(message, 'user');
    chatHistory.push({ role: 'user', message: message, timestamp: new Date() });
    
    chatInput.value = '';
    
    // Generate AI response
    setTimeout(() => {
        const response = generateAIResponse(message, cart || []);
        addChatMessage(response, 'ai');
        chatHistory.push({ role: 'ai', message: response, timestamp: new Date() });
    }, 500);
}

// Handle Chat Input - Send on Enter
function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// Add Message to Chat
function addChatMessage(message, role) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${role}`;
    messageElement.textContent = message;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize Chatbot
function initializeChatbot() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages && chatMessages.children.length === 0) {
        addChatMessage('👋 Hi! I\'m your AI Assistant. How can I help you today?', 'ai');
    }
}

// Load chatbot on page load
document.addEventListener('DOMContentLoaded', function() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot) {
        setTimeout(initializeChatbot, 500);
    }
});
