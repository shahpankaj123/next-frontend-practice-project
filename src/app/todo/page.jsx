"use client";
import { React, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import Navbar from "../components/nav";

const TodoApp = () => {
  const router = useRouter();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token) {
      router.push("/auth/login");
    } else {
      fetchTodos(token, userId);
    }
  }, [router]);

  const fetchTodos = async (token, userId) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/web/api/todo/get-all?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]);
    }
  };

  const handleEdit = (id) => alert(`Edit Todo ID: ${id}`);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/web/api/todo/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ taskId: id }),
      });

      const data = await res.json();
      if (res.ok)
        fetchTodos(
          localStorage.getItem("token"),
          localStorage.getItem("userId")
        );
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-start p-4">
      <Navbar />
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-6 mt-4">
        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.taskId}
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
                  onClick={() => handleEdit(todo.taskId)}
                  className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
                >
                  <Pencil className="w-4 h-4" />
                  <span className="text-sm font-medium">Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(todo.taskId)}
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
