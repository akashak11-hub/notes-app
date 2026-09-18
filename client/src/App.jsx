import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Lifecycle data ingestion - fetch all notes on mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setNotes(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to load notes. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      setSubmitting(true);
      const res = await axios.post(API_URL, { title, content });
      setNotes((prev) => [res.data, ...prev]);
      setTitle("");
      setContent("");
      setError("");
    } catch (err) {
      console.error("Error creating note:", err);
      setError("Failed to create note.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("Failed to delete note.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="container">
      <h1>Notes</h1>

      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add Note"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="status-message">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="status-message">No notes yet — add one above!</p>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <div className="note-card" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div className="note-footer">
                <span className="note-date">{formatDate(note.createdAt)}</span>
                <button className="delete-btn" onClick={() => handleDelete(note._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
