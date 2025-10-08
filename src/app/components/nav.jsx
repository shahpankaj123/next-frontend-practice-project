"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus, List, User } from "lucide-react";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("fullName");
    router.push("/auth/login");
  };

  return (
    <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo / Brand */}
      <div className="text-2xl font-bold text-gray-800">TodoApp</div>

      {/* Navigation links */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => router.push("/todo/create")}
          className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          Create
        </button>

        <button
          onClick={() => router.push("/todo")}
          className="flex items-center gap-1 px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          <List className="w-4 h-4" />
          List
        </button>

        <button
          onClick={() => router.push("/user/details")}
          className="flex items-center gap-1 px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          <User className="w-4 h-4" />
          User Details
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
