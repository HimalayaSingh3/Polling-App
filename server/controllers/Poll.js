const express = require("express");
const Poll = require("../models/Poll");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  const poll = await Poll.create({
    ...req.body,
    createdBy: req.user.id,
  });
  res.status(201).json(poll);
});

router.get("/", async (req, res) => {
  const polls = await Poll.find().sort("-createdAt");
  res.json(polls);
});

router.post("/:id/vote", authenticate, async (req, res) => {
  const { optionIndex } = req.body;
  const poll = await Poll.findById(req.params.id);
  if (!poll) return res.status(404).json({ msg: "Poll not found" });

  if (poll.voters.includes(req.user.id))
    return res.status(400).json({ msg: "Already voted" });

  poll.options[optionIndex].votes += 1;
  poll.voters.push(req.user.id);
  await poll.save();

  // Emit via Socket.io
  const io = req.app.get("io");
  io.to(poll.id).emit("pollUpdated", poll);

  res.json(poll);
});

module.exports = router;
