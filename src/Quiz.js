import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const questions = [
    {
      question: "What does 'Hallo' mean in German?",
      options: ["Goodbye", "Hello", "Please", "Excuse me"],
      answer: "Hello",
    },
    {
      question: "How do you say 'Thank you' in German?",
      options: ["Bitte", "Danke", "Entschuldigung", "Hallo"],
      answer: "Danke",
    },
    {
      question: "What is the number 'two' in German?",
      options: ["Drei", "Zwei", "Eins", "Vier"],
      answer: "Zwei",
    },
    {
      question: "What does 'Guten Morgen' mean?",
      options: ["Good morning", "Good night", "Good afternoon", "Goodbye"],
      answer: "Good morning",
    },
    {
      question: "How do you say 'Goodbye' in German?",
      options: ["Guten Abend", "Auf Wiedersehen", "Bitte", "Hallo"],
      answer: "Auf Wiedersehen",
    },
    {
      question: "What is the color 'red' in German?",
      options: ["Blau", "Grün", "Rot", "Gelb"],
      answer: "Rot",
    },
    {
      question: "What is the German word for 'bread'?",
      options: ["Wasser", "Kaffee", "Milch", "Brot"],
      answer: "Brot",
    },
    {
      question: "How do you say 'Please' in German?",
      options: ["Danke", "Bitte", "Entschuldigung", "Tschüss"],
      answer: "Bitte",
    },
    {
      question: "What is 'one' in German?",
      options: ["Zwei", "Drei", "Eins", "Vier"],
      answer: "Eins",
    },
    {
      question: "What does 'Entschuldigung' mean in English?",
      options: ["Hello", "Please", "Excuse me", "Thank you"],
      answer: "Excuse me",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [username, setUsername] = useState("");
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const navigate = useNavigate();

  const handleAnswerOptionClick = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      saveScoreToLocalStorage();
      navigate("/leaderboard");
    }
  };

  const saveScoreToLocalStorage = () => {
    const quizResults = JSON.parse(localStorage.getItem("quizResults")) || [];
    const newResult = { name: username, score: score };
    quizResults.push(newResult);
    localStorage.setItem("quizResults", JSON.stringify(quizResults));
  };

  const startQuiz = () => {
    if (username.trim() !== "") {
      setIsQuizStarted(true);
    }
  };

  if (showScore) {
    return (
      <div style={styles.container}>
        <h2>Quiz Completed!</h2>
        <p>
          You scored {score} out of {questions.length}
        </p>
        <p>Thank you for playing, {username}!</p>
      </div>
    );
  }

  if (!isQuizStarted) {
    return (
      <div style={styles.container}>
        <h2>Welcome to the Quiz Game!</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <button onClick={startQuiz} style={styles.button}>
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.quizSection}>
        <div style={styles.questionSection}>
          <div style={styles.questionCount}>
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div style={styles.questionText}>
            {questions[currentQuestion].question}
          </div>
        </div>
        <div style={styles.answerSection}>
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerOptionClick(option)}
              style={styles.optionButton}
            >
              {option}
            </button>
          ))}
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
    backgroundColor: "#f5f5f5",
  },
  quizSection: {
    width: "300px",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  questionSection: {
    marginBottom: "20px",
  },
  questionCount: {
    fontSize: "16px",
    marginBottom: "5px",
  },
  questionText: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  answerSection: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  optionButton: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    marginBottom: "10px",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
    border: "none",
  },
};

export default Quiz;
