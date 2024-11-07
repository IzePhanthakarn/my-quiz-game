import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("quizResults")) || [];
    storedScores.sort((a, b) => b.score - a.score);
    setScores(storedScores);
  }, []);

  const handleBackToStart = () => {
    navigate("/quiz");
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem("quizResults");
    setScores([]);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Quiz Leaderboard</h2>
      {scores.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.header}>Name</th>
              <th style={styles.header}>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((result, index) => (
              <tr key={index}>
                <td style={styles.cell}>{result.name}</td>
                <td style={styles.cell}>{result.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={styles.noResults}>No quiz results available.</p>
      )}
      <button onClick={handleBackToStart} style={styles.button}>
        กลับไปหน้าเริ่มเกม
      </button>
      <button onClick={handleClearLocalStorage} style={styles.clearButton}>
        เคลียร์ข้อมูล
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50px",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "80%",
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    fontSize: "36px",
    color: "#333",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    marginTop: "20px",
  },
  header: {
    border: "1px solid #ddd",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  cell: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "center",
    fontSize: "16px",
  },
  button: {
    marginTop: "20px",
    padding: "12px 20px",
    fontSize: "18px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  clearButton: {
    marginTop: "15px",
    padding: "12px 20px",
    fontSize: "18px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#218838",
  },
  noResults: {
    fontSize: "18px",
    color: "#888",
    marginTop: "20px",
  },
};

export default Dashboard;
