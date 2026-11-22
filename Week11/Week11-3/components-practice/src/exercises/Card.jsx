import { useState } from 'react'

// E5: props.children. Card draws the frame and title; whatever sits
// between <Card> and </Card> is rendered inside it.
function Card({ title, children }) {
  return (
    <section className="card">
      <h3>{title}</h3>
      <div>{children}</div>
    </section>
  )
}

function CardDemo() {
  const [clicks, setClicks] = useState(0)

  return (
    <div className="grid-cards">
      <Card title="Plain text">
        <p>Any text can go inside a Card.</p>
      </Card>
      <Card title="A list">
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>HTML</li>
          <li>CSS</li>
          <li>React</li>
        </ul>
      </Card>
      <Card title="A button">
        <button type="button" className="btn btn-accent" onClick={() => setClicks(clicks + 1)}>
          Clicked {clicks} times
        </button>
      </Card>
    </div>
  )
}

export default CardDemo
