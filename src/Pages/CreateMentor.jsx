import { useState } from "react";
import { NavBar } from "../Components/NavBar";
import { useFormik } from "formik";
import { mentorSchema } from "../Schemas/MentorSchema";
import { baseurl, mentorurl } from "../Handlers/BackentUrls";
import { UseAppContext } from "../Context/AppContext";

// Create New Mentor Master
export function CreateMentor() {
    const {allMentorData, setAllMentorData} = UseAppContext();
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");

    const mentorData = {
        mentorName: "",
        mentorEmail: "",
        mentorPhone: ""
    }

    const {
        values, 
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors,
    } = useFormik({
        initialValues: mentorData,
        validationSchema: mentorSchema,
        onSubmit: (values, {resetForm}) => {
            addMentor(values);
            resetForm({values: ""})
        }
    });

    function addMentor(newMentorData) {
        // console.log(newMentorData);
        fetch(`${baseurl}/${mentorurl}/create`, {
            method: "POST",
            body: JSON.stringify(newMentorData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((addedData) => {
            if (addedData.error) {
                // console.log(addedData)
                setFailureMessage(addedData.error);
                setSuccessMessage("");
            } else {
                // console.log(addedData);
                setAllMentorData([...allMentorData, addedData.data])
                setSuccessMessage(addedData.message);
                setFailureMessage("");
            }
        })
    }

    return (
        <div>
            <NavBar />
            <div>
                <h1 className="text-center m-4 text-2xl font-bold">Create Mentor</h1>
                <form className="flex flex-col gap-2 p-5 justify-center items-center"  onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 p-5 ">
                        <p>MentorName : </p>
                        <input 
                        className="p-3 rounded-lg border-2 border-slate-300 hover:ring hover:ring-slate-400 focus:outline-none focus:ring focus:ring-slate-400"
                        type="text" 
                        placeholder="MentorName"
                        name="mentorName"
                        value={values.mentorName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {
                            touched.mentorName && errors.mentorName ?
                            (<div className="pl-4 text-start text-small text-error">{errors.mentorName}</div>)
                            :
                            ("")
                        }
                    </div>
                    <div className="flex flex-col gap-2 p-5">
                        <p>MentorEmail :</p>
                        <input 
                            className="p-3 rounded-lg border-2 border-slate-300 hover:ring hover:ring-slate-400 focus:outline-none focus:ring focus:ring-slate-400"
                            type="text" 
                            placeholder="MentorEmail"
                            name="mentorEmail"
                            value={values.mentorEmail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            touched.mentorEmail && errors.mentorEmail ?
                            (<div className="pl-4 text-start text-small text-error">{errors.mentorEmail}</div>)
                            :
                            ("")
                        }
                    </div>
                    <div className="flex flex-col gap-2 p-5">
                        <p>MentorPhone : </p>
                        <input 
                            className="p-3 rounded-lg border-2 border-slate-300 hover:ring hover:ring-slate-400 focus:outline-none focus:ring focus:ring-slate-400"
                            type="text" 
                            placeholder="mentorPhone"
                            name="mentorPhone"
                            value={values.mentorPhone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            touched.mentorPhone && errors.mentorPhone ?
                            (<div className="pl-4 text-start text-small text-error">{errors.mentorPhone}</div>)
                            :
                            ("")
                        }
                    </div>
                    <button 
                        className="p-2 px-4 border-2 rounded-lg text-black font-semibold border-slate-200 bg-gradient-to-b from-slate-300 to-slate-500"
                        type="submit">
                        Add</button>
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