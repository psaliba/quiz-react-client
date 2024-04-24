
import "../index.css";
import { useEffect, useState } from "react";
import * as client from "./client";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router";
import { Link, useLocation } from "react-router-dom";
import {
    FaTrash,
} from "react-icons/fa";
import { Quiz, Question, Option } from "../../Database";

function QuizEditor() {

    const { quizId } = useParams();
    const navigate = useNavigate();

    var initialOptions: Option[] = [];
    var initialOption: Option = {
        option: ""
    };

    const handleSave = async (quiz: Quiz) => {
        await client.updateQuiz(quiz);
        navigate("../Quizzes/Quiz Details/" + quizId)
    };

    const handleSaveAndPublish = async (quiz: Quiz) => {
        quiz.published = true;
        await client.updateQuiz(quiz);
        navigate("../Quizzes")
    };

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
        const [quiz, setQuiz] = useState<Quiz>(
            {
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
                questions: []
            }
        );

        useEffect(() => {
            client.findQuizById(quizId).then((quiz) => {
                setQuiz(quiz);
            });

        }, []);

        return (
            <div>
                <h4>Details</h4>
                <br></br>
                <form>
                    <label>
                        Title:
                        <br></br>
                        <input type="text" name="title" value={quiz.title}
                            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
                    </label>
                </form>
                <form>
                    <label>
                        Description:
                        <br></br>
                        <input type="text" name="description" className="description" value={quiz.description}
                            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} />
                    </label>
                </form>
                <form>
                    <label>
                        Quiz Type:
                        <br></br>
                        <select id="quiz-type" name="quiz-type" value={quiz.quiz_type}
                            onChange={(e) => setQuiz({ ...quiz, quiz_type: e.target.value })} >
                            <option value="graded-quiz">Graded Quiz</option>
                            <option value="practice-quiz">Practice Quiz</option>
                            <option value="graded-survey">Graded Survey</option>
                            <option value="ungraded-survey">Ungraded Survey</option>
                        </select>
                    </label>
                    <br></br><br></br>
                    <label>
                        Points:
                        <input type="number" id="points" name="points" min="0" max="100" value={String(quiz.points)}
                            onChange={(e) => setQuiz({ ...quiz, points: Number(e.target.value) })} />
                    </label>
                    <br></br><br></br>
                    <label>
                        Assignment Group:
                        <br></br>
                        <select id="assignment-group" name="assignment-group" value={quiz.assignment_group}
                            onChange={(e) => setQuiz({ ...quiz, assignment_group: e.target.value })} >
                            <option value="quizzes">Quizzes</option>
                            <option value="exams">Exams</option>
                            <option value="assignment">Assignment</option>
                            <option value="project">Project</option>
                        </select>
                    </label>
                    <br></br><br></br>
                    <label>
                        Shuffle answers:
                        <input type="checkbox" checked={quiz.shuffle_answers} id="shuffle-answers" name="shuffle-answers"
                            onChange={(e) => setQuiz({ ...quiz, shuffle_answers: Boolean(e.target.value) })} />
                    </label>
                    <br></br><br></br>
                    <label>
                        Time Limit
                        <input type="number" id="limit" name="limit" min="1" value={String(quiz.time_limit)}
                            onChange={(e) => setQuiz({ ...quiz, time_limit: Number(e.target.value) })} />
                    </label>
                    <br></br><br></br>
                    <label>
                        Allow multiple attempts:
                        <input type="checkbox" checked={quiz.multiple_attempts} id="multiple-attempts" name="multiple-attempts"
                            onChange={(e) => setQuiz({ ...quiz, multiple_attempts: Boolean(e.target.value) })} />
                    </label>
                    <br></br><br></br>
                    <label>
                        Show correct answers:
                        <br></br>
                        <select id="show-correct-answers" name="show-correct-answers" value={quiz.show_correct_answers}
                            onChange={(e) => setQuiz({ ...quiz, show_correct_answers: e.target.value })} >
                            <option value="Immediately">Immedidately</option>
                            <option value="After-Submitted">After Submitted</option>
                            <option value="Never">Never</option>
                        </select>
                    </label>
                    <br></br><br></br>
                    <label>
                        Access code:
                        <br></br>
                        <input type="text" name="access-code" value={quiz.access_code}
                            onChange={(e) => setQuiz({ ...quiz, access_code: e.target.value })} />
                    </label>
                    <br></br><br></br>
                    <label>
                        One question at a time:
                        <input type="checkbox" checked={quiz.one_question_at_a_time} id="one-question" name="one-question"
                            onChange={(e) => setQuiz({ ...quiz, one_question_at_a_time: Boolean(e.target.value) })} />
                    </label>
                    <br></br><br></br>
                    <label>
                        Webcam required:
                        <input type="checkbox" checked={quiz.webcam_required} id="webcam" name="webcam"
                            onChange={(e) => setQuiz({ ...quiz, webcam_required: Boolean(e.target.value) })} />
                    </label>
                    <br></br><br></br>
                    <label>
                        Lock questions after answering:
                        <input type="checkbox" checked={quiz.lock_questions_after_answering} id="lock-questions" name="lock-questions"
                            onChange={(e) => setQuiz({ ...quiz, lock_questions_after_answering: Boolean(e.target.value) })} />
                    </label>
                    <br></br><br></br>
                    <label>
                        Due date:
                        <input type="date" id="due-date" name="due-date" value={String(quiz.due)}
                            onChange={(e) => setQuiz({ ...quiz, due: new Date(Date.parse(e.target.value)) })} />
                    </label>
                    <br></br><br></br>
                    <label>
                        Available date:
                        <input type="date" id="available-date" name="available-date" value={String(quiz.available)}
                            onChange={(e) => setQuiz({ ...quiz, available: new Date(Date.parse(e.target.value)) })} />
                    </label>
                    <br></br><br></br>
                    <label>
                        Until date:
                        <input type="date" id="until-date" name="until-date" value={String(quiz.available_until)}
                            onChange={(e) => setQuiz({ ...quiz, available_until: new Date(Date.parse(e.target.value)) })} />
                    </label>
                </form>
                <br></br><br></br>
                <button onClick={() => handleSave(quiz)} className="red-button">Save</button>
                <button onClick={() => handleSaveAndPublish(quiz)}>Save & Publish</button>
                <Link to={"../../Quizzes"}>
                    <button>Cancel</button>
                </Link>
                <br></br><br></br>
            </div>
        );
    }




    function Question() {

        const [quiz, setQuiz] = useState<Quiz>(
            {
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
                questions: []
            }
        );


        const [question, setQuestion] = useState<Question>(
            {
                title: "",
                type: "Multiple Choice",
                points: 1,
                question: "",
                options: [],
                correct_option: 0
            }
        );

        const { quizId } = useParams();
        useEffect(() => {
            initialOptions.push(initialOption);
            client.findQuizById(quizId).then((quiz) => {
                setQuiz(quiz);
            });

        }, []);

        const updateQuestion = async () => {
            const newQuestions: Question[] = [...quiz.questions, question]
            const newQuiz: Quiz = { ...quiz, questions: newQuestions }
            console.log("the new quiz being sent is: " + newQuiz)
            await client.updateQuiz(newQuiz);
            client.findQuizById(quizId).then((quiz) => {
                setQuiz(quiz);
            });
        }

        const handleQuestionTypeChange = (event: any) => {
            setQuestion({ ...question, type: event.target.value });
        };

        const addAnotherAnswer = () => {
            const newOption: Option[] = [...question.options, initialOption]
            const newQuestion: Question = { ...question, options: newOption }
            setQuestion(newQuestion);
        }


        const deleteOption = (index: number) => {

            const newOptions: Option[] = question.options.filter((_, i) => i !== index)

            const newQuestion: Question = { ...question, options: newOptions }

            setQuestion(newQuestion);
        }

        const newQuestion = () => {
            setQuestion(
                {
                    title: "",
                    type: "Multiple Choice",
                    points: 1,
                    question: "",
                    options: initialOptions,
                    correct_option: 0
                }
            )
        }

        return (
            <div>
                <h4>Questions</h4>
                <br></br>
                <button onClick={newQuestion}>+ New Question</button>
                <form>
                    <input type="text" id="question-title" name="question-title" placeholder="Question Title"
                        value={question.title}
                        onChange={(e) => setQuestion({ ...question, title: e.target.value })}
                    />
                    <label>
                        Question Type:
                        <select id="question-type" name="question-type"
                            value={question.type} onChange={handleQuestionTypeChange}>
                            <option value="multiple-choice">Multiple Choice</option>
                            <option value="true-false">True/False</option>
                            <option value="fill-in-blanks">Fill In The Blanks</option>
                        </select>
                    </label>
                    <label>
                        Points:
                        <input className="ms-2" value={question.points}
                            type="number" id="points" name="points" min="0" max="100"
                            onChange={(e) => setQuestion({ ...question, points: Number(e.target.value) })}
                        />
                    </label>
                    <br /><br />
                    <p>Enter your question and multiple answers, then select the one correct answer.</p>
                    <label>
                        <h5>Question:</h5>
                        <textarea
                            id="myTextarea"
                            placeholder="Type your question here."
                            value={question.question}
                            rows={4}
                            cols={50}
                            onChange={(e) => setQuestion({ ...question, question: e.target.value })}
                        />
                    </label>

                </form>
                {question.type !== 'true-false' && <button onClick={addAnotherAnswer}>+ Add Another Answer</button>}
                <h5>Answer:</h5>
                {question.type === 'multiple-choice' && <div>
                    {question.options.map((option, index) => (
                        <div className="answer-container">
                            <input
                                className="me-3"
                                type="radio"
                                name="mc-option"
                            />
                            <textarea
                                id="myTextarea"
                                placeholder="Type your answer here."
                                value={option.option}
                                rows={2}
                                cols={50}
                            />
                            <button onClick={() => deleteOption(index)}><FaTrash className="trash-icon"></FaTrash></button>
                        </div>
                    ))}
                </div>}
                {question.type === 'true-false' && <div className="answer-container">
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
                </div>}
                {question.type === 'fill-in-blanks' && <p>Fill in blanks placeholder</p>}
                <button className="lazy-button-fix mt-2">Cancel</button>
                <button onClick={updateQuestion} className="lazy-button-fix mt-2">Update Question</button>
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
                    element={<Question />} />
            </Routes>
        </div>
    );
}

export default QuizEditor;