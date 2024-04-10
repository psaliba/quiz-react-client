import Destructing from "./Destructing";
import FunctionDestructing from "./FunctionDestructing";
import House from "./House";
import JsonStringify from "./JsonStringify"
import Spreading from "./Spreading";
function WorkingWithJson() {
    return (
        <>
            <h2>Working with Json </h2>
            <JsonStringify/>
            <House/>
            <Spreading/>
            <Destructing/>
            <FunctionDestructing/>
        </>
    );
}

export default WorkingWithJson;