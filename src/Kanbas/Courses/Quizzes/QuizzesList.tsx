import "../index.css";
import { useEffect, useState } from "react";
import * as client from "./client";
import { useParams } from "react-router";
import { Quiz } from "../../Database";
import {
  FaBan,
  FaCheckCircle,
  FaEdit,
  FaEllipsisV,
  FaPlusCircle,
  FaRocket,
} from "react-icons/fa";

function QuizzesList() {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  //   const { courseId } = useParams();
  console.log("sammy" + JSON.stringify(courseId));

  useEffect(() => {
    // fetch quizzes
    client.findAllQuizzes(courseId).then((quizzes) => {
      setQuizzes(quizzes);
    });
  }, []);

  return (
    <div>
      <h1>Quizzes</h1>
      <ul className="list-group wd-modules">
        {quizzes.map((quiz: Quiz) => (
          <li
            className="list-group-item d-flex align-items-center justify-content-between"
            key={quiz.title}
          >
            <div>
              <div className="d-flex align-items-center">
                <FaRocket className="me-2" />
                <strong>{quiz.title}</strong>
              </div>
              <div>
                published: {String(quiz.published)} | {quiz.questions.length}{" "}
                Questions
              </div>
            </div>
            <div>
              <button className="btn btn-link p-0 me-2">
                <FaEllipsisV />
              </button>
              <button className="btn btn-link p-0">
                <FaCheckCircle className="text-success" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizzesList;
