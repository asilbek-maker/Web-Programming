// Loading and error states, with a message for each kind of failure.
const MESSAGES = {
  'not-found': (err) => `${err.message} Check the spelling and try again.`,
  'rate-limit': () => 'The weather service is getting too many requests right now. Wait a minute and try again.',
  network: () =>
    navigator.onLine === false
      ? 'You appear to be offline. Reconnect and search again.'
      : 'Could not reach the weather service. Check your connection and try again.',
  server: (err) => `${err.message} Please try again later.`,
}

function StatusMessage({ status, error }) {
  if (status === 'loading') {
    return (
      <p className="notice" role="status">
        <span className="spinner" aria-hidden="true" /> Loading weather…
      </p>
    )
  }
  if (status === 'error' && error) {
    const toText = MESSAGES[error.code] ?? (() => 'Something went wrong. Please try again.')
    return <p className="notice error" role="alert">{toText(error)}</p>
  }
  return null
}

export default StatusMessage
