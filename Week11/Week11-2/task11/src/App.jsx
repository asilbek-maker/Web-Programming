import StudentProfileCard from './StudentProfileCard';

function App() {
  return (
    <div className="directory">
      <h1>Student Directory</h1>
      <p className="subtitle">Web Programming K0126_002 · Task 11-A: React Components &amp; Props</p>

      <div className="card-grid">
        {/* My card. studentId is REQUIRED: put your real student ID here */}
        <StudentProfileCard
          name="Asilbek"
          studentId="YOUR_STUDENT_ID"
          major="Computer Engineering"
          year={3}
          gpa={3.75}
        />
        {/* Two classmates (use their real names and IDs) */}
        <StudentProfileCard name="Classmate 1" studentId="..." major="..." year={2} gpa={3.5} />
        <StudentProfileCard name="Classmate 2" studentId="..." major="..." year={4} gpa={3.9} />
      </div>
    </div>
  );
}

export default App;
