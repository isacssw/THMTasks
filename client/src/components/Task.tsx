import { ITask } from "../services/tasks.service";

const Task = (task: ITask, handleDeleteTask) => {

    console.log(task);
    
  return (
    <div key={task._id} className="flex items-center border rounded-lg justify-between p-3">
      <li>{task.title}</li>

      <div
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5"
        onClick={() => handleDeleteTask(task._id)}
      >
        x
      </div>
    </div>
  );
};

export default Task;
