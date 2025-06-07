import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto p-6 border rounded shadow-md mt-20">
      <h2 className="text-2xl mb-4 font-semibold">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          type="text"
          placeholder="Username"
          required
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
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
        <button className="bg-blue-600 text-white w-full py-2 rounded cursor-pointer">
          Register
        </button>
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>
      </form>
    </div>
    </div>
  );
};

export default Register;
