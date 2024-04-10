import ConditionalOutput from "./ConditionalOutput";
import DynamicStyling from "./DynamicStyling";
import Highlight from "./Highlight";
import JavaScript from "./JavaScript";
import Classes from "./css/Classes";
import Styles from "./css/Styles";
import Routing from "./routing";
import Add from "./Add"
import TodoItem from "./todos/TodoItem";
import TodoList from "./todos/TodoList";
import { useSelector } from "react-redux";
import { LabState } from "../store";
function Assignment3() {
  const { todos } = useSelector((state: LabState) => state.todosReducer);
    return (
      <div className="container">
        <h1>Assignment 3</h1>
        <ul className="list-group">
        {todos.map((todo) => (
          <li className="list-group-item" key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
        <ConditionalOutput/>
        <DynamicStyling/> 
        <Styles/>
        <Classes/>
        <JavaScript/>
        <Routing/>
        <Highlight>Test content right here</Highlight>
        <Add a={3} b={4}/>
        <TodoItem/>
        <TodoList/>
      </div>
    );
  }
  export default Assignment3;


