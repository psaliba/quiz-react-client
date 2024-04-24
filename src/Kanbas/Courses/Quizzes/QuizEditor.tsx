import "../index.css";
import { useEffect, useState } from "react";
import * as client from "./client";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router";
import { Link, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Quiz, Question, Option } from "../../Database";


function QuizEditor() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const handleSave = async (quiz: Quiz) => {
    await client.updateQuiz(quiz);
    navigate("../Quizzes/Quiz Details/" + quizId);
  };

  const handleSaveAndPublish = async (quiz: Quiz) => {
    quiz.published = true;
    await client.updateQuiz(quiz);
    navigate("../Quizzes");
  };

  const { pathname } = useLocation();

  function Nav() {
    return (
      <nav className="nav nav-tabs mt-2">
        <Link
          to="Details"
          className={`nav-link ${pathname.includes("Details") ? "active" : ""}`}
          style={{ color: "#b3292e" }}
        >
          Details
        </Link>
        <Link
          to="Questions"
          className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`}
          style={{ color: "#b3292e" }}
        >
          Questions
        </Link>
      </nav>
    );
  }

  function Details() {
    const [quiz, setQuiz] = useState<Quiz>({
      _id: "0",
      course_id: "",
      title: "New Quiz",
      description: "",
      published: false,
      available: new Date(),
      available_until: new Date(),
      due: new Date(),
      quiz_type: "Graded Quiz",
      points: 0,
      assignment_group: "Quizzes",
      shuffle_answers: false,
      time_limit: 20,
      multiple_attempts: false,
      show_correct_answers: "After Submitted",
      access_code: "",
      one_question_at_a_time: true,
      webcam_required: false,
      lock_questions_after_answering: false,
      questions: [],
    });

    useEffect(() => {
      client.findQuizById(quizId).then((quiz) => {
        setQuiz(quiz);
      });
    }, []);

    return (
      <div className="ms-3 mt-2">
        <h1>Details</h1>
        <form>
          <label>
            Title:
            <input
              type="text"
              name="title"
              className="ms-2"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
          </label>
          <br></br>
          <label>
            Description:
            <br />
            <ReactQuill
              theme="snow"
              value={quiz.description}
              onChange={(value) => setQuiz({ ...quiz, description: value })}
            />
          </label>
        </form>
        <form>
          <label>
            Quiz type:
            <select
              id="quiz-type"
              name="quiz-type"
              className="ms-2"
              value={quiz.quiz_type}
              onChange={(e) => setQuiz({ ...quiz, quiz_type: e.target.value })}
            >
              <option value="graded-quiz">Graded Quiz</option>
              <option value="practice-quiz">Practice Quiz</option>
              <option value="graded-survey">Graded Survey</option>
              <option value="ungraded-survey">Ungraded Survey</option>
            </select>
          </label>
          <br></br>
          <label>
            Points:
            <input
              type="number"
              id="points"
              className="ms-2"
              name="points"
              min="0"
              max="100"
              value={String(quiz.points)}
              onChange={(e) =>
                setQuiz({ ...quiz, points: Number(e.target.value) })
              }
            />
          </label>
          <br></br>
          <label>
            Assignment group:
            <select
              id="assignment-group"
              name="assignment-group"
              className="ms-2"
              value={quiz.assignment_group}
              onChange={(e) =>
                setQuiz({ ...quiz, assignment_group: e.target.value })
              }
            >
              <option value="quizzes">Quizzes</option>
              <option value="exams">Exams</option>
              <option value="assignment">Assignment</option>
              <option value="project">Project</option>
            </select>
          </label>
          <br></br>
          <label>
            Shuffle answers:
            <input
              type="checkbox"
              checked={quiz.shuffle_answers}
              id="shuffle-answers"
              className="ms-2"
              name="shuffle-answers"
              onChange={(e) =>
                setQuiz({ ...quiz, shuffle_answers: Boolean(e.target.value) })
              }
            />
          </label>
          <br></br>
          <label>
            Time Limit:
            <input
              type="number"
              id="limit"
              name="limit"
              className="ms-2"
              min="1"
              value={String(quiz.time_limit)}
              onChange={(e) =>
                setQuiz({ ...quiz, time_limit: Number(e.target.value) })
              }
            />
          </label>
          <br></br>
          <label>
            Allow multiple attempts:
            <input
              type="checkbox"
              checked={quiz.multiple_attempts}
              id="multiple-attempts"
              name="multiple-attempts"
              className="ms-2"
              onChange={(e) =>
                setQuiz({ ...quiz, multiple_attempts: Boolean(e.target.value) })
              }
            />
          </label>
          <br></br>
          <label>
            Show correct answers:
            <select
              id="show-correct-answers"
              name="show-correct-answers"
              className="ms-2"
              value={quiz.show_correct_answers}
              onChange={(e) =>
                setQuiz({ ...quiz, show_correct_answers: e.target.value })
              }
            >
              <option value="Immediately">Immedidately</option>
              <option value="After-Submitted">After Submitted</option>
              <option value="Never">Never</option>
            </select>
          </label>
          <br></br>
          <label>
            Access code:
            <input
              type="text"
              className="ms-2"
              name="access-code"
              value={quiz.access_code}
              onChange={(e) =>
                setQuiz({ ...quiz, access_code: e.target.value })
              }
            />
          </label>
          <br></br>
          <label>
            One question at a time:
            <input
              type="checkbox"
              checked={quiz.one_question_at_a_time}
              id="one-question"
              name="one-question"
              className="ms-2"
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  one_question_at_a_time: Boolean(e.target.value),
                })
              }
            />
          </label>
          <br></br>
          <label>
            Webcam required:
            <input
              type="checkbox"
              checked={quiz.webcam_required}
              id="webcam"
              name="webcam"
              className="ms-2"
              onChange={(e) =>
                setQuiz({ ...quiz, webcam_required: Boolean(e.target.value) })
              }
            />
          </label>
          <br></br>
          <label>
            Lock questions after answering:
            <input
              type="checkbox"
              checked={quiz.lock_questions_after_answering}
              id="lock-questions"
              name="lock-questions"
              className="ms-2"
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  lock_questions_after_answering: Boolean(e.target.value),
                })
              }
            />
          </label>
          <br></br>
          <label>
            Due date:
            <input
              type="datetime-local"
              id="due-date"
              className="ms-2"
              name="due-date"
              value={String(quiz.due)}
              onChange={(e) =>
                setQuiz({ ...quiz, due: new Date(Date.parse(e.target.value)) })
              }
            />
          </label>
          <br></br>
          <label>
            Available date:
            <input
              type="datetime-local"
              id="available-date"
              name="available-date"
              className="ms-2"
              value={String(quiz.available)}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  available: new Date(Date.parse(e.target.value)),
                })
              }
            />
          </label>
          <label>
            Until date:
            <input
              type="datetime-local"
              id="until-date"
              name="until-date"
              className="ms-2"
              value={String(quiz.available_until)}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  available_until: new Date(Date.parse(e.target.value)),
                })
              }
            />
          </label>
        </form>
        <br></br>
        <br></br>
        <button onClick={() => handleSave(quiz)} className="red-button">
          Save
        </button>
        <button onClick={() => handleSaveAndPublish(quiz)}>
          Save & Publish
        </button>
        <Link to={"../../Quizzes"}>
          <button>Cancel</button>
        </Link>
        <br></br>
        <br></br>
      </div>
    );
  }

  function Question() {
    const [quiz, setQuiz] = useState<Quiz>({
      _id: "0",
      course_id: "",
      title: "New Quiz",
      description: "",
      published: false,
      available: new Date(),
      available_until: new Date(),
      due: new Date(),
      quiz_type: "Graded Quiz",
      points: 0,
      assignment_group: "Quizzes",
      shuffle_answers: false,
      time_limit: 20,
      multiple_attempts: false,
      show_correct_answers: "After Submitted",
      access_code: "",
      one_question_at_a_time: true,
      webcam_required: false,
      lock_questions_after_answering: false,
      questions: [],
    });

    const { quizId } = useParams();
    useEffect(() => {
      client.findQuizById(quizId).then((quiz) => {
        setQuiz(quiz);
      });
    }, []);

    const goToQuestionEditor = (questionNumber: Number) => {
      navigate(
        "../Quizzes/Question Editor/" + quiz._id + "/num/" + questionNumber
      );
    };

    const deleteQuestion = async (questionNumber: Number) => {
      var newQuestions: Question[] = quiz.questions;
      newQuestions.splice(Number(questionNumber), 1);
      const newQuiz: Quiz = { ...quiz, questions: newQuestions };
      await client.updateQuiz(newQuiz);
      client.findQuizById(quizId).then((quiz) => {
        setQuiz(quiz);
      });
    }

    return (
      <div className="ms-3 mt-2">
        <div >
          <h1
            style={{
              display: "inline-block",
            }}>
            Questions
          </h1>
          <button className="red-button mt-1" onClick={() => goToQuestionEditor(quiz.questions.length)}>+ Question</button>
        </div>
        {quiz.questions.map((question, index) => (
          <div
            style={{
              border: "1px solid gray",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            <h4
              style={{
                display: "inline-block",
              }}>
              <strong>
                Question {index + 1}{" "}
              </strong>
            </h4>
            <button className="btn btn-danger" onClick={() => deleteQuestion(index)}>Delete</button>
            <button className="btn btn-primary" onClick={() => goToQuestionEditor(index)}>Edit</button>
            <p><strong>Title:</strong> {question.title}</p>
            <p><strong>Question:</strong> <span dangerouslySetInnerHTML={{ __html: question.question }} /></p>
            <p><strong>Points:</strong> {question.points}</p>
            <p><strong>Type:</strong> {question.type}</p>
            <h5><strong>Answers:</strong></h5>
            {question.options.map((option, optionIndex) => (
              <p
                style={{
                  margin: "8px",
                }}>
                <strong>Option {optionIndex + 1}</strong>: {option.toString()}
              </p>
            ))}
          </div>
        ))}
        <button onClick={() => handleSave(quiz)} className="red-button">
          Save
        </button>
        <button onClick={() => handleSaveAndPublish(quiz)}>
          Save & Publish
        </button>
        <Link to={"../../Quizzes"}>
          <button>Cancel</button>
        </Link>
        <br /><br />
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="Details" />} />
        <Route path="Details" element={<Details />} />
        <Route path="Questions" element={<Question />} />
      </Routes>
    </div>
  );
}

export default QuizEditor;
