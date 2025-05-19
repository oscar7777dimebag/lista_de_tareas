// src/components/TaskItem.js
import { useContext } from "react";
import TaskContext from "../context/TaskContext";

function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useContext(TaskContext);

  return (
    <li className="flex items-center justify-between bg-white p-2 rounded shadow">
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
        onClick={() => toggleTask(task.id)}
        className="flex-grow"
      >
        {task.text}
      </span>
      <button
        onClick={() => deleteTask(task.id)}
        className="bg-red-500 text-white font-semibold py-1 px-3 rounded hover:bg-red-600 transition-colors"
      >
        Eliminar
      </button>
    </li>
  );
}

export default TaskItem;
