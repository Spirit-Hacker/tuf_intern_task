import React from "react";
import "../App.css";

const Flashcard = ({ question, answer, flipped, setFlipped }) => {
  return (
    <div className="flashcard-container">
      <div
        className={`flashcard ${flipped ? "is-flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="flashcard-front">{question}</div>
        <div className="flashcard-back">{answer}</div>
      </div>
    </div>
  );
};

export default Flashcard;
