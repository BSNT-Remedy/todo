import { useTodo } from "../contexts/TodoContext";
import TaskCard from "../components/TaskCard";

function Missed() {

    return (
        <div>
            <h1>Missed Task</h1>
            <TaskCard />
        </div>
    )
}

export default Missed;