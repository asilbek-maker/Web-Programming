import CounterWithHistory from './CounterWithHistory';

function App() {
  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Web Programming K0126_002 · Week 12 · Code challenge</p>
        <h1>Counter with History</h1>
        <p className="lede">
          Two pieces of state: <code>count</code> and a <code>history</code> array.
          Every click records the new value; Undo steps back to the previous one.
        </p>
      </header>
      <CounterWithHistory />
    </main>
  );
}

export default App;
