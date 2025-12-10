import { TodoProvider } from "./contexts/TodoContext";
import App from "./App";

export default function AppWrapper() {
    return (
        <div>
            <TodoProvider>
                <App/>
            </TodoProvider>
        </div>
    )
}