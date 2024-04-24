import { useEffect, useState } from "react";
import "./index.css";
import { useParams } from "react-router";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Question, Option, Quiz } from "../../Database";
import * as client from "./client";
import { FaTrash } from "react-icons/fa";

function QuestionEditor() {
  var initialOptions: Option[] = [];
  var initialOption: Option = {
    option: "",
  };

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

  const [question, setQuestion] = useState<Question>({
    title: "",
    type: "Multiple Choice",
    points: 1,
    question: "",
    options: [],
    correct_option: 0,
  });

  const { quizId, questionNum } = useParams<{
    quizId: string;
    questionNum?: string;
  }>();

  console.log(
    "This is the question number that is being edited: " + questionNum
  );

  useEffect(() => {
    initialOptions.push(initialOption);
    client.findQuizById(quizId).then((quiz) => {
      setQuiz(quiz);
    });
  });

  const updateQuestion = async () => {
    const newQuestions: Question[] = [...quiz.questions, question];
    const newQuiz: Quiz = { ...quiz, questions: newQuestions };
    console.log("the new quiz being sent is: " + newQuiz);
    await client.updateQuiz(newQuiz);
    client.findQuizById(quizId).then((quiz) => {
      setQuiz(quiz);
    });
  };

  const handleQuestionTypeChange = (event: any) => {
    setQuestion({ ...question, type: event.target.value });
  };

  const addAnotherAnswer = () => {
    const newOption: Option[] = [...question.options, initialOption];
    const newQuestion: Question = { ...question, options: newOption };
    setQuestion(newQuestion);
  };

  const deleteOption = (index: number) => {
    const newOptions: Option[] = question.options.filter((_, i) => i !== index);

    const newQuestion: Question = { ...question, options: newOptions };

    setQuestion(newQuestion);
  };

  const newQuestion = () => {
    setQuestion({
      title: "",
      type: "Multiple Choice",
      points: 1,
      question: "",
      options: initialOptions,
      correct_option: 0,
    });
  };

  return (
    <div>
      <h4>
        Questions <button>+ Question</button>
      </h4>
      <br></br>

      <button onClick={newQuestion}>+ New Question</button>
      <form>
        <input
          type="text"
          id="question-title"
          name="question-title"
          placeholder="Question Title"
          value={question.title}
          onChange={(e) => setQuestion({ ...question, title: e.target.value })}
        />
        <label>
          Question Type:
          <select
            id="question-type"
            name="question-type"
            value={question.type}
            onChange={handleQuestionTypeChange}
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
            <option value="fill-in-blanks">Fill In The Blanks</option>
          </select>
        </label>
        <label>
          Points:
          <input
            className="ms-2"
            value={question.points}
            type="number"
            id="points"
            name="points"
            min="0"
            max="100"
            onChange={(e) =>
              setQuestion({ ...question, points: Number(e.target.value) })
            }
          />
        </label>
        <br />
        <br />
        <p>
          Enter your question and multiple answers, then select the one correct
          answer.
        </p>
        <label>
          <h5>Question:</h5>
          <ReactQuill
            theme="snow"
            value={question.question}
            onChange={(value) => setQuestion({ ...question, question: value })}
            />
        </label>
      </form>
      {question.type !== "true-false" && (
        <button onClick={addAnotherAnswer}>+ Add Another Answer</button>
      )}
      <h5>Answer:</h5>
      {question.type === "multiple-choice" && (
        <div>
          {question.options.map((option, index) => (
            <div className="answer-container">
              <input className="me-3" type="radio" name="mc-option" />
              <textarea
                id="myTextarea"
                placeholder="Type your answer here."
                value={option.option}
                rows={2}
                cols={50}
              />
              <button onClick={() => deleteOption(index)}>
                <FaTrash className="trash-icon"></FaTrash>
              </button>
            </div>
          ))}
        </div>
      )}
      {question.type === "true-false" && (
        <div className="answer-container">
          <div className="answer-container">
            <div className="tf-container me-2">
              <label>
                {" "}
                True <br />
                <input className="ms-2" type="radio" name="tf" />
              </label>
            </div>
            <div className="tf-container me-2">
              <label>
                {" "}
                False <br />
                <input type="radio" className="ms-2" name="tf" />
              </label>
            </div>
          </div>
        </div>
      )}
      {question.type === "fill-in-blanks" && <p>Fill in blanks placeholder</p>}
      <button className="lazy-button-fix mt-2">Cancel</button>
      <button onClick={updateQuestion} className="lazy-button-fix mt-2">
        Update Question
      </button>
    </div>
  );
}

export default QuestionEditor;
