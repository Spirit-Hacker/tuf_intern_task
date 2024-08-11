import React from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import FlashcardList from "./components/FlashCardList";
import Dashboard from "./components/Dashboard";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FlashcardList />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
