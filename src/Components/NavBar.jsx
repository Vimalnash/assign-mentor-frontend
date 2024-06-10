import { useNavigate } from "react-router-dom"

export function NavBar() {
    const navigate = useNavigate();
    return (
        <>
            <div className="navbar bg-slate-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-54">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Master</a>
                                <ul className="p-2">
                                    <li><a onClick={() => {navigate("/create/mentor")}}>Mentor</a></li>
                                    <li><a onClick={() => {navigate("/create/student")}}>Student</a></li>
                                </ul>
                            </li>
                            <li>
                                <a>Transaction</a>
                                <ul className="p-2">
                                    <li><a onClick={() => {navigate("/student/studentList/")}}>AssignMentor-Single</a></li>
                                    <li><a onClick={() => {navigate("/student/assignmentor/multiple")}}>AssignMentorMultipleStudents</a></li>
                                </ul>
                            </li>
                            <li>
                                <a>Reports</a>
                                <ul className="p-2">
                                    <li><a onClick={() => {navigate("/reports/StudentListForaMentor")}}>StudentListForMentor</a></li>
                                    <li><a onClick={() => {navigate("/reports/PreviousMentorForaStudent")}}>PreviousMentorForaStudent</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl"  onClick={() => {navigate("/")}}>Home</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <details>
                            <summary>Master</summary>
                                <ul className="p-2 menulist">
                                    <li><a onClick={() => {navigate("/create/mentor")}}>Mentor</a></li>
                                    <li><a onClick={() => {navigate("/create/student")}}>Student</a></li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                            <summary>Transaction</summary>
                                <ul className="p-2 menulist">
                                    <li><a onClick={() => {navigate("/student/studentList")}}>AssignMentor-Single</a></li>
                                    <li><a onClick={() => {navigate("/student/assignmentor/multiple")}}>AssignMentorMultipleStudents</a></li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                            <summary>Reports</summary>
                                <ul className="p-2 menulist">
                                    <li><a onClick={() => {navigate("/reports/StudentListForaMentor")}}>StudentListForMentor</a></li>
                                    <li><a onClick={() => {navigate("/reports/PreviousMentorForaStudent")}}>PreviousMentorForaStudent</a></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <button className="px-2 py-1 rounded-lg border-2 border-slate-400 text-blue" onClick={() => {location.reload()}}>Refresh Page</button>
                </div>
            </div>
        </>
    )
}