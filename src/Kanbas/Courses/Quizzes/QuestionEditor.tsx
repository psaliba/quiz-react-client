import { useEffect, useState } from "react";
import "./index.css";
import { useNavigate, useParams } from "react-router";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Question, Option, Quiz } from "../../Database";
import * as client from "./client";
import { FaTrash } from "react-icons/fa";

function QuestionEditor() {
  const navigate = useNavigate();

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
    correct_option: "0",
  });

  const { quizId, questionNum } = useParams<{
    quizId: string;
    questionNum?: string;
  }>();

  useEffect(() => {
    client.findQuizById(quizId).then((quiz) => {
      setQuiz(quiz);
      const qNum: number = Number(questionNum);
      if (qNum < quiz.questions.length) {
        setQuestion(quiz.questions.at(qNum));
      }
      else {
        const newQuestion = {
          title: "",
          type: "multiple-choice",
          points: 1,
          question: "",
          options: [],
          correct_option: "0",
        } as Question;
        setQuestion(newQuestion);
        var newQuestions: Question[] = [...quiz.questions, newQuestion];
        const newQuiz: Quiz = { ...quiz, questions: newQuestions };
        setQuiz(newQuiz);
      }
    });
  }, []);

  const updateQuestion = async () => {
    var newQuestions: Question[] = quiz.questions;
    newQuestions.splice(Number(questionNum), 1, question);
    const newQuiz: Quiz = { ...quiz, questions: newQuestions };
    console.log("the new quiz being sent is: " + newQuiz);
    await client.updateQuiz(newQuiz);
    client.findQuizById(quizId).then((quiz) => {
      setQuiz(quiz);
    });
    navigate("../Quizzes/Quiz Editor/" + quizId + "/Questions");
  };

  const cancel = () => {
    navigate("../Quizzes/Quiz Editor/" + quizId + "/Questions");
  };

  const handleQuestionTypeChange = (event: any) => {
    setQuestion({ ...question, type: event.target.value, options: [] });
  };

  const addAnotherAnswer = () => {
    let initialOption: Option = {
      option: "",
    };
    const newOptions: Option[] = [...question.options, initialOption];
    const newQuestion: Question = { ...question, options: newOptions };
    setQuestion(newQuestion);
  };

  const deleteOption = (index: number) => {
    const newOptions: Option[] = question.options.filter((_, i) => i !== index);

    const newQuestion: Question = { ...question, options: newOptions };

    setQuestion(newQuestion);
  };

  const updateOption = (event: any, index: Number) => {
    var newOption: Option = { option: event.target.value };
    var newOptions: Option[] = question.options;
    newOptions.splice(Number(index), 1, newOption);
    const newQuestion: Question = { ...question, options: newOptions };
    setQuestion(newQuestion);
  };

  const setCorrectAnswer = (answer: string) => {
    const newQuestion: Question = { ...question, correct_option: answer };
    setQuestion(newQuestion);
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "left",
      padding: "20px",

    }}>
      <h4>
        Questions
      </h4>
      <br></br>
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
        <div>
          <h5>Question:</h5>
          <ReactQuill
            theme="snow"
            value={question.question}
            onChange={(value) => setQuestion({ ...question, question: value })}
          />
        </div>

      </form>

      <h5>Answer: </h5>
      
      { (question.type === "multiple-choice") && (
        <div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          {question.options.map((option, index) => (
            
            <div key={index} className="answer-container" style={{padding: '10px'}}>
              
              <input
                className="me-3"
                type="radio"
                name="mc-option"
                checked={question.correct_option === String(index + 1)}
                onChange={() => setCorrectAnswer(String(index + 1))}
              />
              <textarea
                id="myTextarea"
                placeholder="Type your answer here."
                value={option.option}
                rows={2}
                cols={50}
                onChange={(e) => updateOption(e, index)}
              />
              <button onClick={() => deleteOption(index)}>
                <FaTrash className="trash-icon"></FaTrash>
              </button>
              
            </div>
           
          ))}
          <br />
          
        </div>
        
        </div>
      )}
      {question.type === "true-false" && (
        <div className="answer-container">
          <div className="answer-container">
            <div className="tf-container me-2">
              <label>
                {" "}
                True <br />
                <input
                  className="ms-2"
                  type="radio"
                  name="tf"
                  checked={question.correct_option === "1"}
                  onChange={() => setCorrectAnswer("1")}
                />
              </label>
            </div>
            <div className="tf-container me-2">
              <label>
                {" "}
                False <br />
                <input
                  type="radio"
                  className="ms-2"
                  name="tf"
                  checked={question.correct_option === "0"}
                  onChange={() => setCorrectAnswer("0")}
                />
              </label>
            </div>
          </div>
        </div>
      )}
      {question.type === "fill-in-blanks" && (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          {question.options.map((option, index) => (
            <div key={index} className="answer-container"  style={{padding: '10px'}}>
              
              <h6 style={{marginRight: '10px'}}>
                Possible answer:
              </h6>
              <textarea 
                id="myTextarea"
                placeholder="Type your answer here."
                value={option.option}
                rows={2}
                cols={50}
                onChange={(e) => updateOption(e, index)}
              />
              <button onClick={() => deleteOption(index)}>
                <FaTrash className="trash-icon"></FaTrash>
              </button>
            </div>
            
          ))}
         
        </div>
      )}
      {question.type !== "true-false" && ( <button onClick={addAnotherAnswer}>+ Add Another Answer</button>)}
      <div>
        <button onClick={cancel} className="lazy-button-fix mt-2">Cancel</button>
        <button onClick={updateQuestion} className="lazy-button-fix mt-2">
          Update Question
        </button>
        </div>

    </div>
  );
}

export default QuestionEditor;
