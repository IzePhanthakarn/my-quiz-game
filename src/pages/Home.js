import React from "react";
import { useNavigate } from "react-router-dom";
import { germanWords } from "../model/word";
import useAuthStatus from "../hooks/useAuthStatus";

function Home() {
  const { user } = useAuthStatus();
  const navigate = useNavigate();
  const handleStartGame = () => {
    if (!user) alert('โปรดเข้าสู่ระบบก่อนเริ่มทำแบบทดสอบ');
    navigate("/quiz");
  };

  return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            ยินดีต้อนรับสู่ Deutsch Quiz
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 mb-4">
              ภาษาเยอรมัน (Deutsch)
              เป็นภาษาที่มีความสวยงามและมีความสำคัญในยุโรปกลาง
              เป็นภาษาที่ใช้กันอย่างแพร่หลายในประเทศเยอรมนี ออสเตรีย
              สวิตเซอร์แลนด์ และอีกหลายประเทศ
              ภาษาเยอรมันยังเป็นภาษาทางการของสหภาพยุโรปและเป็นหนึ่งในภาษาที่มีการเรียนการสอนมากที่สุดในโลก
            </p>
            <p className="text-lg text-gray-600">
              การเรียนภาษาเยอรมันไม่เพียงแต่จะช่วยให้คุณสามารถสื่อสารได้ในหลายประเทศในยุโรป
              แต่ยังเป็นการเปิดประตูไปสู่โอกาสใหม่ๆ ทั้งในด้านการทำงาน การศึกษา
              และการท่องเที่ยว
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            ตัวอย่างคำภาษาเยอรมัน 20 คำ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {germanWords.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-semibold text-blue-600">
                    {item.word}
                  </span>
                  <span className="text-lg text-gray-600">
                    {item.translation}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{item.example}</p>
                <p className="text-gray-600 italic text-sm">
                  {item.sentenceTranslation}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-8 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              พร้อมทดสอบความรู้ของคุณแล้วหรือยัง?
            </h3>
            <p className="text-blue-100 mb-8 text-lg">
              ทดสอบความเข้าใจคำศัพท์ภาษาเยอรมันของคุณด้วยแบบทดสอบสั้นๆ
            </p>
            <div className="space-x-4">
              <button
                onClick={handleStartGame}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-md"
              >
                เริ่มทำแบบทดสอบ
              </button>
            </div>
          </div>
        </div>
      </main>
  );
}

export default Home;
