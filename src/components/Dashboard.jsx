import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = () => {
    axios.get("https://tuf-intern-task-dlkf.onrender.com/flashcards").then((response) => {
      setFlashcards(response.data);
    });
  };

  const handleSubmit = () => {
    if (editing) {
      axios
        .put(`https://tuf-intern-task-dlkf.onrender.com/flashcards/${editing}`, {
          question,
          answer,
        })
        .then(() => {
          fetchFlashcards();
          setEditing(null);
        });
    } else {
      axios
        .post("https://tuf-intern-task-dlkf.onrender.com/flashcards", { question, answer })
        .then(() => {
          fetchFlashcards();
        });
    }
    setQuestion("");
    setAnswer("");
  };

  const handleEdit = (id) => {
    const flashcard = flashcards.find((fc) => fc.id === id);
    setQuestion(flashcard.question);
    setAnswer(flashcard.answer);
    setEditing(id);
  };

  const handleDelete = (id) => {
    axios.delete(`https://tuf-intern-task-dlkf.onrender.com/flashcards/${id}`).then(() => {
      fetchFlashcards();
    });
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={handleSubmit}>{editing ? "Update" : "Add"}</button>
      <ul>
        {flashcards.map((fc) => (
          <li key={fc.id}>
            {fc.question} - {fc.answer}
            <div className="dashboard-flashcard">
              <button onClick={() => handleEdit(fc.id)}>Edit</button>
              <button onClick={() => handleDelete(fc.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
