import { FaEllipsisV } from 'react-icons/fa';
import QuizzesList from './QuizzesList';
import "./index.css";
import { Link } from 'react-router-dom';

function Quizzes() {
    return (
        <div>
            <div>
                <button><FaEllipsisV /></button>
                <Link to="Quiz Details">
                    <button className='plus-button'>+ Quiz</button>
                </Link>
            </div>
            <QuizzesList />
        </div>
    );
}

export default Quizzes;