import { useEffect, useState } from "react";
import "./index.css";
import { Question, Quiz } from "../../Database";
import { useParams } from "react-router";
import * as client from "./client";
import { FaExclamation, FaPencilAlt, FaRegCircle } from "react-icons/fa";

function QuizPreview() {
  const [quiz, setQuiz] = useState<Quiz>();
  const [questionNumber, setQuestionNumber] = useState<number>(0);
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

  return (
    <div className="ms-3">
      <h2>{quiz?.title}</h2>

      <h5
        style={{
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          color: "red",
          borderRadius: "4px",
          padding: "8px",
        }}
      >
        <FaExclamation></FaExclamation> This is a preview of the published
        version of the quiz
      </h5>

      <h6>
        Started:{" "}
        {new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}{" "}
      </h6>

      <hr></hr>

      <div style={{ border: "1px solid black", padding: "0px", borderRadius: "4px",}}>
        <div
          style={{
            backgroundColor: "#d3d3d3",
            marginBottom: "10px",
            padding: "16px",
            width: "100%",
            borderRadius: "4px 4px 0px 0px"
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
              <FaRegCircle className="me-2"/>
              {option.toString()}
            </li>
          ))}
        </ul>
      </div>

      <br />

      <h5
        style={{
          border: "1px solid black",
          backgroundColor: "white",          
          padding: "10px",
          textAlign: "right",
          borderRadius: "4px",
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
            padding: "6px 6px",
            border: "1px solid black",
            marginTop: "-2px",
            fontSize: "0.8rem",
            margin: "0 0 0 10px",
          }}
        >
          Submit Quiz
        </button>
      </h5>

      <br />
      
      <button 
        style={{
          backgroundColor: "rgba(200, 200, 200, 0.5)",
          border: "1px solid gray",
          padding: "10px",
          borderRadius: "4px",
          float: "left",
          width: "100%",
          textAlign: "left"
        }}>
        <FaPencilAlt></FaPencilAlt> Keep Editing This Quiz
      </button>

      <br />
      <br />

      <br />


      <h4>Questions:</h4>
      <ul>
        {quiz?.questions.map((q, index) => (
          <li style={{ display: "flex" }}>
            <button
              style={{ width: "9%", margin: "5px 0", padding: "5px 0px",borderWidth: "1px" }}
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
