// src/context/TaskContext.js
import { createContext, useReducer, useEffect } from "react";

const TaskContext = createContext();
const API_URL = "/api";

const initialState = [];

function taskReducer(state, action) {
  switch (action.type) {
    case "SET_TASKS":
      return action.payload;
    case "ADD_TASK":
      return [...state, action.payload];
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      dispatch({ type: "SET_TASKS", payload: data });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (text) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const newTask = await response.json();
      dispatch({ type: "ADD_TASK", payload: newTask });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PATCH",
      });
      const updatedTask = await response.json();
      dispatch({ type: "TOGGLE_TASK", payload: updatedTask });
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });
      dispatch({ type: "DELETE_TASK", payload: taskId });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state,
        addTask,
        toggleTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskContext;
