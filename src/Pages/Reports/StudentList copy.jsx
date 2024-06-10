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
                <select className="p-2 m-2" onChange={(e) => setFilterStudent(e.target.value)}>
                    <option value="All">All</option>
                    {
                        allStudentData.map((studentData, index) => {
                            return (<option key={index} value={studentData.studentName}>{studentData.studentName}</option>)
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
                        <h2 className="text-center font-semibold">Student Report</h2>
                        <table cellSpacing={1} cellPadding={2}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Mentor</th>
                                    <th>PreviousMentor</th>
                                    <th>Assign/Change-Mentor</th>
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
                                        .filter(data => data.studentName == filterStudent)
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
    const {setSelectedMentor} = UseAppContext();

    function handleChange(mentorData) {
        navigate("/student/assignmentor");
        setSelectedMentor(mentorData._id)
        
    }
    return (
        <tr>
            <td>{data.studentName}</td>
            <td>{data.studentEmail}</td>
            <td>{data.studentPhone}</td>
            <td> 
                {
                    (data.mentor !== null) ? (data.mentor.mentorName):(" -")
                }
            </td>
            <td>
                {
                    (data.previousMentor !== null) ? (data.previousMentor.mentorName):(" -")
                }
            </td>
            <td>
                <button onClick={() => handleChange(data._id, data.mentor)}>Assign/Change</button>
            </td>
        </tr>
    )
}