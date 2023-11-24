import { ITask } from "../services/tasks.service";

interface ITaskItem {
  task: ITask;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => Promise<void>;
}

const TaskItem = (props: ITaskItem) => {
  const { handleDelete, handleEdit, task } = props;

  return (
    <div className="flex items-center border rounded-lg justify-between p-2">
      <li>{task.title}</li>
      <div className="flex gap-2">
        <div
          className="focus:outline-none text-white bg-slate-200 hover:bg-slate-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5"
          onClick={() => handleEdit(task._id)}
        >
          ✏️
        </div>
        <div
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5"
          onClick={() => handleDelete(task._id)}
        >
          x
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
