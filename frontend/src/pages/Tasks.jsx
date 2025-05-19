// src/pages/Tasks.js
import { useContext, useState } from "react";
import TaskContext from "../context/TaskContext";
import TaskItem from "../components/TaskItem";

function Tasks() {
  const { tasks, addTask } = useContext(TaskContext);
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim() !== "") {
      addTask(text);
      setText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Lista de Tareas
        </h2>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nueva tarea"
              className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 shadow-md"
            >
              Agregar
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">
              No hay tareas pendientes
            </p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
