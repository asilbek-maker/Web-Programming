# Task 11-A: React Components & Props

Web Programming K0126_002 · Week 11 · Friday

A Vite + React app with a `StudentProfileCard` component. The component takes five
props (`name`, `studentId`, `major`, `year`, `gpa`), and `App.jsx` renders three cards:
mine and two classmates'.

**Live:** https://asilbek-maker.github.io/Web-Programming/Week11/Week11-2/app/

## Files

| File | What it does |
| --- | --- |
| `src/StudentProfileCard.jsx` | The card component, with exactly 5 props, all used in the JSX |
| `src/App.jsx` | Student Directory that renders 3 `StudentProfileCard`s |
| `src/index.css` | Hand-written card styles: border, padding, radius, card background, hover lift |
| `vite.config.js` | `base: './'` and builds into `../app` |

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # writes the production site to ../app
```

## Deployment

This project lives inside the `Web-Programming` repo, which GitHub Pages already serves
from `main`. So instead of `npx gh-pages -d dist` (which needs a separate repo), the build
goes to `Week11/Week11-2/app/`, and pushing to `main` publishes it.
