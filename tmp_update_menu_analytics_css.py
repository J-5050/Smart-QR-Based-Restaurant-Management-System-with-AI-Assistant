import pathlib

root = pathlib.Path(__file__).resolve().parent

files = {
    "css/menu.css": '''/* Menu Page Styles */

.menu-section {
    padding: 30px 0;
}

.filters-section {
    background: white;
    padding: 24px;
    border-radius: 20px;
    margin-bottom: 32px;
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
}

.search-box {
    width: 100%;
    padding: 16px 18px;
    border: 1px solid rgba(148, 116, 86, 0.16);
    border-radius: 14px;
    font-size: 15px;
    margin-bottom: 22px;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.search-box:focus {
    outline: none;
    border-color: rgba(140, 47, 27, 0.4);
    box-shadow: 0 0 0 4px rgba(212, 160, 86, 0.14);
}

.filter-buttons {
    display: flex;
    gap: 12px;
    margin-bottom: 22px;
    flex-wrap: wrap;
}

.filter-btn {
    padding: 12px 22px;
    border: 1px solid rgba(148, 116, 86, 0.18);
    background: #fff9f4;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 600;
    color: var(--text-dark);
}

.filter-btn:hover,
.filter-btn.active {
    border-color: var(--primary-color);
    background: var(--primary-color);
    color: white;
}

.sort-section {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
}

.sort-section label {
    color: var(--text-light);
    font-weight: 600;
}

.sort-section select {
    padding: 12px 16px;
    border: 1px solid rgba(148, 116, 86, 0.18);
    border-radius: 14px;
    cursor: pointer;
    background: #fff;
    min-width: 180px;
}

/* Menu Grid */
.menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 26px;
    margin-bottom: 46px;
}

.menu-item {
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.menu-item:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
}

.menu-item-image {
    width: 100%;
    min-height: 210px;
    background: linear-gradient(135deg, rgba(140, 47, 27, 0.92) 0%, rgba(196, 147, 86, 0.9) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 42px;
    position: relative;
}

.item-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    background: rgba(140, 47, 27, 0.92);
    color: white;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
}

.menu-item-content {
    padding: 26px 24px 24px;
}

.menu-item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 12px;
}

.menu-item-name {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-dark);
    line-height: 1.2;
}

.menu-item-price {
    font-size: 20px;
    font-weight: 700;
    color: var(--primary-color);
}

.menu-item-description {
    color: var(--text-light);
    font-size: 14px;
    margin-bottom: 16px;
    min-height: 48px;
}

.menu-item-rating {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 16px;
    color: #d4a056;
    font-size: 14px;
}

.menu-item-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 18px;
}

.menu-tag {
    background: #f7ede3;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 12px;
    color: var(--text-dark);
}

.menu-item-footer {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    align-items: center;
}

.qty-control {
    display: flex;
    align-items: center;
    border: 1px solid rgba(148, 116, 86, 0.22);
    border-radius: 12px;
    overflow: hidden;
    background: #fff7ef;
}

.qty-control button {
    background: transparent;
    border: none;
    padding: 10px 14px;
    cursor: pointer;
    color: var(--text-dark);
    transition: background 0.2s;
}

.qty-control button:hover {
    background: rgba(140, 47, 27, 0.08);
}

.qty-control input {
    width: 44px;
    text-align: center;
    border: none;
    font-weight: 700;
    color: var(--text-dark);
    background: transparent;
}

.add-to-cart-btn {
    flex: 1;
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 14px 18px;
    border-radius: 16px;
    cursor: pointer;
    font-weight: 700;
    transition: transform 0.25s ease, background 0.25s ease;
}

.add-to-cart-btn:hover {
    transform: translateY(-2px);
    background: #a84435;
}

/* Recommendations Section */
.recommendations-section {
    padding: 32px;
    background: linear-gradient(135deg, rgba(244, 221, 206, 0.45), rgba(255, 245, 238, 0.85));
    border-radius: 24px;
    margin-bottom: 40px;
    box-shadow: var(--shadow);
    border: 1px solid rgba(148, 116, 86, 0.14);
}

.recommendations-section h2 {
    color: var(--primary-color);
    margin-bottom: 20px;
    font-size: 26px;
}

.recommendations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 22px;
}

.recommendation-card {
    background: white;
    border-radius: 18px;
    padding: 20px;
    border: 1px solid rgba(148, 116, 86, 0.12);
    box-shadow: var(--shadow);
}

.recommendation-card h3 {
    margin: 0 0 10px;
    color: var(--text-dark);
}

.recommendation-card p {
    margin: 0;
    color: var(--text-light);
    font-size: 14px;
}

/* Combos Section */
.combos-section {
    padding: 30px 0;
}

.combos-section h2 {
    color: var(--primary-color);
    margin-bottom: 24px;
    font-size: 26px;
}

.combos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
}

.combo-card {
    background: linear-gradient(135deg, #8c2f1b, #d4a056);
    color: white;
    padding: 26px;
    border-radius: 22px;
    box-shadow: var(--shadow-lg);
    transition: transform 0.3s ease;
}

.combo-card:hover {
    transform: translateY(-8px);
}

.combo-title {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 16px;
}

.combo-items {
    list-style: none;
    margin: 0 0 18px;
    padding: 0;
}

.combo-items li {
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    display: flex;
    justify-content: space-between;
    font-size: 14px;
}

.combo-items li:last-child {
    border-bottom: none;
}

.combo-price {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.combo-discount {
    background: rgba(255, 255, 255, 0.18);
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 13px;
}

.combo-btn {
    width: 100%;
    padding: 14px 18px;
    background: rgba(255, 255, 255, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    border-radius: 16px;
    cursor: pointer;
    font-weight: 700;
    transition: background 0.25s ease;
}

.combo-btn:hover {
    background: rgba(255, 255, 255, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
    .menu-grid {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 18px;
    }

    .combos-grid {
        grid-template-columns: 1fr;
    }

    .recommendations-section,
    .filters-section {
        padding: 22px;
    }

    .chatbot {
        width: calc(100% - 32px);
        height: 360px;
    }

    .cart-sidebar {
        width: 100%;
        right: -100%;
    }

    .sort-section {
        flex-direction: column;
        align-items: stretch;
    }
}
''',
    "css/analytics.css": '''/* Analytics Styles */

.analytics-container {
    padding: 32px 0;
}

.page-title {
    color: var(--text-dark);
    font-size: 34px;
    font-weight: 700;
    margin-bottom: 30px;
}

/* Metrics Section */
.metrics-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
    margin-bottom: 42px;
}

.metric-card {
    background: white;
    padding: 28px;
    border-radius: 22px;
    box-shadow: var(--shadow);
    display: flex;
    gap: 22px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-top: 4px solid var(--primary-color);
}

.metric-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
}

.metric-card:nth-child(2) {
    border-top-color: var(--secondary-color);
}

.metric-card:nth-child(3) {
    border-top-color: var(--warning-color);
}

.metric-card:nth-child(4) {
    border-top-color: var(--success-color);
}

.metric-card i {
    font-size: 48px;
    min-width: 60px;
    text-align: center;
    color: var(--primary-color);
}

.metric-card:nth-child(2) i {
    color: var(--secondary-color);
}

.metric-card:nth-child(3) i {
    color: var(--warning-color);
}

.metric-card:nth-child(4) i {
    color: var(--success-color);
}

.metric-card h3 {
    margin: 0 0 8px 0;
    font-size: 13px;
    color: var(--text-light);
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.metric-value {
    font-size: 34px;
    font-weight: 800;
    color: var(--text-dark);
    margin: 0;
}

.metric-change {
    font-size: 13px;
    color: var(--text-light);
    margin-top: 8px;
}

.metric-change.positive {
    color: var(--success-color);
}

/* Charts Section */
.charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 25px;
    margin-bottom: 42px;
}

.chart-container {
    background: white;
    padding: 26px;
    border-radius: 22px;
    box-shadow: var(--shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chart-container:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
}

.chart-container h3 {
    margin-top: 0;
    margin-bottom: 20px;
    color: var(--text-dark);
    display: flex;
    align-items: center;
    gap: 12px;
}

.chart-container h3 i {
    color: var(--primary-color);
}

.chart-container canvas {
    max-height: 320px;
    width: 100% !important;
}

/* Insights Section */
.insights-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 24px;
    margin-bottom: 42px;
}

.insight-card {
    background: white;
    padding: 26px;
    border-radius: 22px;
    box-shadow: var(--shadow);
}

.insight-card h3 {
    margin-top: 0;
    margin-bottom: 22px;
    color: var(--text-dark);
    display: flex;
    align-items: center;
    gap: 12px;
}

.insight-card h3 i {
    color: var(--primary-color);
    font-size: 20px;
}

.insights-list,
.items-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.insights-list li,
.items-list li {
    padding: 18px;
    background: #f8f9fa;
    border-radius: 18px;
    margin-bottom: 14px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
}

.insights-list li:last-child,
.items-list li:last-child {
    margin-bottom: 0;
}

.insight-text {
    flex: 1;
}

.insight-text strong {
    display: block;
    color: var(--text-dark);
    margin-bottom: 8px;
    font-size: 15px;
}

.insight-text small {
    color: var(--text-light);
    font-size: 13px;
}

.insight-badge {
    background: var(--warning-color);
    color: var(--text-dark);
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
}

.insight-badge.danger {
    background: var(--danger-color);
    color: white;
}

.insight-badge.success {
    background: var(--success-color);
    color: white;
}

/* Feedback Section */
.feedback-section {
    background: white;
    padding: 32px;
    border-radius: 22px;
    box-shadow: var(--shadow);
    margin-bottom: 42px;
}

.feedback-section h2 {
    margin-top: 0;
    color: var(--text-dark);
    margin-bottom: 26px;
    font-size: 26px;
}

.feedback-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 24px;
}

.feedback-card {
    background: #f8f9fa;
    padding: 26px;
    border-radius: 22px;
    border-left: 6px solid var(--primary-color);
}

.feedback-card.positive {
    border-left-color: var(--success-color);
}

.feedback-card.negative {
    border-left-color: var(--danger-color);
}

.feedback-card h4 {
    margin: 0 0 12px 0;
    color: var(--text-dark);
}

.feedback-card > p {
    margin: 0 0 14px 0;
    font-size: 24px;
    font-weight: 800;
    color: var(--primary-color);
}

.feedback-card.positive > p {
    color: var(--success-color);
}

.feedback-card.negative > p {
    color: var(--danger-color);
}

.feedback-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.feedback-list li {
    padding: 14px 0;
    border-bottom: 1px solid rgba(148, 116, 86, 0.18);
    font-size: 14px;
    color: var(--text-dark);
}

.feedback-list li:last-child {
    border-bottom: none;
}

/* Export Section */
.export-section {
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-top: 40px;
}

.export-section button {
    padding: 14px 24px;
    border: none;
    border-radius: 18px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.export-section button:hover {
    transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 1024px) {
    .charts-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .metrics-section {
        grid-template-columns: repeat(2, 1fr);
    }

    .metric-card {
        padding: 20px;
        gap: 16px;
    }

    .metric-card i {
        font-size: 36px;
        min-width: 50px;
    }

    .metric-value {
        font-size: 28px;
    }

    .insights-section,
    .feedback-grid {
        grid-template-columns: 1fr;
    }

    .export-section {
        flex-direction: column;
    }

    .export-section button {
        width: 100%;
    }
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.metrics-section > div,
.insights-section > div,
.feedback-grid > div {
    animation: fadeInUp 0.5s ease-out;
}
'''
}

for relative_path, css_text in files.items():
    target = root / relative_path
    target.write_text(css_text, encoding='utf-8')
    print(f'Wrote {target}')
