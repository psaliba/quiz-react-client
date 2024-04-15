
import "../index.css";
import { useEffect } from "react";
import * as client from "./client";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { setQuiz } from "./quizzesReducer";
import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";


function QuizDetails() {
    const dispatch = useDispatch();

    const { quizId } = useParams();

    useEffect(() => {
        if (quizId) {
            client.findQuizById(quizId).then((quiz) => {
                dispatch(setQuiz(quiz));
            });
        }
    }, [quizId, dispatch]);

    const quiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);

    return (
        <div>
            <h1>Quiz Details</h1>
            <div>
                <button><FaEllipsisV /></button>
                <Link to="../Quizzes/Quiz Editor">
                    <button>Edit</button>
                </Link>
                <button>Preview</button>
                <button className="published-button">Published</button>
            </div>
            <h2>{quiz.name}</h2>
            <table>
                <tr>
                    <td><strong>Quiz Type</strong></td>
                    <td>{quiz.quizType}</td>
                </tr>
                <tr>
                    <td><strong>Points</strong></td>
                    <td>{quiz.points}</td>
                </tr>
                <tr>
                    <td><strong>Assignment Group</strong></td>
                    <td>{quiz.assignmentGroup}</td>
                </tr>
                <tr>
                    <td><strong>Shuffle Answers</strong></td>
                    <td>{quiz.shuffleAnswers}</td>
                </tr>
                <tr>
                    <td><strong>Time Limit</strong></td>
                    <td>{quiz.timeLimit}</td>
                </tr>
                <tr>
                    <td><strong>Multiple Attempts</strong></td>
                    <td>{quiz.multipleAttempts}</td>
                </tr>
                <tr>
                    <td><strong>Show Correct Answers</strong></td>
                    <td>{quiz.showCorrectAnswers}</td>
                </tr>
                <tr>
                    <td><strong>Access Code</strong></td>
                    <td>{quiz.accessCode}</td>
                </tr>
                <tr>
                    <td><strong>One Question at a Time</strong></td>
                    <td>{quiz.oneQuestionAtATime}</td>
                </tr>
                <tr>
                    <td><strong>Webcam Required</strong></td>
                    <td>{quiz.webcamRequired}</td>
                </tr>
                <tr>
                    <td><strong>Lock Questions After Answering</strong></td>
                    <td>{quiz.lockQuestionsAfterAnswering}</td>
                </tr>
                <tr>
                    <td><strong>Due date</strong></td>
                    <td>{String(quiz.dueDate)}</td>
                </tr>
                <tr>
                    <td><strong>Available date</strong></td>
                    <td>{String(quiz.availableDate)}</td>
                </tr>
                <tr>
                    <td><strong>Until date</strong></td>
                    <td>{String(quiz.untilDate)}</td>
                </tr>
            </table>
        </div>
    );
}

export default QuizDetails;