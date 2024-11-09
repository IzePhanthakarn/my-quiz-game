import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/helper/supabaseClient";

const LeaderboardPage = () => {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const { data, error } = await supabase
          .from("leaderboard")
          .select("name, score")
          .order("score", { ascending: false });

        if (error) throw error;
        setScores(data || []);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error.message);
      }
    };

    fetchScores();
  }, []);

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Deutsch Quiz Leaderboard
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            ตารางแสดงคะแนนของผู้เล่นทั้งหมดเรียงตามคะแนนสูงสุด
            ทดสอบความรู้ของคุณและมาแข่งขันกับผู้เล่นคนอื่นๆ
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={handleBackToHome}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-md"
          >
            กลับไปหน้าแรก
          </button>

          <button
            onClick={handleStartQuiz}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition-colors duration-200 shadow-md"
          >
            เริ่มทำแบบทดสอบ
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {scores.length > 0 ? (
            <div className="overflow-hidden">
              <div className="border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                      <th className="px-6 py-4 text-center text-lg font-semibold text-white">
                        อันดับ
                      </th>
                      <th className="px-6 py-4 text-center text-lg font-semibold text-white border-x border-blue-400">
                        ชื่อผู้เล่น
                      </th>
                      <th className="px-6 py-4 text-center text-lg font-semibold text-white">
                        คะแนน
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {scores.map((result, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-gray-100 transition-colors duration-200`}
                      >
                        <td className="px-6 py-4 text-lg text-gray-900 font-medium text-center">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-lg text-gray-900 text-center border-x border-gray-200">
                          {result.name}
                        </td>
                        <td className="px-6 py-4 text-lg text-gray-900 text-center font-semibold">
                          {result.score}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 italic">
                ยังไม่มีข้อมูลคะแนนในขณะนี้
              </p>
              <p className="text-lg text-gray-500 mt-2">
                เริ่มทำแบบทดสอบเพื่อเป็นผู้เล่นคนแรก!
              </p>
            </div>
          )}
        </div>
      </main>
  );
};

export default LeaderboardPage;
