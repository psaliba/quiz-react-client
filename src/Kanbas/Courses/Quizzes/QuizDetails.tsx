
import "../index.css";
import { useEffect, useState } from "react";
import * as client from "./client";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Quiz } from "../../Database";


function QuizDetails() {
    const dispatch = useDispatch();

    const { courseId, quizId } = useParams();

    const navigate = useNavigate();

    const [quiz, setQuiz] = useState<Quiz>(
        {
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
            questions: []
        }
    );

    useEffect(() => {
        if (quizId) {
            client.findQuizById(quizId).then((quiz) => {
                setQuiz(quiz);
            });
        }
    }, [quizId, dispatch]);

    const handlePublishQuiz = async (quiz: Quiz) => {
        quiz.published = !quiz.published;
        setQuiz(quiz);
        await client.updateQuiz(quiz);
    };

    const handleGoToEditor = () => {
        navigate("../Quizzes/Quiz Editor/" + quiz._id)
    }

    return (
        <div>
            <h1>Quiz Details</h1>
            <div>
                <button><FaEllipsisV /></button>
                <button onClick={handleGoToEditor}>Edit</button>
                <button>Preview</button>
                <button
                    className="green-button"
                    onClick={() => handlePublishQuiz(quiz)}>
                    {quiz.published ? "Unpublish" : "Publish"}</button>
            </div>
            <h2>{quiz.title}</h2>
            <table>
                <tr>
                    <td><strong>Quiz Type</strong></td>
                    <td>{quiz.quiz_type}</td>
                </tr>
                <tr>
                    <td><strong>Points</strong></td>
                    <td>{String(quiz.points)}</td>
                </tr>
                <tr>
                    <td><strong>Assignment Group</strong></td>
                    <td>{quiz.assignment_group}</td>
                </tr>
                <tr>
                    <td><strong>Shuffle Answers</strong></td>
                    <td>{String(quiz.shuffle_answers)}</td>
                </tr>
                <tr>
                    <td><strong>Time Limit</strong></td>
                    <td>{quiz.time_limit}</td>
                </tr>
                <tr>
                    <td><strong>Multiple Attempts</strong></td>
                    <td>{String(quiz.multiple_attempts)}</td>
                </tr>
                <tr>
                    <td><strong>Show Correct Answers</strong></td>
                    <td>{quiz.show_correct_answers}</td>
                </tr>
                <tr>
                    <td><strong>Access Code</strong></td>
                    <td>{quiz.access_code}</td>
                </tr>
                <tr>
                    <td><strong>One Question at a Time</strong></td>
                    <td>{String(quiz.one_question_at_a_time)}</td>
                </tr>
                <tr>
                    <td><strong>Webcam Required</strong></td>
                    <td>{String(quiz.webcam_required)}</td>
                </tr>
                <tr>
                    <td><strong>Lock Questions After Answering</strong></td>
                    <td>{String(quiz.lock_questions_after_answering)}</td>
                </tr>
                <tr>
                    <td><strong>Due date</strong></td>
                    <td>{String(quiz.due)}</td>
                </tr>
                <tr>
                    <td><strong>Available date</strong></td>
                    <td>{String(quiz.available)}</td>
                </tr>
                <tr>
                    <td><strong>Until date</strong></td>
                    <td>{String(quiz.available_until)}</td>
                </tr>
            </table>
        </div>
    );
}

export default QuizDetails;