import React, { useState, useEffect } from "react";
import axios from "axios";
import Flashcard from "./FlashCards";
import "../App.css";
const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    axios.get("https://tuf-intern-task-dlkf.onrender.com/flashcards").then((response) => {
      setFlashcards(response.data);
    });
  }, []);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  return (
    <div>
      {flashcards.length > 0 && (
        <Flashcard
          {...flashcards[currentIndex]}
          flipped={flipped}
          setFlipped={setFlipped}
        />
      )}
      <div style={{ textAlign: "center" }}>
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardList;
