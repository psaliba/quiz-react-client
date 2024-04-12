
import "../index.css";
import { useEffect, useState } from "react";
import * as client from "./client";
import { useParams } from "react-router";


function QuizzesList() {

    const [quizzes, setQuizzes] = useState([]);
    const { courseId } = useParams();

    useEffect(() => {
        // fetch quizzes
        client.findAllQuizzes(courseId).then((quizzes) => {
            setQuizzes(quizzes);
        });
    }, []);
    

    return (
        <div>
            <h1>Quizzes List</h1>
            this is where quizzes will be listed. found {quizzes.length} quizzes
        </div>
    );
}

export default QuizzesList;