import { NavBar } from "../Components/NavBar";

export function LandingPage() {
    return (
        <>
            <NavBar />
            <h2 className="text-center m-4 text-3xl font-bold">Welcome to Student Mentor Relation Setting</h2>
            <div className="m-4 flex flex-col items-center justify-center">
                <ol className="list-decimal text-2xl">
                    <li>API to create Mentor 
                        <ul className="list-disc list-inside ">
                            <li>Master - Mentor</li>
                        </ul>
                    </li>
                    <li>API to create Student<ul className="list-disc list-inside "><li>Master - Student</li></ul></li>
                    <li>API to Assign a student to Mentor
                        <ul className="list-disc list-inside ">
                            <li>Select one mentor and Add multiple Student</li>
                            <li>A student who has a mentor should not be shown in List</li>
                            <ul className="list-disc list-inside ">
                                <li>Transaction - AssignMentor-Single</li>
                            </ul>
                        </ul>
                    </li>
                    <li>API to Assign or Change Mentor for particular Student
                        <ul className="list-disc list-inside  ">
                            <li>Select One Student and Assign one Mentor
                                <ul className="list-disc list-inside "><li>Transaction - AssignMentor-Multiple</li></ul>
                            </li>
                        </ul>
                    </li>
                    <li>API to show all students for a particular mentor
                        <ul className="list-disc list-inside "><li>Reports - StudentListForMentor</li></ul>
                    </li>
                    <li>API to show the previously assigned mentor for a particular student.
                        <ul className="list-disc list-inside "><li>Reports - PreviousMentorForaStudent</li></ul>
                    </li>
                </ol>
            </div>
        </>
    )
}