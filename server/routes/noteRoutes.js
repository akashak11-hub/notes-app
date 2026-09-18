const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// POST /api/notes - create a new note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "title and content are required" });
    }

    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();

    return res.status(201).json(savedNote);
  } catch (err) {
    console.error("Error creating note:", err.message);
    return res.status(500).json({ message: "Server error while creating note" });
  }
});

// GET /api/notes - fetch all notes, newest first
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err.message);
    return res.status(500).json({ message: "Server error while fetching notes" });
  }
});

// DELETE /api/notes/:id - delete a note by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({ message: "Note deleted", note: deletedNote });
  } catch (err) {
    console.error("Error deleting note:", err.message);
    return res.status(500).json({ message: "Server error while deleting note" });
  }
});

module.exports = router;
