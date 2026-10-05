if (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html')) {
    return;
}
document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;

    // Bosh sahifada bo'lsak, tepadagi menyuni ko'rsatmaymiz
    if (currentPath.endsWith('/') || currentPath.endsWith('/index.html')) {
        return;
    }

    // Navigatsiya uslublari (CSS)
    const style = document.createElement('style');
    style.innerHTML = `
        .nav-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            background-color: transparent;
            padding: 20px 10px;
            width: 100%;
            box-sizing: border-box;
        }
        .nav-card {
            display: inline-block;
            background-color: #ffffff;
            color: #1e293b;
            font-weight: 600;
            font-size: 15px;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            transition: all 0.2s ease-in-out;
        }
        .nav-card:hover {
            transform: translateY(-2px);
            background-color: #f8fafc;
            border-color: #cbd5e1;
            color: #2563eb;
        }
    `;
    document.head.appendChild(style);

    // Navigatsiya menyusini yaratish
    const nav = document.createElement('nav');
    nav.className = 'nav-container';

    // Barcha haftalar ro'yxati (yangi week qo'shsangiz faqat shu massivga qo'shib qo'yasiz)
    const weeks = ['Week2', 'Week3', 'Week4', 'Week5', 'Week6'];

    // Home tugmasi
    const homeLink = document.createElement('a');
    homeLink.className = 'nav-card';
    homeLink.href = '/Web-Programming/';
    homeLink.textContent = '🏠 Home';
    nav.appendChild(homeLink);

    // Week tugmalari
    weeks.forEach(week => {
        const a = document.createElement('a');
        a.className = 'nav-card';
        a.href = `/Web-Programming/${week}/`;
        a.textContent = week.replace('Week', 'Week ');
        nav.appendChild(a);
    });

    document.body.insertBefore(nav, document.body.firstChild);
});
