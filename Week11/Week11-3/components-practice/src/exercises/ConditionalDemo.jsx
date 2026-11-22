import { useState } from 'react'

// E8: three ways to render conditionally.
// 1) return null  2) the && operator  3) the ternary operator

// 1) The component renders nothing when there is no message.
function WarningBanner({ message }) {
  if (!message) return null
  return <p className="notice warn">{message}</p>
}

function ConditionalDemo() {
  const [loggedIn, setLoggedIn] = useState(false)
  const unread = loggedIn ? 3 : 0

  return (
    <div className="stack">
      {/* 3) ternary: one of two outputs */}
      <p className="card">{loggedIn ? 'Welcome back, Asilbek!' : 'Please log in.'}</p>

      {/* 2) &&: shown only when the left side is true */}
      {unread > 0 && <p className="notice">You have {unread} unread messages.</p>}

      <WarningBanner message={loggedIn ? null : 'You are browsing as a guest.'} />

      <div className="row">
        <button type="button" className="btn btn-accent" onClick={() => setLoggedIn(!loggedIn)}>
          {loggedIn ? 'Log out' : 'Log in'}
        </button>
      </div>
    </div>
  )
}

export default ConditionalDemo
