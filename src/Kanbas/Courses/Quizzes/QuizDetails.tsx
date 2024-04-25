import "../index.css";
import { useEffect, useState } from "react";
import * as client from "./client";
import { useNavigate, useParams } from "react-router";
import { Quiz } from "../../Database";
import { FaPencilAlt } from "react-icons/fa";

function QuizDetails() {
  const { courseId, quizId } = useParams();

  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz>({
    _id: "0",
    course_id: courseId as string,
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
    if (quizId) {
      client.findQuizById(quizId).then((quiz) => {
        setQuiz(quiz);
      });
    }
  }, [quizId]);

  const handlePublishQuiz = async (quiz: Quiz) => {
    quiz.published = !quiz.published;
    await client.updateQuiz(quiz);
    client.findQuizById(quizId).then((quiz) => {
      setQuiz(quiz);
    });
  };

  const handleGoToEditor = () => {
    navigate("../Quizzes/Quiz Editor/" + quiz._id);
  };

  const handleGoToPreview = () => {
    navigate("../Quizzes/Quiz Preview/" + quiz._id);
  };

  function boolToString(b: boolean): string {
    if (b) {
      return "Yes";
    }
    return "No";
  }

  var due = new Date(quiz.due);
  var available = new Date(quiz.available);
  var available_until = new Date(quiz.available_until);

  return (
    <div className="ms-3">
      <h1>Quiz Details</h1>
      <div>
        <button className="grey-button" onClick={handleGoToEditor}><FaPencilAlt className="me-1"></FaPencilAlt>Edit</button>
        <button className="grey-button" onClick={handleGoToPreview}>Preview</button>
        <button
          className="green-button"
          onClick={() => handlePublishQuiz(quiz)}
        >
          {quiz.published ? "Unpublish" : "Publish"}
        </button>
      </div>
      <h2>{quiz.title}</h2>
      <table>
        <tbody>
        <tr>
          <td>
            <strong>Quiz Type</strong>
          </td>
          <td>{quiz.quiz_type}</td>
        </tr>
        <tr>
          <td>
            <strong>Points</strong>
          </td>
          <td>{String(quiz.points)}</td>
        </tr>
        <tr>
          <td>
            <strong>Assignment Group</strong>
          </td>
          <td>{quiz.assignment_group}</td>
        </tr>
        <tr>
          <td>
            <strong>Shuffle Answers</strong>
          </td>
          <td>{boolToString(quiz.shuffle_answers)}</td>
        </tr>
        <tr>
          <td>
            <strong>Time Limit</strong>
          </td>
          <td>{quiz.time_limit}</td>
        </tr>
        <tr>
          <td>
            <strong>Multiple Attempts</strong>
          </td>
          <td>{boolToString(quiz.multiple_attempts)}</td>
        </tr>
        <tr>
          <td>
            <strong>Show Correct Answers</strong>
          </td>
          <td>{quiz.show_correct_answers}</td>
        </tr>
        <tr>
          <td>
            <strong>Access Code</strong>
          </td>
          <td>{quiz.access_code}</td>
        </tr>
        <tr>
          <td>
            <strong>One Question at a Time</strong>
          </td>
          <td>{boolToString(quiz.one_question_at_a_time)}</td>
        </tr>
        <tr>
          <td>
            <strong>Webcam Required</strong>
          </td>
          <td>{boolToString(quiz.webcam_required)}</td>
        </tr>
        <tr>
          <td>
            <strong>Lock Questions After Answering</strong>
          </td>
          <td>{boolToString(quiz.lock_questions_after_answering)}</td>
        </tr>
        <tr>
          <td>
            <strong>Due date</strong>
          </td>
          <td>{due.toDateString()}</td>
        </tr>
        <tr>
          <td>
            <strong>Available date</strong>
          </td>
          <td>{available.toDateString()}</td>
        </tr>
        <tr>
          <td>
            <strong>Until date</strong>
          </td>
          <td>{available_until.toDateString()}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default QuizDetails;
