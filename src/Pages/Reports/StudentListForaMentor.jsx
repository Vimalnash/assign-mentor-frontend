import { useState } from "react"
import { NavBar } from "../../Components/NavBar";
import { UseAppContext } from "../../Context/AppContext";
import { baseurl, studenturl } from "../../Handlers/BackentUrls";

export function StudentListForaMentor() {
  const {
    allMentorData
    } = UseAppContext();

    const [filteredMentorId, setFilteredMentorId] = useState("");
    const [filteredMentor, setFilteredMentor] = useState();
    const [studentListForMentor, setStudentListForMentor] = useState([]);
    const [errorMessage, setErrorMessage] = useState();

    function getStudentListforMentor(filteredMentorId) {
        const mentorDetails = allMentorData.filter((mentorData) => mentorData._id == filteredMentorId);
        setFilteredMentor(mentorDetails[0])
        fetch(`${baseurl}/${studenturl}/mentor/${filteredMentorId}`, {
            method: "GET"
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if(data.error) {
                setErrorMessage(data.error);
                setStudentListForMentor([]);
            } else {
                setErrorMessage("");
                setStudentListForMentor(data.data);
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
                onChange={(e) => setFilteredMentorId(e.target.value)}
                >
                    <option></option>
                    {
                        allMentorData.map((mentorData, index) => {
                            return (<option key={index} value={mentorData._id}>{mentorData.mentorName}</option>)
                        })
                    }
                </select>
                <button 
                        className="p-2 px-4 border-2 rounded-lg text-black font-semibold border-slate-200 bg-gradient-to-b from-slate-300 to-slate-500"
                        onClick={() => getStudentListforMentor(filteredMentorId)}
                        >
                        Search/Load
                    </button>
            </div>
            <h2 className="text-center m-4 text-2xl font-bold">Student List For a Mentor</h2>
            { filteredMentor && (
                <div className="flex flex-row gap-4 p-2 border-4 border-slate-200 rounded-lg justify-center">
                    <div>MentorName: {filteredMentor.mentorName},</div>
                    <div>MentorEmail: {filteredMentor.mentorEmail},</div>
                    <div>MentorPhone: {filteredMentor.mentorPhone}</div>
                </div>)
            }
            {
                errorMessage ?
                (<div className="text-center text-2xl">{errorMessage}</div>) :
                (
                    <div>
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
                                    studentListForMentor.map((studentData, index) => {
                                        return <Student key={index} data={studentData} />
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