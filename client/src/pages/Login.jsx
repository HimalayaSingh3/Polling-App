import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto mt-20 border rounded shadow-md p-6">
      <h2 className="text-2xl mb-4 font-semibold">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <button className="bg-blue-600 cursor-pointer text-white w-full py-2 rounded">
          Login
        </button>
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600">
            Register
          </a>
        </p>
      </form>
    </div>
    </div>
  );
};

export default Login;
