// E2: props are destructured straight in the parameter list.
function StudentCard({ name, id, major }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p className="muted small">ID: {id}</p>
      <p>{major}</p>
    </div>
  )
}

function StudentCardDemo() {
  return (
    <div className="grid-cards">
      <StudentCard name="Asilbek" id="202438394" major="Computer Engineering" />
      <StudentCard name="Jisoo Park" id="202412345" major="Software Engineering" />
    </div>
  )
}

export default StudentCardDemo
