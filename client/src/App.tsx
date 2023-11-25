import React, { useEffect, useReducer } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "./services/tasks.service";
import Modal from "./components/Modal";
import TaskItem from "./components/Task";
import { IAppState, actionTypes, reducer } from "./utils/stateReducer";

const initialState: IAppState = {
  tasks: [],
  popupToggle: false,
  inputText: "",
  action: "",
  updateId: "",
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchTasks = async (): Promise<void> => {
    try {
      const newTasks = await getTasks();
      dispatch({ type: actionTypes.SET_TASKS, payload: newTasks });
    } catch (error) {
      console.error("Error fetching Tasks:", error);
    }
  };

  const addTask = async (): Promise<void> => {
    try {
      const createdTask = await createTask(state.inputText);
      dispatch({
        type: actionTypes.SET_TASKS,
        payload: [...state.tasks, createdTask],
      });
      dispatch({ type: actionTypes.SET_POPUP_TOGGLE, payload: false });
      dispatch({ type: actionTypes.SET_INPUT_TEXT, payload: "" });
    } catch (error) {
      console.error("Error creating new task:", error);
    }
  };

  const handleDeleteTask = async (id: string): Promise<void> => {
    try {
      const data = await deleteTask(id);
      dispatch({
        type: actionTypes.SET_TASKS,
        payload: state.tasks.filter((task) => task._id !== data._id),
      });
    } catch (error) {
      console.error(`Error deleting task: ${id} `, error);
    }
  };

  const handleUpdateTask = async (): Promise<void> => {
    try {
      await updateTask(state.updateId, state.inputText);
      await fetchTasks();
      dispatch({ type: actionTypes.SET_POPUP_TOGGLE, payload: false });
      dispatch({ type: actionTypes.SET_INPUT_TEXT, payload: "" });
    } catch (error) {
      console.error(`Error updating task: ${state.updateId} `, error);
    }
  };

  const handleEdit = (taskId: string): void => {
    dispatch({ type: actionTypes.SET_ACTION, payload: "Update" });
    dispatch({ type: actionTypes.SET_UPDATE_ID, payload: taskId });
    dispatch({ type: actionTypes.SET_POPUP_TOGGLE, payload: true });
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
              dispatch({ type: actionTypes.SET_ACTION, payload: "Create" });
              dispatch({ type: actionTypes.SET_POPUP_TOGGLE, payload: true });
            }}
          >
            +
          </div>
        </div>
        <ul className="max-w-full space-y-1 text-gray-500 list-inside">
          {state.tasks.length > 0 ? (
            state.tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                handleEdit={() => handleEdit(task._id)}
                handleDelete={() => handleDeleteTask(task._id)}
              />
            ))
          ) : (
            <p>Add some tasks</p>
          )}
        </ul>
      </div>

      {state.popupToggle && (
        <Modal
          inputText={state.inputText}
          setInputText={(text: string) =>
            dispatch({ type: actionTypes.SET_INPUT_TEXT, payload: text })
          }
          actionHandler={state.action === "Update" ? handleUpdateTask : addTask}
          setPopupToggle={(toggle: boolean) =>
            dispatch({ type: actionTypes.SET_POPUP_TOGGLE, payload: toggle })
          }
          action={state.action}
        />
      )}
    </div>
  );
}

export default App;
