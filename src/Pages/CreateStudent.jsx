import { useState } from "react";
import { NavBar } from "../Components/NavBar";
import { useFormik } from "formik";
import { studentSchema } from "../Schemas/StudentSchema";
import { baseurl, studenturl } from "../Handlers/BackentUrls";
import { UseAppContext } from "../Context/AppContext";

// Create New Mentor Master
export function CreateStudent() {
    const {allStudentData, setAllStudentData} = UseAppContext();
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");

    const studentData = {
        studentName: "",
        studentEmail: "",
        studentPhone: ""
    }

    const {
        values, 
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors,
    } = useFormik({
        initialValues: studentData,
        validationSchema: studentSchema,
        onSubmit: (values, {resetForm}) => {
            addStudent(values);
            resetForm({values: ""})
        }
    });

    function addStudent(newStudentData) {
        console.log(newStudentData);
        fetch(`${baseurl}/${studenturl}/create`, {
            method: "POST",
            body: JSON.stringify(newStudentData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((addedData) => {
            if (addedData.error) {
                console.log(addedData)
                setFailureMessage(addedData.error);
                setSuccessMessage("");
            } else {
                console.log(addedData);
                setSuccessMessage(addedData.message);
                setFailureMessage("");
                setAllStudentData([...allStudentData, addedData.data])
            }
        })
    }

    return (
        <div>
            <NavBar />
            <div>
                <h1 className="text-center m-4 text-2xl font-bold">Create Student</h1>
                <form className="flex flex-col gap-2 p-5 justify-center items-center"  onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 p-5 ">
                        <p>StudentName : </p>
                        <input 
                        className="p-3 rounded-lg border-2 border-slate-300 hover:ring hover:ring-slate-400 focus:outline-none focus:ring focus:ring-slate-400"
                        type="text" 
                        placeholder="StudentName"
                        name="studentName"
                        value={values.studentName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {
                            touched.studentName && errors.studentName ?
                            (<div className="pl-4 text-start text-small text-error">{errors.studentName}</div>)
                            :
                            ("")
                        }
                    </div>
                    <div className="flex flex-col gap-2 p-5">
                        <p>StudentEmail :</p>
                        <input 
                            className="p-3 rounded-lg border-2 border-slate-300 hover:ring hover:ring-slate-400 focus:outline-none focus:ring focus:ring-slate-400"
                            type="text" 
                            placeholder="StudentEmail"
                            name="studentEmail"
                            value={values.studentEmail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            touched.studentEmail && errors.studentEmail ?
                            (<div className="pl-4 text-start text-small text-error">{errors.studentEmail}</div>)
                            :
                            ("")
                        }
                    </div>
                    <div className="flex flex-col gap-2 p-5">
                        <p>StudentPhone : </p>
                        <input 
                            className="p-3 rounded-lg border-2 border-slate-300 hover:ring hover:ring-slate-400 focus:outline-none focus:ring focus:ring-slate-400"
                            type="text" 
                            placeholder="StudentPhone"
                            name="studentPhone"
                            value={values.studentPhone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            touched.studentPhone && errors.studentPhone ?
                            (<div className="pl-4 text-start text-small text-error">{errors.studentPhone}</div>)
                            :
                            ("")
                        }
                    </div>
                    <button 
                        className="p-2 px-4 border-2 rounded-lg text-black font-semibold border-slate-200 bg-gradient-to-b from-slate-300 to-slate-500"
                        type="submit">
                        Add
                    </button>
                </form>
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
        </div>

    )
}