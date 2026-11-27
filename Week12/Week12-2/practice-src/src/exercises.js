// The list of exercises. main.jsx uses it to pick the demo for ?demo=…,
// and scripts/make-page.mjs uses it to write Week12-2/index.html
// (title, goal, code and result for every card).
export const monday = [
  {
    id: 'M1', slug: 'counter-history', file: 'monday/CounterWithHistory.jsx',
    title: 'Code challenge: counter with history',
    goal: 'Build a counter with +1, −1 and Reset, show the last 5 values, and add an Undo button. Use two state variables: <code>count</code> and <code>history</code>.',
    result: 'The history is a new array every time (<code>[...prev, next].slice(-5)</code>), never changed in place. Undo steps back one value and is disabled when there is nothing to undo.',
  },
  {
    id: 'M2', slug: 'cafe-order', file: 'monday/CafeOrder.jsx',
    title: 'Video lecture challenge: café order',
    goal: 'Three menu items, each with a − and a + button. A quantity can never go below 0, and the total is quantity × price.',
    result: 'One state object holds every quantity. The − button is disabled at 0, and the total is calculated during render, so it is never stored in state.',
  },
  {
    id: 'M3', slug: 'toggle', file: 'monday/ToggleDetails.jsx',
    title: 'Toggle visibility',
    goal: 'A “Show details” / “Hide details” button that shows and hides a paragraph with boolean state.',
    result: 'The updater <code>prev =&gt; !prev</code> flips the value, and <code>aria-expanded</code> tells screen readers whether the text is open.',
  },
  {
    id: 'M4', slug: 'study-list', file: 'monday/StudyList.jsx',
    title: 'Add and remove list items',
    goal: 'An input and an Add button that add items to an array in state, and a ✕ button on each item that removes it.',
    result: 'Spread adds a new item and <code>filter</code> removes one. Each item has a stable <code>id</code> as its key, never the array index.',
  },
  {
    id: 'M5', slug: 'scoreboard', file: 'monday/ScoreBoard.jsx',
    title: 'Lifting state up',
    goal: 'A parent <code>ScoreBoard</code> with two <code>PlayerScore</code> children that shows the combined total.',
    result: 'The parent owns both scores and passes each child its value and callbacks, so it can show the total and who is leading.',
  },
  {
    id: 'M6', slug: 'word-count', file: 'monday/WordCount.jsx',
    title: 'Practice: live word counter',
    goal: 'The practice from the last slide: count words and characters while the user types.',
    result: 'Only the text is state. Words, characters and reading time are derived from it during render.',
  },
]

export const friday = [
  {
    id: 'F1', slug: 'github-user', file: 'friday/GitHubUser.jsx',
    title: 'Code challenge: GitHub profile card',
    goal: 'Fetch a GitHub profile in <code>useEffect</code> when the username changes. Show the avatar, bio, followers and repos, with loading and error states. Bonus: cancel the old request with <code>AbortController</code>.',
    result: 'The effect depends on <code>[username]</code>. A wrong name (404), the rate limit (403/429) and network errors each get their own message, and the cleanup aborts the old request.',
  },
  {
    id: 'F2', slug: 'debounced-search', file: 'friday/DebouncedSearch.jsx',
    title: 'Bonus: search while typing (debounce)',
    goal: 'Search GitHub users as you type, but only send a request when typing stops for 500 ms.',
    result: 'Each key press runs the cleanup of the previous effect, which clears its timer and aborts its request. Only the last value is sent.',
  },
  {
    id: 'F3', slug: 'title-sync', file: 'friday/TitleSync.jsx',
    title: 'Sync document.title',
    goal: 'Update <code>document.title</code> whenever the input changes.',
    result: 'The effect runs after each change to <code>name</code>, and the cleanup puts the old title back.',
  },
  {
    id: 'F4', slug: 'fetch-user', file: 'friday/FetchUser.jsx',
    title: 'Fetch data on mount',
    goal: 'Fetch a user from JSONPlaceholder once when the component mounts, with loading and error states.',
    result: 'The empty dependency array <code>[]</code> runs the effect once. The <code>ignore</code> flag drops an answer that arrives after unmount.',
  },
  {
    id: 'F5', slug: 'stopwatch', file: 'friday/Stopwatch.jsx',
    title: 'Stopwatch',
    goal: 'A stopwatch with Start, Stop and Reset, using <code>setInterval</code> inside an effect.',
    result: 'The interval only exists while <code>running</code> is true, and <code>clearInterval</code> in the cleanup stops it.',
  },
  {
    id: 'F6', slug: 'char-count', file: 'friday/CharCount.jsx',
    title: 'Practice: character count with an effect',
    goal: 'The practice from the last slide: use an effect to keep a character count in state.',
    result: 'It works, but it renders twice per key press. <code>text.length</code> during render (like M6) is the better way, and the comment in the code says why.',
  },
]
