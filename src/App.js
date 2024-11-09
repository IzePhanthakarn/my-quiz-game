import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Learn from "./pages/Home";
import Register from "./pages/Register";
import MainLayout from "./MainLayout";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/" element={<Learn />} />
            <Route path="/leaderboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
