"use client";
import { React, useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const TodoApp = () => {
  const [todos, setTodos] = useState([
    { id: 1, task: "Learn Django", status: "Pending" },
    { id: 2, task: "Build Todo API", status: "Completed" },
    { id: 3, task: "Connect React Frontend", status: "Pending" },
  ]);

  const handleEdit = (id) => {
    alert(`Edit Todo ID: ${id}`);
  };

  const handleDelete = (id) => {
    const filtered = todos.filter((todo) => todo.id !== id);
    setTodos(filtered);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          📝 My Todo List
        </h1>

        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-xl p-4 shadow-sm border border-gray-200"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  {todo.task}
                </h2>
                <p
                  className={`text-sm mt-1 ${
                    todo.status === "Completed"
                      ? "text-green-600 font-medium"
                      : "text-yellow-600 font-medium"
                  }`}
                >
                  {todo.status}
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(todo.id)}
                  className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
                >
                  <Pencil className="w-4 h-4" />
                  <span className="text-sm font-medium">Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(todo.id)}
                  className="flex items-center gap-1 px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            🎉 All tasks completed or no todos found!
          </p>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
