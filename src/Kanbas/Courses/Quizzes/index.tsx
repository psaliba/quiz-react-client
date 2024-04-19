import { FaEllipsisV } from "react-icons/fa";
import QuizzesList from "./QuizzesList";
import "./index.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as client from "./client";

function Quizzes() {

  const navigate = useNavigate();

  const { courseId } = useParams();

  const handleCreateQuiz = () => {
    const quiz = {
      _id: "0",
      course_id: courseId as string,
      title: "New Quiz",
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
      questions: []
    }
    client.createQuiz(quiz).then((newQuiz) => {
      client.createQuiz(newQuiz);
      navigate("Quiz Details/0");
    });
  };

  return (
    <div>
      <div>
        <button>
          <FaEllipsisV />
        </button>
        <button
          className="red-button"
          onClick={handleCreateQuiz}
        >+ Quiz</button>
      </div>
      <QuizzesList />
    </div>
  );
}

export default Quizzes;
