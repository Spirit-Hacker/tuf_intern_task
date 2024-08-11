const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(
  cors({
      origin: "https://tuf-intern-task-7s1lceido-pranil-dhutrajs-projects.vercel.app",
      credentials: true,
  })
);
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Routes for CRUD operations
app.get("/flashcards", (req, res) => {
  db.query("SELECT * FROM flashcards", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post("/flashcards", (req, res) => {
  const { question, answer } = req.body;
  db.query(
    "INSERT INTO flashcards (question, answer) VALUES (?, ?)",
    [question, answer],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  );
});

app.put("/flashcards/:id", (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  db.query(
    "UPDATE flashcards SET question = ?, answer = ? WHERE id = ?",
    [question, answer, id],
    (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.sendStatus(200);
    }
  );
});

app.delete("/flashcards/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM flashcards WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.sendStatus(200);
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});
