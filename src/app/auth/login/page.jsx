"use client";
import { useRouter } from "next/navigation";

export default function LoginPageComponent() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData(e.target);
      const data = Object.fromEntries(formdata);

      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result_data = await res.json();
      console.log(result_data);

      if (result_data?.status === 200) {
        localStorage.setItem("token", result_data?.token);
        localStorage.setItem("email", result_data?.email);
        localStorage.setItem("userId", result_data?.userId);
        localStorage.setItem("fullName", result_data?.fullName);
        localStorage.setItem("role", result_data?.role);
        console.log("Login successfully");
        if (localStorage.getItem("role") === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/todo");
        }
      } else console.log("login Failed", result_data);
    } catch (er) {
      console.log("error occured", err);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login to Your Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit} method="POST">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-amber-900"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-amber-900"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Signup link */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => router.push("/auth/signup")}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
