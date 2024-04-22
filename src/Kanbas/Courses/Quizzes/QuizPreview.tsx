import { useEffect, useState } from "react";
import "./index.css";
import { Quiz } from "../../Database";
import { useParams } from "react-router";
import * as client from "./client";

function QuizPreview() {

    const [quiz, setQuiz] = useState<Quiz>();

    const { quizId } = useParams();

    useEffect(() => {
        if (quizId) {
            client.findQuizById(quizId).then((quiz) => {
                setQuiz(quiz);
            });
        }
    }, [quizId]);

    return (
        <div>
            <h1>Preview</h1>
        </div>
    );
}

export default QuizPreview;
