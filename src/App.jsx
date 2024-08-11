import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FlashcardList from "./components/FlashCardList";
import Dashboard from "./components/Dashboard";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlashcardList />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
