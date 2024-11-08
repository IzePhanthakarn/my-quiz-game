import React from "react";
import { useNavigate } from "react-router-dom";

const Learn = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/quiz");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Learn Basic German</h1>
        <p style={styles.subtitle}>
          Enhance your knowledge with these basic questions!
        </p>
      </div>
      <div style={styles.content}>
        <div style={styles.infoContainer}>
          <h3 style={styles.question}>1. What does 'Hallo' mean in German?</h3>
          <p style={styles.answer}>
            Answer: 'Hallo' means 'Hello' in German. It is a common greeting
            used throughout the day.
          </p>

          <h3 style={styles.question}>
            2. How do you say 'Thank you' in German?
          </h3>
          <p style={styles.answer}>
            Answer: 'Danke' is the German word for 'Thank you'. It is used to
            show gratitude.
          </p>

          <h3 style={styles.question}>
            3. What is the number 'two' in German?
          </h3>
          <p style={styles.answer}>
            Answer: The number 'two' is 'Zwei' in German. It's the second number
            in the basic counting sequence.
          </p>

          <h3 style={styles.question}>4. What does 'Guten Morgen' mean?</h3>
          <p style={styles.answer}>
            Answer: 'Guten Morgen' means 'Good morning' in German. It is used to
            greet someone in the morning.
          </p>

          <h3 style={styles.question}>
            5. How do you say 'Goodbye' in German?
          </h3>
          <p style={styles.answer}>
            Answer: 'Auf Wiedersehen' is the German word for 'Goodbye'. It
            literally translates to 'Until we see each other again'.
          </p>

          <h3 style={styles.question}>6. What is the color 'red' in German?</h3>
          <p style={styles.answer}>
            Answer: The color 'red' is 'Rot' in German.
          </p>

          <h3 style={styles.question}>
            7. What is the German word for 'bread'?
          </h3>
          <p style={styles.answer}>
            Answer: The German word for 'bread' is 'Brot'. It is a staple food
            in Germany.
          </p>

          <h3 style={styles.question}>8. How do you say 'Please' in German?</h3>
          <p style={styles.answer}>
            Answer: 'Bitte' means 'Please' in German. It is used when making
            requests or offering something.
          </p>

          <h3 style={styles.question}>9. What is 'one' in German?</h3>
          <p style={styles.answer}>Answer: 'One' is 'Eins' in German.</p>

          <h3 style={styles.question}>
            10. What does 'Entschuldigung' mean in English?
          </h3>
          <p style={styles.answer}>
            Answer: 'Entschuldigung' means 'Excuse me' in English. It is used
            when you want to apologize or get someone's attention.
          </p>
        </div>

        <div style={styles.buttonContainer}>
          <button
            onClick={handleStartGame}
            style={styles.button}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f4f8",
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    height: "auto",
  },
  title: {
    fontSize: "36px",
    color: "#333",
    fontWeight: "bold",
    borderBottom: "3px solid #007bff",
    paddingBottom: "10px",
    marginBottom: "15px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#666",
    marginTop: "10px",
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
    padding: "30px",
    maxWidth: "700px",
    width: "100%",
    height: "auto",
    overflowY: "auto",
    borderTop: "5px solid #007bff",
  },
  infoContainer: {
    marginBottom: "30px",
  },
  question: {
    fontSize: "20px",
    color: "#007bff",
    marginBottom: "5px",
    fontWeight: "500",
  },
  answer: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
    lineHeight: "1.6",
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "5px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "18px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#218838",
  },
};

export default Learn;
