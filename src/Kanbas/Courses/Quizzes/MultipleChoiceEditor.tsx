import "../index.css";
import { useEffect, useState } from "react";
import * as client from "./client";


function MultipleChoiceEditor() {

    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionChange = (value: string) => {
        setSelectedOption(value);
    };

    return(
        <div>
            <input type="text" name="" id="" placeholder="Question Title"/>
            <label className="ms-3 me-1"htmlFor="points">Points:</label>
            <input type="number" name="points" id="points"/>
            <br />
            <br />
            <p>Enter your question and multiple answers, then select the one correct answer.</p>
            <h5>Question:</h5>
            <textarea
                id="myTextarea"
                placeholder="Type your question here."
                rows={4}
                cols={50}
            />
            <h5>Answers:</h5>
            <div className="answer-container">
                <input
                    className="me-3"
                    type="radio"
                    name="option"
                    value="option1"
                    checked={selectedOption === 'option1'}
                    onChange={() => handleOptionChange('option1')}
                    />
                <textarea
                id="myTextarea"
                placeholder="Type your answer here."
                rows={2}
                cols={50}
                />
                <button>Trash</button>
            </div>
            <div className="answer-container"> 
                <input
                    className="me-3"
                    type="radio"
                    name="option"
                    value="option2"
                    checked={selectedOption === 'option2'}
                    onChange={() => handleOptionChange('option2')}
                    />
                <textarea
                id="myTextarea"
                placeholder="Type your answer here."
                rows={2}
                cols={50}
                />
                <button>Trash</button>
            </div>
            <div className="answer-container">
                <input
                    className="me-3"
                    type="radio"
                    name="option"
                    value="option3"
                    checked={selectedOption === 'optio3'}
                    onChange={() => handleOptionChange('option3')}
                    />
                <textarea
                id="myTextarea"
                placeholder="Type your answer here."
                rows={2}
                cols={50}
                />
                <button>Trash</button>
            </div>
            <button className="lazy-button-fix mt-2">Add Answer</button>
            <br></br><br></br>
            <button className="lazy-button-fix mt-2">Cancel</button>
            <button className="lazy-button-fix mt-2">Update Question</button>
        </div>
    )
}

export default MultipleChoiceEditor