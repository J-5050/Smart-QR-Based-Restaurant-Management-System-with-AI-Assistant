from pathlib import Path

base = Path('css')
files = {
    'style.css': """/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: #8c2f1b;
    --secondary-color: #d4a056;
    --accent-color: #f7e7d3;
    --success-color: #4b8b45;
    --warning-color: #c7852f;
    --danger-color: #b13534;
    --dark-bg: #2b1f1a;
    --light-bg: #f8f0e7;
    --hero-bg: #fff5ed;
    --card-bg: rgba(255, 255, 255, 0.92);
    --text-dark: #2e2320;
    --text-light: #6a584f;
    --border-color: rgba(74, 51, 45, 0.16);
    --border-radius: 20px;
    --shadow: 0 12px 30px rgba(45, 28, 22, 0.12);
    --shadow-lg: 0 20px 50px rgba(45, 28, 22, 0.18);
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: var(--text-dark);
    background: radial-gradient(circle at top, rgba(196, 147, 86, 0.12), transparent 28%), linear-gradient(180deg, #fff8f2 0%, var(--light-bg) 100%);
    line-height: 1.6;
    min-height: 100vh;
}

.container {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navbar */
.navbar {
    background: linear-gradient(135deg, rgba(139, 77, 57, 0.96), rgba(72, 43, 29, 0.98));
    color: var(--accent-color);
    padding: 18px 0;
    box-shadow: var(--shadow-lg);
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 12px;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 28px;
}

.nav-links a {
    color: var(--accent-color);
    text-decoration: none;
    font-weight: 600;
    transition: opacity 0.3s, transform 0.3s;
}

.nav-links a:hover,
.nav-links a.active {
    opacity: 0.95;
    transform: translateY(-1px);
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 18px;
    color: var(--accent-color);
}

/* Buttons */
.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 12px 22px rgba(0, 0, 0, 0.08);
}

.btn:hover {
    transform: translateY(-2px);
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary-color), #a84639);
    color: white;
}

.btn-secondary {
    background: linear-gradient(135deg, var(--secondary-color), #c9974f);
    color: var(--dark-bg);
}

.btn-success {
    background-color: var(--success-color);
    color: white;
}

.btn-info {
    background-color: #3b8c95;
    color: white;
}

.btn-lg {
    padding: 16px 34px;
    font-size: 17px;
}

.btn-full {
    width: 100%;
}

/* Forms */
.form-group {
    margin-bottom: 22px;
}

.form-group label {
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
    color: var(--text-dark);
}

.form-group input,
.form-group select,
.form-group textarea,
.table-input,
.search-box,
.sort-section select {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid var(--border-color);
    border-radius: 14px;
    background: white;
    font-size: 15px;
    color: var(--text-dark);
    transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus,
.table-input:focus,
.search-box:focus,
.sort-section select:focus {
    outline: none;
    border-color: rgba(140, 47, 27, 0.4);
    box-shadow: 0 0 0 4px rgba(212, 160, 86, 0.14);
}

/* Sections */
.hero,
.action-container,
.filters-section,
.feedback-section,
.chart-container,
.insight-card,
.stat-card,
.order-column,
.cart-sidebar {
    border-radius: var(--border-radius);
}

.hero {
    padding: 70px 0;
    background: var(--hero-bg);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow);
    margin: 30px 0;
}

.hero-content {
    text-align: center;
}

.hero h1 {
    font-size: 48px;
    color: var(--dark-bg);
    margin-bottom: 18px;
    line-height: 1.05;
}

.hero p {
    font-size: 20px;
    color: var(--text-light);
    margin-bottom: 35px;
    max-width: 760px;
    margin-left: auto;
    margin-right: auto;
}

.action-container {
    background: white;
    padding: 35px;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow);
    max-width: 560px;
    margin: 0 auto 50px;
}

.action-container .btn-lg {
    width: 100%;
    margin-bottom: 18px;
}

.or-text {
    color: var(--text-light);
    margin: 18px 0;
    font-weight: 600;
}

.table-input {
    margin-bottom: 20px;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 22px;
    margin-top: 50px;
}

.feature-card {
    background: white;
    padding: 30px 24px;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
}

.feature-card i {
    font-size: 44px;
    color: var(--primary-color);
    margin-bottom: 18px;
    display: block;
}

.feature-card h3 {
    font-size: 20px;
    color: var(--dark-bg);
    margin-bottom: 12px;
}

.feature-card p {
    color: var(--text-light);
    font-size: 15px;
}

/* Modal */
.modal {
    display: none;
    position: fixed;
    z-index: 200;
    inset: 0;
    background-color: rgba(20, 12, 9, 0.6);
    backdrop-filter: blur(3px);
    animation: fadeIn 0.25s ease;
}

.modal-content {
    background-color: white;
    margin: 6% auto;
    padding: 32px;
    border-radius: var(--border-radius);
    width: 92%;
    max-width: 540px;
    box-shadow: var(--shadow-lg);
    animation: slideIn 0.25s ease;
}

.close,
.close-btn {
    color: #8f7b6b;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s ease;
}

.close:hover,
.close:focus,
.close-btn:hover,
.close-btn:focus {
    color: var(--text-dark);
}

/* Footer */
.footer {
    background: linear-gradient(135deg, var(--dark-bg), #3b2a25);
    color: var(--accent-color);
    text-align: center;
    padding: 30px 0;
    margin-top: 60px;
    letter-spacing: 0.02em;
}

/* Utility Classes */
.text-center {
    text-align: center;
}

.mt-20 {
    margin-top: 20px;
}

.mb-20 {
    margin-bottom: 20px;
}

.flex {
    display: flex;
}

.flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.gap-10 {
    gap: 10px;
}

.success-text {
    color: var(--success-color);
}

.error-text {
    color: var(--danger-color);
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideIn {
    from { transform: translateY(-40px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

@media (max-width: 768px) {
    .nav-links {
        gap: 16px;
    }

    .logo {
        font-size: 20px;
    }

    .btn-lg {
        padding: 14px 28px;
        font-size: 16px;
    }
}
"""
}

for name, content in files.items():
    path = base / name
    path.write_text(content, encoding='utf-8')
    print(f'Wrote {path}')
