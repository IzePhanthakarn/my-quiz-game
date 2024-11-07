import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const mockUsername = "saritthon";
  const mockPassword = "6541470020";

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === mockUsername && password === mockPassword) {
      setError("");
      navigate("/learn");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.header}>Login</h2>

        <div style={styles.pikachuContainer}>
          <img
            // src="https://media.tenor.com/J88PUsgzQWQAAAAi/meme-betterttv.gif" // แมวแดกขนม
            src="https://media1.tenor.com/m/GOj9ZF_-ZOcAAAAd/cat.gif" // แมวพิม
            alt="Running Pikachu"
            style={styles.pikachuImage}
          />
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
      </div>

      <style>
        {`
          @keyframes movePikachu {
            0% {
              transform: translateX(0); /* เริ่มต้นที่ตำแหน่งเริ่มต้น */
            }
            50% {
              transform: translateX(100px); /* เคลื่อนที่ไปทางขวา */
            }
            75% {
              transform: translateX(-100px); /* กลับมาอยู่ที่ตำแหน่งเริ่มต้น */
            }
            100% {
              transform: translateX(0); /* กลับมาอยู่ที่ตำแหน่งเริ่มต้น */
            }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f4f8",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "380px",
    textAlign: "center",
  },
  header: {
    fontSize: "30px",
    color: "#333",
    marginBottom: "20px",
    fontFamily: "'Roboto', sans-serif",
  },
  form: {
    width: "100%",
    padding: "0",
  },
  inputGroup: {
    marginBottom: "20px",
    textAlign: "left",
    width: "100%",
  },
  label: {
    fontSize: "14px",
    color: "#333",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "16px",
    backgroundColor: "#f9f9f9",
    transition: "all 0.3s ease",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  error: {
    color: "red",
    marginTop: "15px",
    fontSize: "14px",
  },
  pikachuContainer: {
    marginBottom: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    animation: "movePikachu 3s ease-in-out infinite",
  },
  pikachuImage: {
    width: "150px",
    height: "auto",
  },
};

export default Login;
