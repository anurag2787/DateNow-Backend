const express = require("express");
const Talk = require("../model/talkmodel");

const router = express.Router();

router.get("/talkmsg", async (req, res) => {
  try {
    const talk = await Talk.find();
    res.status(200).json(talk);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/talkmsg", async (req, res) => {
  const { role, text, userid, displayName } = req.body;
  const talk = new Talk({ role, text, userid, displayName });

  try {
    await talk.save();
    res.status(201).json({ message: "Message Saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Correctly export the router
module.exports = router;
