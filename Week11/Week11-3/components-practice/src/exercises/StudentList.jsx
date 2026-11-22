// E7: lists need a stable key. The student id is unique and never changes,
// so it is a better key than the array index.
const students = [
  { id: '202438394', name: 'Asilbek', year: 3 },
  { id: '202412345', name: 'Jisoo Park', year: 2 },
  { id: '202398765', name: 'Daniel Kim', year: 4 },
]

function StudentList() {
  return (
    <ol className="plain-list">
      {students.map((s) => (
        <li key={s.id}>
          <strong className="grow">{s.name}</strong>
          <span className="muted small">Year {s.year}</span>
          <code className="small">key=&quot;{s.id}&quot;</code>
        </li>
      ))}
    </ol>
  )
}

export default StudentList
