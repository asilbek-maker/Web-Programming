// E4: render a list with .map(), pick an icon with conditional rendering,
// and use each notification's id as its key.
const notifications = [
  { id: 101, type: 'success', text: 'Week 11 homework submitted.' },
  { id: 102, type: 'warning', text: 'Task 11-A is due on Friday.' },
  { id: 103, type: 'info', text: 'New slides posted: React state.' },
]

function iconFor(type) {
  if (type === 'success') return '✅'
  if (type === 'warning') return '⚠️'
  return 'ℹ️'
}

function NotificationList({ items }) {
  return (
    <ul className="plain-list">
      {items.map((n) => (
        <li key={n.id}>
          <span aria-hidden="true">{iconFor(n.type)}</span>
          <span className="grow">{n.text}</span>
          <span className="muted small">{n.type}</span>
        </li>
      ))}
    </ul>
  )
}

function NotificationDemo() {
  return <NotificationList items={notifications} />
}

export default NotificationDemo
