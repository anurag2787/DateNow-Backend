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
  const talk = new Talk({ 
    role, 
    text, 
    userid, 
    displayName: displayName || 'Anonymous' 
  });

  try {
    const savedTalk = await talk.save();
    res.status(201).json({ 
      message: "Message saved successfully!", 
      data: savedTalk 
    });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ 
      error: "Unable to save message", 
      details: error.message 
    });
  }
});

// ✅ Correctly export the router
module.exports = router;
