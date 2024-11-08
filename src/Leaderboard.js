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
              <tr
                key={index}
                style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td style={styles.cell}>{result.name}</td>
                <td style={styles.cell}>{result.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={styles.noResults}>No quiz results available.</p>
      )}
      <button
        onClick={handleBackToStart}
        style={styles.button}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = styles.button.backgroundColor)
        }
      >
        กลับไปหน้าเริ่มเกม
      </button>
      <button
        onClick={handleClearLocalStorage}
        style={styles.clearButton}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor =
            styles.clearButtonHover.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = styles.clearButton.backgroundColor)
        }
      >
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
    backgroundColor: "#fafafa",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
    width: "90%",
    maxWidth: "600px",
    margin: "0 auto",
  },
  title: {
    fontSize: "32px",
    color: "#333",
    marginBottom: "30px",
    fontWeight: "bold",
    textAlign: "center",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    marginTop: "20px",
    overflow: "hidden",
    borderRadius: "8px",
  },
  header: {
    border: "1px solid #ddd",
    padding: "14px",
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "18px",
  },
  cell: {
    border: "1px solid #ddd",
    padding: "14px",
    textAlign: "center",
    fontSize: "16px",
    color: "#555",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#fff",
  },
  button: {
    marginTop: "25px",
    padding: "14px 24px",
    fontSize: "18px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#218838",
  },
  clearButton: {
    marginTop: "15px",
    padding: "12px 24px",
    fontSize: "18px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  clearButtonHover: {
    backgroundColor: "#c82333",
  },
  noResults: {
    fontSize: "18px",
    color: "#888",
    marginTop: "20px",
    fontStyle: "italic",
  },
};

export default Dashboard;
