import React, { useState,useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { FcTodoList } from "react-icons/fc";

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (taskInput.trim() === "") return alert("Task cannot be empty");

    const newTask = {
      id: Date.now(),
      text: taskInput.trim(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setTaskInput("");
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === "az") return a.text.localeCompare(b.text);
    if (sort === "za") return b.text.localeCompare(a.text);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
       <h2 className="text-2xl font-bold mb-4  text-blue-700 flex justify-center items-center gap-3">
         <FcTodoList className="text-3xl"/>
         To-Do List
         </h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter a new task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600  cursor-pointer"
          >
            Add
          </button>
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Filter:</label>
            <select
              className="border border-gray-300 rounded px-2 py-1"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Sort:</label>
            <select
              className="border border-gray-300 rounded px-2 py-1"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="az">Start-End</option>
              <option value="za">End-Start</option>
            </select>
          </div>
        </div>

        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {sortedTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-100 rounded px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                  className="accent-blue-500"
                />
                <span
                  className={`${
                    task.completed ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
               <RxCross2 />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;

