<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Asilbek | Web Programming Portfolio</title>

    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            background: #f8fafc;
            color: #1e293b;
            line-height: 1.6;
        }

        .container {
            width: 90%;
            max-width: 1000px;
            margin: auto;
        }

        /* Navigation */

        nav {
            background: white;
            border-bottom: 1px solid #e2e8f0;
            padding: 20px 0;
        }

        nav .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 22px;
            font-weight: bold;
        }

        nav a {
            color: #475569;
            text-decoration: none;
            margin-left: 25px;
        }

        nav a:hover {
            color: #2563eb;
        }

        /* Hero */

        .hero {
            padding: 90px 0;
            background: white;
        }

        .hero-content {
            max-width: 750px;
        }

        .hero h1 {
            font-size: 52px;
            margin-bottom: 15px;
        }

        .hero h1 span {
            color: #2563eb;
        }

        .hero p {
            font-size: 20px;
            color: #64748b;
            margin-bottom: 30px;
        }

        .button {
            display: inline-block;
            background: #2563eb;
            color: white;
            text-decoration: none;
            padding: 13px 25px;
            border-radius: 8px;
            font-weight: bold;
        }

        .button:hover {
            background: #1d4ed8;
        }

        /* Sections */

        section {
            padding: 70px 0;
        }

        .section-title {
            text-align: center;
            margin-bottom: 40px;
        }

        .section-title h2 {
            font-size: 32px;
            margin-bottom: 8px;
        }

        .section-title p {
            color: #64748b;
        }

        /* About */

        .about-card {
            background: white;
            padding: 35px;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }

        .about-card p {
            color: #64748b;
            margin-bottom: 20px;
        }

        .info {
            margin: 10px 0;
        }

        .info strong {
            display: inline-block;
            width: 120px;
        }

        /* Skills */

        .skills {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
        }

        .skill {
            background: white;
            padding: 25px 15px;
            text-align: center;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
            font-weight: bold;
        }

        .skill:hover {
            border-color: #2563eb;
            transform: translateY(-3px);
        }

        /* Assignments */

        .assignments {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }

        .week {
            background: white;
            padding: 30px;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }

        .week h3 {
            margin-bottom: 10px;
        }

        .week p {
            color: #64748b;
            margin-bottom: 20px;
        }

        .week a {
            color: #2563eb;
            text-decoration: none;
            font-weight: bold;
        }

        .week a:hover {
            text-decoration: underline;
        }

        /* Footer */

        footer {
            background: #0f172a;
            color: white;
            text-align: center;
            padding: 30px 0;
        }

        footer p {
            color: #94a3b8;
            margin-top: 5px;
        }

        /* Mobile */

        @media (max-width: 700px) {

            .hero h1 {
                font-size: 38px;
            }

            nav .container {
                flex-direction: column;
                gap: 15px;
            }

            nav a {
                margin: 0 8px;
            }

            .skills {
                grid-template-columns: repeat(2, 1fr);
            }

            .assignments {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>

<body>

    <!-- Navigation -->

    <nav>
        <div class="container">

            <div class="logo">
                Asilbek
            </div>

            <div>
                <a href="#about">About</a>
                <a href="#skills">Skills</a>
                <a href="#assignments">Assignments</a>
            </div>

        </div>
    </nav>


    <!-- Hero Section -->

    <header class="hero">

        <div class="container">

            <div class="hero-content">

                <h1>
                    Hello, I'm <span>Asilbek</span>
                </h1>

                <p>
                    Computer Engineering student interested in
                    web development and software development.
                </p>

                <a class="button" href="#assignments">
                    View My Work
                </a>

            </div>

        </div>

    </header>


    <!-- About -->

    <section id="about">

        <div class="container">

            <div class="section-title">
                <h2>About Me</h2>
                <p>A little information about me</p>
            </div>

            <div class="about-card">

                <p>
                    I am a Computer Engineering student at Gachon University.
                    I am interested in web programming and software development.
                    I am currently improving my programming skills through
                    university courses and personal projects.
                </p>

                <div class="info">
                    <strong>Name:</strong> Asilbek
                </div>

                <div class="info">
                    <strong>Major:</strong> Computer Engineering
                </div>

                <div class="info">
                    <strong>University:</strong> Gachon University
                </div>

                <div class="info">
                    <strong>Interest:</strong> Web & Software Development
                </div>

            </div>

        </div>

    </section>


    <!-- Skills -->

    <section id="skills">

        <div class="container">

            <div class="section-title">

                <h2>Skills</h2>

                <p>
                    Technologies I am learning and working with
                </p>

            </div>

            <div class="skills">

                <div class="skill">
                    HTML5
                </div>

                <div class="skill">
                    CSS3
                </div>

                <div class="skill">
                    JavaScript
                </div>

                <div class="skill">
                    React
                </div>

            </div>

        </div>

    </section>


    <!-- Assignments -->

    <section id="assignments">

        <div class="container">

            <div class="section-title">

                <h2>My Web Programming Work</h2>

                <p>
                    University assignments and class exercises
                </p>

            </div>


            <div class="assignments">

                <div class="week">

                    <h3>Week 2</h3>

                    <p>
                        Web programming exercises and assignments
                        from Week 2.
                    </p>

                    <a href="Week2/">
                        View Week 2 →
                    </a>

                </div>


                <div class="week">

                    <h3>Week 3</h3>

                    <p>
                        HTML, CSS and web programming assignments
                        from Week 3.
                    </p>

                    <a href="Week3/">
                        View Week 3 →
                    </a>

                </div>


                <div class="week">

                    <h3>Week 4</h3>

                    <p>
                        Web programming exercises and assignments
                        from Week 4.
                    </p>

                    <a href="Week4/">
                        View Week 4 →
                    </a>

                </div>

            </div>

        </div>

    </section>


    <!-- Footer -->

    <footer>

        <div class="container">

            <h3>Asilbek</h3>

            <p>
                Web Programming Portfolio
            </p>

        </div>

    </footer>

</body>
</html>
