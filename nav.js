document.addEventListener("DOMContentLoaded", function () {

    const nav = document.createElement("nav");

    nav.innerHTML = `
        <div class="nav-container">

            <a href="/Web-Programming/">🏠 Home</a>

            <a href="/Web-Programming/Week2/">📚 Week 2</a>

            <a href="/Web-Programming/Week3/">📚 Week 3</a>

            <a href="/Web-Programming/Week4/">📚 Week 4</a>

            <a href="/Web-Programming/Week5/">📚 Week 5</a>

        </div>
    `;

    document.body.prepend(nav);


    const style = document.createElement("style");

    style.innerHTML = `
        nav {
            width: 100%;
            background: #222;
            padding: 15px 0;
            margin-bottom: 30px;
        }

        .nav-container {
            max-width: 1000px;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            flex-wrap: wrap;
        }

        .nav-container a {
            color: white;
            text-decoration: none;
            padding: 10px 18px;
            border-radius: 8px;
            font-weight: bold;
            transition: 0.2s;
        }

        .nav-container a:hover {
            background: #444;
            transform: translateY(-2px);
        }
    `;

    document.head.appendChild(style);
});
