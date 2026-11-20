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
        {/* Two classmates */}
        <StudentProfileCard
          name="Rahimjon Komiljonov"
          studentId="TODO_ID"
          major="Computer Engineering"
          year={3}
          gpa={4.3}
        />
        <StudentProfileCard
          name="Muhammad Rakhmatillayev"
          studentId="TODO_ID"
          major="Computer Engineering"
          year={3}
          gpa={3.9}
        />
      </div>
    </div>
  );
}

export default App;
