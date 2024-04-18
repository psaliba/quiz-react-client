import "../index.css";
import React, { useEffect, useState } from "react";
import * as client from "./client";
import { useParams } from "react-router";
import { Quiz } from "../../Database";
import {
    FaBan,
    FaCheckCircle,
    FaEdit,
    FaEllipsisV,
    FaPlusCircle,
    FaRocket,
} from "react-icons/fa";
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Link } from "react-router-dom";

function QuizzesList() {
    const { courseId } = useParams();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    //   const { courseId } = useParams();
    console.log("sammy" + JSON.stringify(courseId));

    useEffect(() => {
        // fetch quizzes
        client.findAllQuizzes(courseId).then((quizzes) => {
            setQuizzes(quizzes);
        });
    }, []);

    const deleteQuiz = (quizid: string) => {
        return async () => {
            await client.deleteQuiz(quizid);
            setQuizzes(quizzes.filter((quiz: Quiz) => quiz._id !== quizid));
        };
    }

    const togglePublishQuiz = async (quiz: Quiz) => {
        console.log("toggle publish quiz");
        quiz.published = !quiz.published;
        await client.updateQuiz(quiz);
      
            
            
        client.findAllQuizzes(courseId).then((quizzes) => {
            setQuizzes(quizzes);
        });
        
    }

    const quizContext = (quiz: Quiz) => {
        const popover = (
            <Popover id="context-menu">
              <Popover.Body style={{ width: '110px'}}>
                 <button className="btn">  <Link
                      to={`Quiz Details/${quiz._id}`}>Edit</Link> </button> 
               
                <button className="btn" onClick={deleteQuiz(quiz._id)}> Delete </button>
                <button className="btn" onClick={() => togglePublishQuiz(quiz)}> {quiz.published ? "Unpublish" : "Publish"} </button>
              </Popover.Body>
            </Popover>
          );
        
          return (
            <OverlayTrigger
              trigger="click"
              placement="left"
              overlay={popover}
              rootClose // Close the popover when clicking outside
            >
             
              <span style={{ cursor: 'pointer' }}> <FaEllipsisV/> </span>
            </OverlayTrigger>
          );



    }
    console.log("quizzes", quizzes);
    const renderAQuiz = (quiz: Quiz) => {
        return (
            <li
                className="list-group-item d-flex align-items-center justify-content-between"
                key={quiz.title}
            >
                <div>
                    <Link to={`Quiz Details/${quiz._id}`}>
                    <div className="d-flex align-items-center">
                        <FaRocket className="me-2" />
                        <strong>{quiz.title}</strong>
                    </div>
                    </Link>
                    <div>
                        {`Available ${new Date(quiz.available).toLocaleDateString()} | `}
                        {`Due Date: ${new Date(quiz.due).toLocaleDateString()} | `}
                        {quiz.questions.length}{" "}
                        Questions
                    </div>
                </div>
                <div>
                    
                    <button className="btn btn-link p-0">
                        {quiz.published ? <FaCheckCircle className="text-success" /> : <FaBan className="text-danger" />}
                       
                    </button>

                    {quizContext(quiz)}
                </div>
            </li>
        );
    }
    return (
        <div>
            <h1>Quizzes</h1>
            <ul className="list-group wd-modules">
                {quizzes.map((quiz: Quiz) => (
                    renderAQuiz(quiz)
                ))}
            </ul>
        </div>
    );
}

export default QuizzesList;