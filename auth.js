// Authentication helper for login/register
const AUTH_STORAGE_KEY = 'smartQR_authUsers';

function getAuthUsers() {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)) || [];
}

function saveAuthUsers(users) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users));
}

function showAuthSection(section) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const authMessage = document.getElementById('authMessage');

    authMessage.style.display = 'none';
    authMessage.textContent = '';

    if (section === 'register') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
    } else {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    }
}

function showAuthMessage(message, type = 'success') {
    const authMessage = document.getElementById('authMessage');
    authMessage.textContent = message;
    authMessage.className = `auth-message ${type}`;
}

function submitRegister() {
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim().toLowerCase();
    const password = document.getElementById('registerPassword').value;

    if (!name || !email || !password) {
        showAuthMessage('Please fill all registration fields.', 'error');
        return;
    }

    const users = getAuthUsers();
    if (users.some(user => user.email === email)) {
        showAuthMessage('This email is already registered. Please login.', 'error');
        return;
    }

    users.push({ name, email, password });
    saveAuthUsers(users);
    showAuthMessage('Registration successful! You can now login.', 'success');
    showAuthSection('login');
}

function submitLogin() {
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showAuthMessage('Please enter both email and password.', 'error');
        return;
    }

    const users = getAuthUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        showAuthMessage('Invalid email or password.', 'error');
        return;
    }

    localStorage.setItem('smartQR_userData', JSON.stringify({
        email: user.email,
        name: user.name,
        loginTime: new Date().toISOString()
    }));

    showAuthMessage('Login successful! Redirecting to menu...', 'success');
    setTimeout(() => {
        window.location.href = 'menu.html';
    }, 1200);
}

window.addEventListener('DOMContentLoaded', () => {
    showAuthSection('login');
});
