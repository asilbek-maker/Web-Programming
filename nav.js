document.addEventListener("DOMContentLoaded", function () {
    const style = document.createElement('style');
    style.innerHTML = `
        .nav-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            background-color: #f3f4f6;
            padding: 20px 10px;
            width: 100%;
            box-sizing: border-box;
        }

        .nav-card {
            display: inline-block;
            background-color: #ffffff;
            color: #111827;
            font-weight: bold;
            font-size: 16px;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
            transition: all 0.2s ease-in-out;
            border: 1px solid #e5e7eb;
        }

        .nav-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            background-color: #f9fafb;
        }
    `;
    document.head.appendChild(style);

    const nav = document.createElement('nav');
    nav.className = 'nav-container';

    const links = [
        { name: '🏠 Home', url: '/Web-Programming/' },
        { name: 'Week 2', url: '/Web-Programming/Week2/' },
        { name: 'Week 3', url: '/Web-Programming/Week3/' },
        { name: 'Week 4', url: '/Web-Programming/Week4/' },
        { name: 'Week 5', url: '/Web-Programming/Week5/' }
    ];

    links.forEach(link => {
        const a = document.createElement('a');
        a.className = 'nav-card';
        a.href = link.url;
        a.textContent = link.name;
        nav.appendChild(a);
    });

    document.body.insertBefore(nav, document.body.firstChild);
});
