# Counter with History

Web Programming K0126_002 · Week 12 · Code challenge (React state & `useState`)

**Live:** https://asilbek-maker.github.io/Web-Programming/Week12/Week12-2/app/

## Requirements

1. Display the current count, starting at 0
2. +1 and −1 buttons
3. Reset button (back to 0)
4. History: show the last 5 count values, e.g. `[0, 1, 2, 1, 0]`
5. Undo: set the count to the previous value in history

## How it works

Two state variables, as the hint suggests:

```jsx
const [count, setCount] = useState(0);
const [history, setHistory] = useState([0]);

function change(next) {
  setCount(next);
  setHistory(prev => [...prev, next].slice(-5)); // new array, last 5 only
}

function undo() {
  if (history.length < 2) return;
  setCount(history[history.length - 2]);
  setHistory(prev => prev.slice(0, -1));
}
```

Undo is disabled when there is nothing to go back to. Reset counts as a change, so it
is recorded in history and can be undone.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # writes the production site to ../app
```
