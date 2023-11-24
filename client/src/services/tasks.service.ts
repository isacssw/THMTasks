export interface ITask {
  _id: string;
  title: string;
  timestamp: string;
}

const API_URL = import.meta.env.VITE_API;

export const createTask = async (title: string): Promise<ITask> => {
  const res = await fetch(`${API_URL}/task`, {
    method: "POST",
    body: JSON.stringify({
      title,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const getTasks = async (): Promise<ITask[]> => {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
};

export const updateTask = async (id: string, title: string): Promise<ITask> => {
  const res = await fetch(`${API_URL}/task/update/` + id, {
    method: "PUT",
    body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
  });
  return res.json();
};

export const deleteTask = async (id: string): Promise<ITask> => {
  const res = await fetch(`${API_URL}/task/delete/` + id, { method: "DELETE" });
  return res.json();
};
