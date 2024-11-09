import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Leaderboard";
import Login from "./Login";
import Quiz from "./Quiz";
import Learn from "./Learn";
import Register from "./register";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/" element={<Learn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/leaderboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
