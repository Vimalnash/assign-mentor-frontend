import { useState } from "react"
import { NavBar } from "../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { UseAppContext } from "../../Context/AppContext";

export function StudentList() {
  const {
    studerror, allStudentData
    } = UseAppContext();

    const [filterStudent, setFilterStudent] = useState("All");

    return (
        <>
            <NavBar />

            <div className="text-center">
                <select className="border-2 border-slate-400 rounded-lg p-2 m-2" onChange={(e) => setFilterStudent(e.target.value)}>
                    <option value="All">All</option>
                    {
                        allStudentData.map((studentData, index) => {
                            return (<option key={index} value={studentData._id}>{studentData.studentName}</option>)
                        })
                    }
                </select>
            </div>
            {
                studerror ?
                (<div>{studerror}</div>)
                :
                (
                    <div>
                        <h2 className="text-center m-4 text-2xl font-bold">Student List</h2>
                        <table className="table width-full m-4 border border-collapse border-slate-400">
                        <caption className="caption-top">
                        </caption>
                        <thead  className="table-header-group">
                                <tr className="table-row">
                                    <th className="border border-slate-600 bg-slate-100">Name</th>
                                    <th className="border border-slate-600 bg-slate-100">Email</th>
                                    <th className="border border-slate-600 bg-slate-100">Phone</th>
                                    <th className="border border-slate-600 bg-slate-100">Mentor</th>
                                    <th className="border border-slate-600 bg-slate-100">PreviousMentor</th>
                                    <th className="border border-slate-600 bg-slate-100">Assign/Change-Mentor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterStudent == "All" ?
                                    (
                                        allStudentData
                                        .map((studentData, index) => {
                                            return <Student key={index} data={studentData} />
                                        })
                                    )
                                    :
                                    (
                                        allStudentData
                                        .filter(data => data._id == filterStudent)
                                        .map((studentData, index) => {
                                            return <Student key={index} data={studentData} />
                                        })
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </>
    )
}

function Student({data}) {
    const navigate = useNavigate();
    const {setSelectedMentor,setSelectedStudent} = UseAppContext();

    function handleChange(studentId, mentorId) {
        navigate("/student/assignmentor");

        if(mentorId == null) {
            setSelectedMentor("-")
        } else {
            setSelectedMentor(mentorId._id)

        }
        setSelectedStudent(studentId)
    }
    return (
        <tr>
            <td className="border border-slate-400">{data.studentName}</td>
            <td className="border border-slate-400">{data.studentEmail}</td>
            <td className="border border-slate-400">{data.studentPhone}</td>
            <td className="border border-slate-400"> 
                {
                    (data.mentorId !== null) ? (data.mentorId.mentorName):(" -")
                }
            </td>
            <td className="border border-slate-400">
                {
                    (data.previousMentorId !== null) ? (data.previousMentorId.mentorName):(" -")
                }
            </td>
            <td className="border border-slate-400">
                {
                    (data.mentorId !== null) ? 
                    (
                        <button className="px-2 py-1 rounded-lg border-2 border-slate-400 text-blue" onClick={() => handleChange(data._id, data.mentorId)}>Assign/Change</button>
                    )
                    :
                    (
                        <button className="px-2 py-1 rounded-lg border-2 border-slate-400 text-blue" onClick={() => handleChange(data._id, data.mentorId = null)}>Assign/Change</button>
                    )
                }
            </td>
        </tr>
    )
}