import "../index.css";
import React, { useEffect, useState } from "react";
import * as client from "./client";
import { useParams } from "react-router";
import { Quiz } from "../../Database";
import { FaBan, FaCheckCircle, FaEllipsisV, FaRocket } from "react-icons/fa";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Link } from "react-router-dom";

function QuizzesList() {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    // fetch quizzes
    client.findAllQuizzes(courseId).then((quizzes) => {
      setQuizzes(quizzes);
    });
  }, []);

  const deleteQuiz = (quizid: string) => {
    return async () => {
      await client.deleteQuiz(quizid);
      setQuizzes(quizzes.filter((quiz: Quiz) => quiz._id !== quizid));
    };
  };

  const togglePublishQuiz = async (quiz: Quiz) => {
    quiz.published = !quiz.published;
    await client.updateQuiz(quiz);

    client.findAllQuizzes(courseId).then((quizzes) => {
      setQuizzes(quizzes);
    });
  };

  const quizContext = (quiz: Quiz) => {
    const popover = (
      <Popover id="context-menu">
        <Popover.Body style={{ width: "120px", height: "140px" }}>
          <button className="btn">
            {" "}
            <Link style={{ textDecoration: "none", color: "black" }} to={`Quiz Editor/${quiz._id}`}>Edit</Link>{" "}
          </button>

          <button className="btn" onClick={deleteQuiz(quiz._id)}>
            {" "}
            Delete{" "}
          </button>
          <button className="btn" onClick={() => togglePublishQuiz(quiz)}>
            {" "}
            {quiz.published ? "Unpublish" : "Publish"}{" "}
          </button>
        </Popover.Body>
      </Popover>
    );

    return (
      <OverlayTrigger
        trigger="click"
        placement="left"
        overlay={popover}
        rootClose // Close the popover when clicking outside
      >
        <span style={{ cursor: "pointer" }}>
          {" "}
          <FaEllipsisV />{" "}
        </span>
      </OverlayTrigger>
    );
  };

  const renderAQuiz = (quiz: Quiz) => {
    const quizSubDetails = () => {
      const currentDate = new Date();
      const availableDate = new Date(quiz.available);
      const availableUntilDate = new Date(quiz.available_until);
      const isAvailable = currentDate >= availableDate;
      const isClosed = availableUntilDate <= currentDate;

      // Formatting the date
      const formattedAvailableDate = availableDate.toLocaleDateString();
      const formattedDueDate = new Date(quiz.due).toLocaleDateString();

      let statusMessage;
      if (isAvailable) {
        if (isClosed) {
          statusMessage = `Closed | Due Date: ${formattedDueDate}`;
        } else {
          statusMessage = `Available ${formattedAvailableDate} | Due Date: ${formattedDueDate}`;
        }
      } else {
        statusMessage = `Not available until ${formattedAvailableDate}`;
      }

      return (
        <div>
          {statusMessage} | {quiz.points.toString()} points | {quiz.questions.length} Questions
        </div>
      );
    };
    return (
      <li
        className="list-group-item d-flex align-items-center justify-content-between"
        key={quiz.title}
      >
        <div>
          <Link style={{ textDecoration: "none", color: "black" }}to={`Quiz Details/${quiz._id}`}>
            <div className="d-flex align-items-center">
              <FaRocket className="me-2 green" />
              <strong>{quiz.title}</strong>
            </div>
          </Link>
          <div>{quizSubDetails()}</div>
        </div>
        <div>
          <button
            className="btn btn-link p-0"
            onClick={() => togglePublishQuiz(quiz)}
          >
            {quiz.published ? (
              <FaCheckCircle className="ms-2 text-success bigger-icon me-1" />
            ) : (
              <FaBan className="ms-2 text-danger bigger-icon me-1" />
            )}
          </button>

          {quizContext(quiz)}
        </div>
      </li>
    );
  };
  return (
    <div>
      <h1>Quizzes</h1>
      <ul className="list-group quiz-modules">
        {quizzes.map((quiz: Quiz) => renderAQuiz(quiz))}
      </ul>
    </div>
  );
}

export default QuizzesList;
