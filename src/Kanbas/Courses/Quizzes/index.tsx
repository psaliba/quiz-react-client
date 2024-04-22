import { FaEllipsisV } from "react-icons/fa";
import QuizzesList from "./QuizzesList";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import * as client from "./client";
import { useState } from "react";
import { Quiz } from "../../Database";

function Quizzes() {

  const navigate = useNavigate();
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const quiz = {
    _id: "",
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

  const handleCreateQuiz = async () => {
    await client.createQuiz(quiz); //await seems to not be working?
    client.findAllQuizzes(courseId).then((quizzes) => {
      setQuizzes(quizzes);
    });
    const newQuiz = quizzes.find((currQuiz) => (currQuiz.title === quiz.title)) as Quiz
    navigate("/Quiz Details/" + newQuiz._id)
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
