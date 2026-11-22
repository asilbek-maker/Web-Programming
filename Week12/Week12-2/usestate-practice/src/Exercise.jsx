// Frame for one practice exercise: ID badge, title, file name, goal, live demo.
function Exercise({ id, anchor, title, file, goal, children }) {
  return (
    <article className="exercise" id={anchor} aria-labelledby={`${anchor}-title`}>
      <header className="exercise-head">
        <span className="badge">{id}</span>
        <h2 id={`${anchor}-title`}>{title}</h2>
        <code>{file}</code>
        <p className="exercise-goal">{goal}</p>
      </header>
      <div className="demo">{children}</div>
    </article>
  )
}

export default Exercise
