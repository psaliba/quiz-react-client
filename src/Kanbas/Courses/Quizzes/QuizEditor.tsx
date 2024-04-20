
import "../index.css";
import { useEffect, useState } from "react";
import * as client from "./client";
import { Navigate, Route, Routes, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { setQuiz } from "./quizzesReducer";
import { Link, useLocation } from "react-router-dom";
import {
    FaTrash,
} from "react-icons/fa";

function QuizEditor() {
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

    const { pathname } = useLocation();

    function Nav() {
        return (
            <nav className="nav nav-tabs mt-2">
                <Link to="Details"
                    className={`nav-link ${pathname.includes("details") ? "active" : ""}`}>Details</Link>
                <Link to="Questions"
                    className={`nav-link ${pathname.includes("questions") ? "active" : ""}`}>Questions</Link>
            </nav>
        );
    }

    function Details() {
        return (
            <div>
                <h4>Details</h4>
                <br></br>
                <form>
                    <label>
                        Title:
                        <br></br>
                        <input type="text" name="title" />
                    </label>
                </form>
                <form id="noter-save-form">
                    <label>
                        Description:
                        <br></br>
                        <textarea id="description-text" name="description-text" />
                    </label>
                </form>
                <form>
                    <label>
                        Quiz Type:
                        <br></br>
                        <select id="quiz-type" name="quiz-type">
                            <option value="graded-quiz">Graded Quiz</option>
                            <option value="practice-quiz">Practice Quiz</option>
                            <option value="graded-survey">Graded Survey</option>
                            <option value="ungraded-survey">Ungraded Survey</option>
                        </select>
                    </label>
                    <br></br><br></br>
                    <label>
                        Points:
                        <input type="number" id="points" name="points" min="0" max="100" />
                    </label>
                    <br></br><br></br>
                    <label>
                        Assignment Group:
                        <br></br>
                        <select id="assignment-group" name="assignment-group">
                            <option value="quizzes">Quizzes</option>
                            <option value="exams">Exams</option>
                            <option value="assignment">Assignment</option>
                            <option value="project">Project</option>
                        </select>
                    </label>
                    <br></br><br></br>
                    <label>
                        Shuffle answers:
                        <input type="checkbox" id="shuffle-answers" name="shuffle-answers" />
                    </label>
                    <br></br><br></br>
                    <label>
                        Time limit:
                        <input type="checkbox" id="time-limit" name="time-limit" checked />
                    </label>
                    &nbsp;&nbsp;
                    <label>
                        Limit
                        <input type="number" id="limit" name="limit" min="1" value="20" />
                    </label>
                    <br></br><br></br>
                    <label>
                        Allow multiple attempts:
                        <input type="checkbox" id="multiple-attempts" name="multiple-attempts" />
                    </label>
                    <br></br><br></br>
                    <label>
                        Show correct answers:
                        <input type="checkbox" id="show-correct-answers" name="show-correct-answers" />
                    </label>
                    <br></br><br></br>
                    <label>
                        Access code:
                        <br></br>
                        <input type="text" name="access-code" />
                    </label>
                    <br></br><br></br>
                    <label>
                        One question at a time:
                        <input type="checkbox" id="one-question" name="one-question" checked />
                    </label>
                    <br></br><br></br>
                    <label>
                        Webcam required:
                        <input type="checkbox" id="webcame" name="webcame" />
                    </label>
                    <br></br><br></br>
                    <label>
                        Lock questions after answering:
                        <input type="checkbox" id="lock-questions" name="lock-questions" />
                    </label>
                    <br></br><br></br>
                    <label>
                        Due date:
                        <input type="date" id="due-date" name="due-date" />
                    </label>
                    <br></br><br></br>
                    <label>
                        Available date:
                        <input type="date" id="available-date" name="available-date" />
                    </label>
                    <br></br><br></br>
                    <label>
                        Until date:
                        <input type="date" id="until-date" name="until-date" />
                    </label>
                </form>
                <br></br><br></br>
                <Link to={"../../Quizzes/Quiz Details"}>
                    <button className="red-button">Save</button>
                </Link>
                <Link to={"../../Quizzes"}>
                    <button>Save & Publish</button>
                </Link>
                <Link to={"../../Quizzes"}>
                    <button>Cancel</button>
                </Link>
                <br></br><br></br>
            </div>
        );
    }

    function Questions() {
        return (
            <div>
                <h4>Questions</h4>
                <br></br>
                <button>+ New Question</button>
                <Question></Question>
            </div>
        );
    }

    function Question() {
        const [questionType, setQuestionType] = useState('multiple-choice');
    
        const handleQuestionTypeChange = (event: any) => {
            setQuestionType(event.target.value);
        };
    
        return (
            <div>
                <form>
                    <input type="text" id="question-title" name="question-title" placeholder="Question Title"/>
                    <label>
                        Question Type: 
                        <select id="question-type" name="question-type" onChange={handleQuestionTypeChange}>
                            <option value="multiple-choice">Multiple Choice</option>
                            <option value="true-false">True/False</option>
                            <option value="fill-in-blanks">Fill In The Blanks</option>
                        </select>
                    </label>
                    <label>
                        Points:
                        <input className="ms-2" type="number" id="points" name="points" min="0" max="100" />
                    </label>
                    <br /><br />
                    <p>Enter your question and multiple answers, then select the one correct answer.</p>
                    <label>
                        <h5>Question:</h5>
                        <textarea
                            id="myTextarea"
                            placeholder="Type your question here."
                            rows={4}
                            cols={50}
                        />
                    </label>
            
                </form>
                {questionType !== 'true-false' && <button>+ Add Another Answer</button>}
                <h5>Answer:</h5>
                {questionType === 'multiple-choice' && <MultipleChoice />}
                {questionType === 'true-false' && <TrueFalse />}
                {questionType === 'fill-in-blanks' && <FillInBlanks />}
                <button className="lazy-button-fix mt-2">Cancel</button>
                <button className="lazy-button-fix mt-2">Update Question</button>
            </div>
        );
    }

    function MultipleChoice() {
        return (
            <div>
                <MultipleChoiceAnswer></MultipleChoiceAnswer>
            </div>
        );
    }

    function TrueFalse() {
        return (
            <div className="answer-container">
                <div className="answer-container">
                    <div className="tf-container me-2">
                        <label> True <br /><input
                            className="ms-2"
                            type="radio"
                            name="tf"
                            /></label>
                    </div>
                    <div className="tf-container me-2">
                        <label> False <br /><input
                            type="radio"
                            className="ms-2"
                            name="tf"
                            /></label>
                            
                    </div>
                </div>
            </div>
        );
    }

    function FillInBlanks() {
        return (
            <div>
                Fill in blanks placeholder
            </div>
        );
    }

    function MultipleChoiceAnswer() {
        return(
            <div className="answer-container">
                <input
                    className="me-3"
                    type="radio"
                    name="mc-option"
                    />
                <textarea
                id="myTextarea"
                placeholder="Type your answer here."
                rows={2}
                cols={50}
                />
                <FaTrash className="trash-icon"></FaTrash>
            </div>
        );
    }

    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/"
                    element={<Navigate
                        to="Details" />} />
                <Route path="Details"
                    element={<Details />} />
                <Route path="Questions"
                    element={<Questions />} />
            </Routes>
        </div>
    );
}

export default QuizEditor;