
import { useState } from "react";
import { NavBar } from "../Components/NavBar";
import { UseAppContext } from "../Context/AppContext";
import { baseurl, studenturl } from "../Handlers/BackentUrls";
import { useNavigate } from "react-router-dom";

export function AssignMentorSingle() {
    const navigate = useNavigate();
    const {allStudentData, allMentorData, setSelectedStudent, setSelectedMentor,
        selectedMentor, selectedStudent
    } = UseAppContext();
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState();


    function assignmentor(selectedStudentId) {
        const payload = {
            mentorId: selectedMentor
        };

        fetch(`${baseurl}/${studenturl}/assignMentor/single/${selectedStudentId}`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            if (data.error) {
                setFailureMessage(data.error);
                setSuccessMessage("");
            } else {
                setSuccessMessage(data.message);
                setFailureMessage("");
                setTimeout(() => {
                    navigate("/student/studentList")
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
                <p className="m-4 text-2xl font-bold">Assign Mentor</p>
                <p>Student : </p>
                <select className="border-2 border-slate-400 rounded-lg p-2 m-2" value={selectedStudent} disabled >
                    {
                        allStudentData.map((studentData, index) => {
                            return (<option key={index} disabled value={studentData._id}>{studentData.studentName}</option>)
                        })

                    }
                </select>
                <p>Mentor : </p>
                <select className="border-2 border-slate-400 rounded-lg p-2 m-2" value={selectedMentor} onChange={(e) => setSelectedMentor(e.target.value)}>
                    <option value={"-"}>-</option>
                    {
                        allMentorData.map((mentorData, index) => {
                            return (<option key={index} value={mentorData._id}>{mentorData.mentorName}</option>)
                        })

                    }
                </select>
                <div>
                    <button 
                        className="p-2 px-4 border-2 rounded-lg text-black font-semibold border-slate-200 bg-gradient-to-b from-slate-300 to-slate-500"
                        onClick={() => assignmentor(selectedStudent)}
                    >Update</button>
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
                                        {
                        errorMessage ?
                        (<div>{errorMessage}</div>):("")
                    }
                </div>
            </div>
        </>
    )
}