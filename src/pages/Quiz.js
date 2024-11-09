import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizSentences } from "../model/quiz";
import { Volume2 } from "lucide-react";
import { supabase } from "../lib/helper/supabaseClient";
import useAuthStatus from "../hooks/useAuthStatus";

const Quiz = () => {
  const shuffledQuestions = quizSentences.slice(0, 10);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStatus();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("session", session);
      if (!session) {
        navigate("/");
      }
    };
    fetchSession();
  }, [navigate]);

  const handleAnswerOptionClick = (option) => {
    if (option === shuffledQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < shuffledQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setIsLoading(true); // Start loading when reaching the end
      saveScoreToDatabase();
    }
  };

  const saveScoreToDatabase = async () => {
    const userId = user.id;
    const name = user.name;
    const scoreToSave = score;

    const { error: gameResultsError } = await supabase
      .from("game_results")
      .insert([{ user_id: userId, name: name, score: scoreToSave }]);

    if (gameResultsError) {
      console.error("Error saving score to game_results:", gameResultsError);
    }

    const { data: leaderboardData, error: leaderboardError } = await supabase
      .from("leaderboard")
      .select("user_id, score")
      .eq("user_id", userId)
      .single();

    if (leaderboardError && leaderboardError.code !== "PGRST116") {
      console.error("Error fetching leaderboard data:", leaderboardError);
      return;
    }

    if (leaderboardData) {
      if (scoreToSave > leaderboardData.score) {
        const { error } = await supabase
          .from("leaderboard")
          .update({ score: scoreToSave })
          .eq("user_id", userId);

        if (error) {
          console.error("Error updating leaderboard score:", error);
        }
      }
    } else {
      const { error } = await supabase
        .from("leaderboard")
        .insert([{ user_id: userId, name: name, score: scoreToSave }]);

      if (error) {
        console.error("Error inserting new leaderboard entry:", error);
      }
    }

    setIsLoading(false); // Stop loading after the database save is complete
    setShowScore(true); // Show score after loading completes
  };

  const speakQuestion = (text) => {
    const cleanedText = text.replace(/_/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.lang = "de-DE";
    window.speechSynthesis.speak(utterance);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  const renderLoading = () => (
    <h2 className="text-3xl font-bold text-gray-900">Loading...</h2>
  );

  const renderScore = () => (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        แบบทดสอบเสร็จสิ้น!
      </h2>
      <p className="text-xl text-gray-700 mb-4">
        คุณได้คะแนน {score} จาก {shuffledQuestions.length} คะแนน
      </p>
      <div className="mt-8 space-x-4">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          กลับหน้าหลัก
        </button>
        <button
          onClick={() => navigate("/leaderboard")}
          className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors duration-200"
        >
          ดูคะแนนทั้งหมด
        </button>
        <button
          onClick={resetQuiz}
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors duration-200"
        >
          ทำแบบทดสอบใหม่
        </button>
      </div>
    </div>
  );

  const renderQuestion = () => (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            คำถามที่ {currentQuestion + 1} จาก {shuffledQuestions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((currentQuestion + 1) / shuffledQuestions.length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {shuffledQuestions[currentQuestion].sentence}
        </h2>
        <button
          onClick={() =>
            speakQuestion(shuffledQuestions[currentQuestion].sentence)
          }
          className="inline-flex items-center px-4 py-2 text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
        >
          <Volume2 className="w-5 h-5 mr-2" />
          ฟังประโยค
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {shuffledQuestions[currentQuestion].options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswerOptionClick(option)}
            className="w-full p-4 text-left text-lg bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-lg transition-colors duration-200 hover:border-blue-300"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-12">
      {isLoading && renderLoading()}
      {!isLoading && showScore && renderScore()}
      {!isLoading && !showScore && renderQuestion()}
    </div>
  );
};

export default Quiz;
