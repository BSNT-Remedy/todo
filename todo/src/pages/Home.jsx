import { useState, useEffect } from 'react'
import TaskCard from '../components/TaskCard';
import '../css/Home.css'

function Home() {
  const [todo, setTodo] = useState([]);
  const [task, setTask] = useState("");
  const [tag, setTag] = useState("");
  const [prio, setPrio] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('todo');
    if(saved) {
      setTodo(JSON.parse(saved));
      console.log("first render: ", JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
    console.log("change todo: ", todo);
  }, [todo])

  const handleSubmit = () => {
    console.log('nag run to')
    if(!task || !tag || !prio) return;
    setTodo(prev => [...prev, {taskName: task, tag: tag, priority: prio}]);

    setTask(prev => prev = "");
    setPrio(prev => prev = "");
  }

  return (
    <div className="main-content">
      <h1>TODO APP</h1>
      <input value={task} onChange={(e) => setTask(e.target.value)} />
      <select value={tag} onChange={(e) => setTag(e.target.value)}>
        <option disabled value="">Select Tag</option>
        <option value="School">School</option>
        <option value="Work">Work</option>
        <option value="Leisure">Leisure</option>
      </select>
      <select value={prio} onChange={(e) => setPrio(e.target.value)} required>
        <option disabled value="">Select Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button onClick={handleSubmit}>Add</button>
      <h1>{task}</h1>
      <h1>{prio}</h1>

      <TaskCard todo={todo} setTodo={setTodo} />
    </div>
  )
}

export default Home;
