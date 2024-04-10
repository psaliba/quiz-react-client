import React, { useEffect, useState } from "react";
import axios from 'axios';

function WorkingWithArrays() {
    const API = "http://localhost:4000/a5/todos";
    const [todo, setTodo] = useState({
        id: "1", title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos((prevTodos: any[]) => [...prevTodos, response.data]);
    };
    const deleteTodo = async (todo: any) => {
        const response = await axios.delete(`${API}/${todo.id}`);
        setTodos(todos.filter((t) => t.id !== todo.id));
    };

    const updateTodo = async () => {
        const response = await axios.put(`${API}/${todo.id}`, todo);
        setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    };




    const [todos, setTodos] = useState<any[]>([]);
    const fetchTodos = async () => {
        const response = await axios.get(API);
        setTodos(response.data);
    };
    useEffect(() => {
        fetchTodos();
    }, []);

    const removeTodo = async (todo: any) => {
        const response = await axios
            .get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
    };

    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };

    const fetchTodoById = async (id: any) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };

    const updateTitle = async () => {
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
    };




    return (
        <div>
            <h3>Working with Arrays</h3>
            <h4>Retrieving Arrays</h4>
            <a className="btn btn-primary" href={API}>
                Get Todos
            </a>
            <h4>Retrieving an item from an array by ID</h4>
            <input type="number" value={todo.id}
                onChange={(e) => setTodo({
                    ...todo,
                    id: e.target.value
                })} />
            <input type="text" value={todo.title}
                onChange={(e) => setTodo({
                    ...todo, title: e.target.value
                })} />
            <input type="text" value={todo.description}
                onChange={(e) => setTodo({
                    ...todo, description: e.target.value
                })} />
            <input type="checkbox" checked={todo.completed}
                onChange={(e) => setTodo({
                    ...todo, completed: e.target.checked
                })} />
            <h3>Updating an Item in an Array</h3>
            <a className="btn btn-primary" href={`${API}/${todo.id}/title/${todo.title}`} >
                Update Title to: {todo.title}
            </a>
            <a className="btn btn-primary" href={`${API}/${todo.id}/description/${todo.description}`} >
                Update Description to: {todo.description}</a>

            <a className="btn btn-primary" href={`${API}/${todo.id}/completed/${todo.completed}`} >
                Update Completed to: {todo.completed.toString()}</a>



            <a className="btn btn-primary" href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>

            <h3>Filtering Array Items</h3>
            <a className="btn btn-primary" href={`${API}?completed=true`}>
                Get Completed Todos
            </a>

            <h3>Creating new Items in an Array</h3>
            <a className="btn btn-primary" href={`${API}/create`}>
                Create Todo
            </a>

            <h3>Deleting from an Array</h3>
            <a className="btn btn-primary" href={`${API}/${todo.id}/delete`}>
                Delete Todo with ID = {todo.id}
            </a>
            <h4>Modifying an Array using axios</h4>
            <button className="btn btn-primary" onClick={createTodo} >
                Create Todo
            </button>

            <button className="btn btn-secondary" onClick={updateTitle} >
                Update Title
            </button>


            <h4> 3.5.1 posting in body</h4>
            <textarea value={todo.description}
                onChange={(e) => setTodo({
                    ...todo,
                    description: e.target.value
                })} />
            <input value={todo.due} type="date"
                onChange={(e) => setTodo({
                    ...todo, due: e.target.value
                })} />
            <label>
                <input checked={todo.completed} type="checkbox"
                    onChange={(e) => setTodo({
                        ...todo, completed: e.target.checked
                    })} />
                Completed
            </label>
            <button onClick={postTodo}> Post Todo </button>
            <button onClick={updateTodo}>
                Update Todo
            </button>
            <ul>
                {todos.map((todo: any) => (
                    <li key={todo.id}>
                        <input checked={todo.completed}
                            type="checkbox" readOnly />
                        {todo.title}
                        <p>{todo.description}</p>
                        <p>{todo.due}</p>

                        {todo.title}
                        <button className="btn btn-warning" onClick={() => fetchTodoById(todo.id)} >
                            Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => removeTodo(todo)} >
                            Remove
                        </button>
                        <button onClick={() => deleteTodo(todo)}
                            className="btn btn-danger float-end ms-2">
                            Delete
                        </button>


                    </li>
                ))}
            </ul>
        </div>
    );
}
export default WorkingWithArrays;