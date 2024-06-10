import { createContext, useContext, useState } from "react";

const AppCtx = createContext(null);

// App Context Function Hanlding

export function AppContext({children}) {
    const [allStudentData, setAllStudentData] = useState([]);
    const [studerror, setStudError] = useState("");
    const [allMentorData, setAllMentorData] = useState([]);
    const [mentorError, setMentorError] = useState("");

    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedMentor, setSelectedMentor] = useState("");


    return (
        <AppCtx.Provider value={{
            allStudentData, setAllStudentData,studerror, setStudError,
            allMentorData, setAllMentorData, mentorError, setMentorError,
            selectedStudent, setSelectedStudent, selectedMentor, setSelectedMentor
        }}>
            {children}
        </AppCtx.Provider>
    )
}

export function UseAppContext() {
    return useContext(AppCtx)
}