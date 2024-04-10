import React, { useEffect, useState } from "react";
import axios from "axios";
function WorkingWithObjects() {

    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });

    const [module, setModule] = useState({
        id: "1", name: "name 1", description: "description 1", course: "course 1"
    });

    const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment"

    const fetchAssignment = async () => {
        const response = await axios.get(`${ASSIGNMENT_URL}`);
        setAssignment(response.data);
    };
    const updateTitle = async () => {
        const response = await axios
            .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
        setAssignment(response.data);
    };
    useEffect(() => {
        fetchAssignment();
    }, []);



    return (
        <div>
            <h3>Working With Objects</h3>
            <h3>Modifying Properties</h3>
            <input onChange={(e) => setAssignment({
                ...assignment, title: e.target.value
            })}
                value={assignment.title} type="text" />
            <button onClick={updateTitle} >
                Update Title to: {assignment.title}
            </button>
            <button onClick={fetchAssignment} >
                Fetch Assignment
            </button>

            <h4>Retrieving Objects</h4>
            <a className="btn btn-primary" href="http://localhost:4000/a5/assignment">
                Get Assignment
            </a>

            <h4>Retrieving Properties</h4>
            <a className="btn btn-primary" href="http://localhost:4000/a5/assignment/title">
                Get Title
            </a>

            <h4>Modifying Properties</h4>
            <a className="btn btn-primary" href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input type="text"
                onChange={(e) => setAssignment({
                    ...assignment,
                    title: e.target.value
                })}
                value={assignment.title} />

            <h4> Module stuff</h4>
            <a className="btn btn-primary" href={`http://localhost:4000/a5/module`}>
                Get Module
            </a>
            <a className="btn btn-primary" href={`http://localhost:4000/a5/module/name`}>
                Get Module Name
            </a>

            <h4> module updates</h4>
            <a className="btn btn-primary" href={`http://localhost:4000/a5/module/name/${module.name}`}>
                Update Module Name
            </a>
            <input type="text"
                onChange={(e) => setModule({
                    ...module,
                    name: e.target.value
                })}
                value={module.name} />

            <h4> More assignment updates</h4>
            <a className="btn btn-primary" href={`http://localhost:4000/a5/assignment/score/${assignment.score}`}>
                Update Assignment Score
            </a>
            <input type="number"
                onChange={(e) => setAssignment({
                    ...assignment,
                    score: Number(e.target.value)
                })}
                value={assignment.score} />

            <a className="btn btn-primary" href={`http://localhost:4000/a5/assignment/completed/${assignment.completed}`}>
                Updated assignment completed
            </a>
            <input type="checkbox"
                onChange={(e) => setAssignment({
                    ...assignment,
                    completed: e.target.checked
                })}
                checked={assignment.completed} />
        </div>
    );
}
export default WorkingWithObjects;