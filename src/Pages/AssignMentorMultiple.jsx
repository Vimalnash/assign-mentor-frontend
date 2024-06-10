
import { useState } from "react";
import { NavBar } from "../Components/NavBar";
import { UseAppContext } from "../Context/AppContext";
import { baseurl, studenturl } from "../Handlers/BackentUrls";

export function AssignMentorMultiple() {
    const {studerror, allStudentData, allMentorData, setSelectedMentor,
        selectedMentor
    } = UseAppContext();
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [filterStudent, setFilterStudent] = useState("All");
    

    function assignmentor() {
        const selectedStudList = document.querySelectorAll(".selectedStud")

        let studIdArr = [];
        for (let i=0; i<selectedStudList.length; i++) {
            if(selectedStudList[i].checked) {
                studIdArr.push(selectedStudList[i].value)
            }
        }

        const payload = {
            mentorId: selectedMentor,
            studentIds: studIdArr
        };
        console.log(payload)
        fetch(`${baseurl}/${studenturl}/assignMentor/multiple`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.error) {
                setFailureMessage(data.error);
                setSuccessMessage("");
            } else {
                setSuccessMessage(data.message);
                setFailureMessage("");
                setTimeout(() => {
                    location.reload();
                },1000);

            }
        })
        .catch((error) => {console.log(error)})
    };

    return (
        <>
            <NavBar />

            <div className="text-center">
                <div>
                    <span>Select Mentor to Apply : </span>
                    <select 
                        className="border-2 border-slate-400 rounded-lg p-2 m-2" 
                        value={selectedMentor} 
                        onChange={(e) => setSelectedMentor(e.target.value) }
                    >
                        <option value={null}>-</option>
                        {
                            allMentorData.map((mentorData, index) => {
                                return (<option key={index} value={mentorData._id}>{mentorData.mentorName}</option>)
                            })
                        }
                    </select>
                </div>
                <div>
                    <span>Student : </span>
                    <select 
                        className="border-2 border-slate-400 rounded-lg p-2 m-2" 
                        onChange={(e) => setFilterStudent(e.target.value)}
                    >
                        <option value="All">All</option>
                        {
                            allStudentData.filter(data => data.mentorId == null).map((studentData, index) => {
                                return (<option key={index} value={studentData._id}>{studentData.studentName}</option>)
                            })
                        }
                    </select>
                </div>
                
                <div>
                    <button 
                        className="p-2 px-4 border-2 rounded-lg text-black font-semibold border-slate-200 bg-gradient-to-b from-slate-300 to-slate-500"
                        onClick={() => assignmentor()}
                    >Save</button>
                </div>
                <div className="p-2 text-center text-xl font-semibold">
                    {
                        successMessage ?
                        (<div>{successMessage}</div>):("")
                    }
                    {
                        failureMessage ?
                        (<div>{failureMessage}</div>):("")
                    }
                </div>

                {
                    studerror ?
                    (<div>{studerror}</div>)
                    :
                    (
                        <div>
                            <h2 className="text-center m-4 text-2xl font-bold">Student List - Mentor Not Assigned</h2>
                            <table className="table width-full mr-4 border border-collapse border-slate-400">
                            <caption className="caption-top">
                            </caption>
                            <thead  className="table-header-group">
                                    <tr className="table-row">
                                        <th className="border border-slate-600 bg-slate-100">Name</th>
                                        <th className="border border-slate-600 bg-slate-100">Email</th>
                                        <th className="border border-slate-600 bg-slate-100">Phone</th>
                                        <th className="border border-slate-600 bg-slate-100">Mentor</th>
                                        <th className="border border-slate-600 bg-slate-100">PreviousMentor</th>
                                        <th className="border border-slate-600 bg-slate-100">AssignMentor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filterStudent == "All" ?
                                        (
                                            allStudentData
                                            .filter(data => data.mentorId == null)
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


                <div>
                    <button 
                        className="p-2 px-4 mt-4 border-2 rounded-lg text-black font-semibold border-slate-200 bg-gradient-to-b from-slate-300 to-slate-500"
                        onClick={() => assignmentor()}
                    >Save</button>
                </div>
                <div className="p-2 text-center text-xl font-semibold">
                    {
                        successMessage ?
                        (<div>{successMessage}</div>):("")
                    }
                    {
                        failureMessage ?
                        (<div>{failureMessage}</div>):("")
                    }
                </div>
            </div>
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
            <td className="border border-slate-400">
                <input 
                    className="px-2 py-1 rounded-lg border-2 border-slate-400 text-slate selectedStud"
                    type="checkbox" 
                    name="student"
                    value={data._id}
                />
            </td>
        </tr>
    )
}