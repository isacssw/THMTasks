import { useEffect, useState } from "react";
import {
  ITask,
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "./services/tasks.service";
import Modal from "./components/Modal";

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [popupToggle, setPopupToggle] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [updateId, setUpdateId] = useState<string>("");

  const fetchTasks = async () => {
    try {
      const newTasks = await getTasks();
      setTasks(newTasks);
    } catch (error) {
      console.error("Error fetching Tasks:", error);
    }
  };

  const addTask = async (): Promise<void> => {
    try {
      const createdTask = await createTask(inputText);
      setTasks([...tasks, createdTask]);
      setPopupToggle(false);
      setInputText("");
    } catch (error) {
      console.error("Error creating new task:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const data = await deleteTask(id);

      setTasks((tasks) => tasks.filter((task) => task._id !== data._id));
    } catch (error) {
      console.error(`Error deleting task: ${id} `, error);
    }
  };

  const handleUpdateTask = async (): Promise<void> => {
    try {
      await updateTask(updateId, inputText);
      await fetchTasks();
      setPopupToggle(false);
      setInputText("");

    } catch (error) {
      console.error(`Error updating task: ${id} `, error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-8">
      <div className="lg:mx-60 border rounded-lg border-blue-700 p-5">
        <div className="flex items-center justify-between p-2 mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Tasks List</h2>
          <div
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => {
              setAction("Create");
              setPopupToggle(true);
            }}
          >
            +
          </div>
        </div>
        <ul className="max-w-full space-y-1 text-gray-500 list-inside">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task._id}
                className="flex items-center border rounded-lg justify-between p-2"
              >
                <li>{task.title}</li>

                <div className="flex gap-2">
                  <div
                    className="focus:outline-none text-white bg-slate-200 hover:bg-slate-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5"
                    onClick={() => {
                      setAction("Update");
                      setUpdateId(task._id);
                      setPopupToggle(true);
                    }}
                  >
                    ✏️
                  </div>

                  <div
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    x
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Add some tasks</p>
          )}
        </ul>
      </div>

      {popupToggle && (
        <Modal
          inputText={inputText}
          setInputText={setInputText}
          actionHandler={action == "Update" ? handleUpdateTask : addTask}
          setPopupToggle={setPopupToggle}
          action={action}
        />
      )}
    </div>
  );
}

export default App;
