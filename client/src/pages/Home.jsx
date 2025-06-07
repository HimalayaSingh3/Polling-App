import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";
import PollCard from "../components/PollCard";
import React from "react";

const Home = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/polls").then((res) => {
      setPolls(res.data);
      res.data.forEach((poll) => socket.emit("joinPoll", poll._id));
    });
  }, []);

  useEffect(() => {
    socket.on("pollUpdated", (updatedPoll) => {
      setPolls((prev) =>
        prev.map((p) => (p._id === updatedPoll._id ? updatedPoll : p))
      );
    });
    return () => socket.off("pollUpdated");
  }, []);

  return (
    <div className="p-6 w-full mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Live Polls</h1>
      {polls.map((poll) => (
        <PollCard key={poll._id} poll={poll} />
      ))}
    </div>
  );
};

export default Home;
