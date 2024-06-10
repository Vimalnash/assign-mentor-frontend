
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { LandingPage } from './Pages/LandingPage'
import { CreateMentor } from './Pages/CreateMentor'
import { CreateStudent } from './Pages/CreateStudent'
import { StudentList } from './Pages/Reports/StudentList'
import { mentorurl } from './Handlers/BackentUrls'
import { useEffect } from 'react'
import { baseurl, studenturl } from "./Handlers/BackentUrls";
import { AssignMentorSingle } from './Pages/AssignMentorSingle'
import { UseAppContext } from './Context/AppContext'
import { StudentListForaMentor } from './Pages/Reports/StudentListForaMentor'
import { PreviousMentorForaStudent } from './Pages/Reports/PreviousMentorForaStudent'
import { AssignMentorMultiple } from './Pages/AssignMentorMultiple'

function App() {
  const {setMentorError, setAllMentorData, setStudError, setAllStudentData} = UseAppContext();

  useEffect(() => {
    fetch(`${baseurl}/${mentorurl}/all`, {
        method: "GET"
    })
    .then((res) => res.json())
    .then((data) => {
        // console.log(data);
        if(data.error) {
            setMentorError(data.error);
            setAllMentorData([]);
        } else {
            setMentorError("");
            setAllMentorData(data.data);
        }
    })
    .catch((error) => {console.log(error)})
  }, [])

  useEffect(() => {
    fetch(`${baseurl}/${studenturl}/all`, {
        method: "GET"
    })
    .then((res) => res.json())
    .then((data) => {
        // console.log(data);
        if(data.error) {
            setStudError(data.error);
            setAllStudentData([]);
        } else {
            setStudError("");
            setAllStudentData(data.data);
        }
    })
    .catch((error) => {console.log(error)})
  }, [])


  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />}  />
        <Route path="/create/mentor" element={<CreateMentor />}  />
        <Route path="/create/student" element={<CreateStudent />}  />
        <Route path="/student/studentList" element={<StudentList />} />
        <Route path="/student/assignmentor" element={<AssignMentorSingle />} />
        <Route path="/student/assignmentor/multiple" element={<AssignMentorMultiple />} />
        <Route path="/reports/StudentListForaMentor" element={<StudentListForaMentor />} />
        <Route path="/reports/PreviousMentorForaStudent" element={<PreviousMentorForaStudent />} />1
      </Routes>
    </>
  )
}

export default App
