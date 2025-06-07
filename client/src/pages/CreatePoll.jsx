import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (i, val) => {
    const newOpts = [...options];
    newOpts[i] = val;
    setOptions(newOpts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedOptions = options.map((text) => ({ text }));
    try {
      await axios.post(
        "http://localhost:5000/api/polls",
        { question, options: formattedOptions },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      navigate("/");
    } catch (err) {
        console.error(err);
      alert("Poll creation failed");
    }
  };

  return (
    <div className="p-4">
      <div className="w-full mx-auto mt-20 p-4 border rounded shadow-md">
      <h2 className="text-2xl mb-4 font-semibold">Create a Poll</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Poll question" className="w-full border px-4 py-2 rounded" />
        {options.map((opt, i) => (
          <input key={i} value={opt} onChange={(e) => updateOption(i, e.target.value)} placeholder={`Option ${i + 1}`} className="w-full border px-4 py-2 rounded" />
        ))}
        <button type="button" onClick={addOption} className="text-blue-500 underline">Add Option</button>
        <button className="bg-green-600 text-white w-full py-2 rounded cursor-pointer">Create Poll</button>
      </form>
    </div>
    </div>
  );
};

export default CreatePoll;
