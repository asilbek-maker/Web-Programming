// E1: my first component. One function, reused three times.
function Greeting() {
  return <p className="card">Hello, World! 👋</p>
}

function GreetingDemo() {
  return (
    <div className="stack">
      <Greeting />
      <Greeting />
      <Greeting />
    </div>
  )
}

export default GreetingDemo
