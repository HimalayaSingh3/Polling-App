import axios from "axios";
import React from "react";

const PollCard = ({ poll }) => {
  const handleVote = async (optionIndex) => {
    try {
      await axios.post(
        `http://localhost:5000/api/polls/${poll._id}/vote`,
        { optionIndex },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
    } catch (err) {
      alert(err.response?.data?.msg || "Vote failed");
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{poll.question}</h2>
      <ul className="mt-3 space-y-2">
        {poll.options.map((opt, idx) => (
          <li key={idx}>
            <button
              onClick={() => handleVote(idx)}
              className="w-full text-left bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded"
            >
              {opt.text} — <strong>{opt.votes}</strong> votes
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollCard;
