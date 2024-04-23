import { useEffect, useState } from "react";
import "./index.css";
import { Question, Quiz } from "../../Database";
import { useParams } from "react-router";
import * as client from "./client";
import {
  FaCircle,
  FaDotCircle,
  FaExclamation,
  FaPencilAlt,
  FaRegCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function QuizPreview() {
  const [quiz, setQuiz] = useState<Quiz>();
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const { quizId } = useParams();

  useEffect(() => {
    if (quizId) {
      client.findQuizById(quizId).then((quiz) => {
        setQuiz(quiz);
      });
    }
  }, [quizId]);

  const changeQuestion = (questionNumber: number) => {
    setQuestionNumber(questionNumber);
  };

  const getQuestion = (): Question | null => {
    const question = quiz?.questions[questionNumber];
    if (!question) return null;

    return question;
  };

  console.log(quiz);

  return (
    <div>
      <h2>{quiz?.title}</h2>

      <h5
        style={{
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          color: "red",
          border: "1px solid red",
        }}
      >
        <FaExclamation></FaExclamation> This is a preview of the published
        version of the quiz
      </h5>

      <h4>
        Started:{" "}
        {new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}{" "}
      </h4>

      <hr></hr>

      <div style={{ border: "1px solid black", padding: "10px" }}>
        <div
          style={{
            backgroundColor: "#d3d3d3",
            marginBottom: "10px",
            padding: "10px",
            width: "calc(100% - 20px)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <strong>
              Question {(questionNumber.valueOf() + 1).toString()}
            </strong>
            <strong>Points: {getQuestion()?.points}</strong>
          </div>
        </div>
        <ul style={{ padding: "0 10px" }}>{getQuestion()?.question}</ul>
        <ul>
          {getQuestion()?.options.map((option, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <FaRegCircle />
              {option.toString()}
            </li>
          ))}
        </ul>
      </div>

      <br />

      <h5
        style={{
          backgroundColor: "rgba(200, 200, 200, 1)",
          border: "1px solid #ccc",
          padding: "10px",
          textAlign: "right",
        }}
      >
        Quiz Saved at{" "}
        {new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}{" "}
        <button
          style={{
            padding: "2px 5px",
            fontSize: "0.8rem",
            margin: "0 0 0 10px",
          }}
        >
          Submit Quiz
        </button>
      </h5>

      <br />

      <h6
        style={{
          backgroundColor: "rgba(200, 200, 200, 0.5)",
          border: "1px solid gray",
        }}
      >
        <FaPencilAlt></FaPencilAlt> Keep Editing This Quiz
      </h6>

      <br />

      <h4>Questions:</h4>
      <ul>
        {quiz?.questions.map((q, index) => (
          <li style={{ display: "block" }}>
            <button
              style={{ width: "100%", margin: "5px 0" }}
              onClick={() => changeQuestion(index)}
            >
              Question {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizPreview;
