import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./index.css"
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { useState, useEffect } from "react";
import { COURSES_API } from "../index";
import axios from "axios";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/QuizEditor";

function Courses() {
    const { courseId } = useParams();
    const [course, setCourse] = useState<any>({ _id: "" });
    const findCourseById = async () => {
        const resp = await axios.get(`${COURSES_API}/${courseId}`);
        if (resp.data === null) return;
        setCourse(resp.data);
    }

    useEffect(() => {
        findCourseById();
    }, [courseId]);

    const page = useParams()['*'];

    return (
        <div>
            <nav className="d-md-none navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleCourseNav"
                        aria-controls="navbarToggleCourseNav" aria-expanded="false" aria-label="Toggle course nav">
                        <span className="fa fa-chevron-down"></span>
                    </button>
                </div>
            </nav>


            <div className="collapse show" id="navbarToggleExternalContent">
                <div className="collapse show" id="navbarToggleCourseNav">
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-fill flex-grow-1">
                            <div className="d-flex flex-column flex-fill">
                                <div className="container">
                                    <div className="d-none d-md-block  ">
                                        <div className="row pt-2 ">
                                            <div className="col flex-shrink ">
                                                <FaBars color="red" size="30" />
                                                <div className="flex-grow" />
                                            </div>
                                            <div className="col-8 flex-grow wd-status-header">
                                                <h3 >{course?.name} {`> ${page}`}</h3>
                                            </div>
                                            <div className="col-3">
                                                <button type="button" className="btn btn-light"><i className="fas fa-glasses"></i> Student View</button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex flex-fill ">
                                        <div className="d-none d-md-block col-2">
                                            <CourseNavigation />
                                        </div>
                                        <div className="col flex-fill">
                                            <Routes>
                                                <Route path="/" element={<Navigate to="Home" />} />
                                                <Route path="Home" element={<Home />} />
                                                <Route path="Modules" element={<Modules />} />
                                                <Route path="Quizzes" element={<Quizzes />} />
                                                <Route path="Quizzes/Quiz Details" element={<QuizDetails />} />
                                                <Route path="Quizzes/Quiz Editor/*" element={<QuizEditor />} />
                                                <Route path="Piazza" element={<h1>Piazza</h1>} />
                                                <Route path="Assignments" element={<Assignments />} />
                                                <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
                                                <Route path="Grades" element={<h1>Grades</h1>} />
                                                <Route path="*" element={<h1> Not Linked</h1>} />
                                            </Routes>

                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>



        </div>
    );
}
export default Courses;