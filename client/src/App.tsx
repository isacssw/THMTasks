import { useEffect, useState } from "react";

interface Task {
  _id: string
  title: string
  timestamp: string
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API+'/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error: ", err));
  }, []);

  return (
    <>
      <div>
        {
          tasks.map((task) => (
            <div key={task._id}>
              <div>{task.title}</div>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default App;
