import Exercise from './Exercise.jsx'
import GreetingDemo from './exercises/Greeting.jsx'
import StudentCardDemo from './exercises/StudentCard.jsx'
import ProfileCardDemo from './exercises/ProfileCard.jsx'
import NotificationDemo from './exercises/NotificationList.jsx'
import CardDemo from './exercises/Card.jsx'
import ProductCardDemo from './exercises/ProductCard.jsx'
import StudentList from './exercises/StudentList.jsx'
import ConditionalDemo from './exercises/ConditionalDemo.jsx'

const exercises = [
  { id: 'E1', anchor: 'first-component', title: 'Greeting', file: 'Greeting.jsx',
    goal: 'Write a first component and reuse it three times.', Demo: GreetingDemo },
  { id: 'E2', anchor: 'student-card', title: 'StudentCard', file: 'StudentCard.jsx',
    goal: 'Monday lab: destructure name, id and major from props.', Demo: StudentCardDemo },
  { id: 'E3', anchor: 'profile-card', title: 'ProfileCard', file: 'ProfileCard.jsx',
    goal: 'Study guide 1: name, role, email and an optional avatarUrl with a default value.', Demo: ProfileCardDemo },
  { id: 'E4', anchor: 'notifications', title: 'NotificationList', file: 'NotificationList.jsx',
    goal: 'Study guide 2: .map() a list, choose an icon by type, use id as the key.', Demo: NotificationDemo },
  { id: 'E5', anchor: 'children', title: 'Card with children', file: 'Card.jsx',
    goal: 'Study guide 3: a wrapper component that renders props.children.', Demo: CardDemo },
  { id: 'E6', anchor: 'product-card', title: 'ProductCard', file: 'ProductCard.jsx',
    goal: 'Code challenge: name, price, rating, inStock. Bonus: "x / 5 stars" and a greyed-out Out of Stock card.', Demo: ProductCardDemo },
  { id: 'E7', anchor: 'lists', title: 'StudentList with keys', file: 'StudentList.jsx',
    goal: 'Lecture: render a list with a stable, unique key.', Demo: StudentList },
  { id: 'E8', anchor: 'conditional', title: 'Conditional rendering', file: 'ConditionalDemo.jsx',
    goal: 'Lecture: return null, &&, and the ternary operator, with a login toggle.', Demo: ConditionalDemo },
]

function App() {
  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Week 11 · Class practice · 202438394</p>
        <h1>React components &amp; props</h1>
        <p>Eight small exercises from the lectures, the Monday lab and the study guide. Every demo below is the real component running.</p>
        <nav aria-label="Exercises">
          <ul className="toc">
            {exercises.map((e) => (
              <li key={e.id}><a href={`#${e.anchor}`}>{e.id} {e.title}</a></li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="exercise-list">
        {exercises.map(({ Demo, ...e }) => (
          <Exercise key={e.id} {...e}>
            <Demo />
          </Exercise>
        ))}
      </div>

      <footer className="page-footer">
        <a href="../index.html">← Back to Week 11-3</a> ·{' '}
        <a href="https://github.com/asilbek-maker/Web-Programming/tree/main/Week11/Week11-3/components-practice/src">Source on GitHub</a>
      </footer>
    </main>
  )
}

export default App
