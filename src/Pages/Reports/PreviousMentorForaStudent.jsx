import { useState } from "react"
import { NavBar } from "../../Components/NavBar";
import { UseAppContext } from "../../Context/AppContext";
import { baseurl, studenturl } from "../../Handlers/BackentUrls";

export function PreviousMentorForaStudent() {
  const {
    allStudentData
    } = UseAppContext();

    const [filteredStudentId, setFilteredStudentId] = useState("");
    const [studentData, setStudentData] = useState([]);
    const [errorMessage, setErrorMessage] = useState();

    function getStudentData(filteredStudentId) {
        fetch(`${baseurl}/${studenturl}/${filteredStudentId}`, {
            method: "GET"
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if(data.error) {
                setErrorMessage(data.error);
                setStudentData([]);
            } else {
                setErrorMessage("");
                setStudentData(data.data);
            }
        })
        .catch((error) => {console.log(error)})
    }

    return (
        <>
            <NavBar />

            <div className="text-center">
                <select 
                className="p-2 px-4 border-2 rounded-lg text-black font-semibold border-slate-200 bg-gradient-to-b from-slate-300 to-slate-500"
                onChange={(e) => setFilteredStudentId(e.target.value)}
                >
                    <option></option>
                    {
                        allStudentData.map((studentData, index) => {
                            return (<option key={index} value={studentData._id}>{studentData.studentName}</option>)
                        })
                    }
                </select>
                <button 
                    className="p-2 px-4 border-2 rounded-lg text-black font-semibold border-slate-200 bg-gradient-to-b from-slate-300 to-slate-500"
                    onClick={() => getStudentData(filteredStudentId)}
                    >
                    Search/Load
                </button>
            </div>
            {
                errorMessage ? (<div>{errorMessage}</div>) : ("")
            }
            {
                studentData && 
                (
                    <div>
                        <h2 className="text-center m-4 text-2xl font-bold">Previous Mentor for a Student</h2>
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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    studentData.map((studentDetails, index) => {
                                        return <Student key={index} data={studentDetails} />
                                    })
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
        </tr>
    )
}