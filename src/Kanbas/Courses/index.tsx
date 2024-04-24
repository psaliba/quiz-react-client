import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./index.css";
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
import QuizPreview from "./Quizzes/QuizPreview";
import QuestionEditor from "./Quizzes/QuestionEditor";

function Courses() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>({ _id: "" });
  const findCourseById = async () => {
    const resp = await axios.get(`${COURSES_API}/${courseId}`);
    if (resp.data === null) return;
    setCourse(resp.data);
  };

  useEffect(() => {
    findCourseById();
  }, [courseId]);

  const page = useParams()["*"];

  return (
    <div>
      <div className="d-none d-md-block">
            <div className="course-header pt-3 ps-3">
                <FaBars className="fs-2 me-3"/>
                <h2 className="m-0">{course?.name} {`> ${page}`}</h2>
            </div>

      <hr />
      </div>
      <div className="d-flex">
        <CourseNavigation />
        <div className="flex-grow-1 pe-3">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route
              path="Quizzes/Quiz Details/:quizId"
              element={<QuizDetails />}
            />
            <Route
              path="Quizzes/Quiz Editor/:quizId/*"
              element={<QuizEditor />}
            />
            <Route
              path="Quizzes/Question Editor/:quizId/num/:questionNum/*"
              element={<QuestionEditor />}
            />
            <Route
              path="Quizzes/Quiz Preview/:quizId"
              element={<QuizPreview />}
            />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<h1>Assignment Editor</h1>}
            />
            <Route path="Grades" element={<h1>Grades</h1>} />
            <Route path="*" element={<h1> Not Linked</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default Courses;
