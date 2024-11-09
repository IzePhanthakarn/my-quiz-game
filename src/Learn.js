// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Learn = () => {
//   const navigate = useNavigate();

//   const handleStartGame = () => {
//     navigate("/quiz");
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h1 style={styles.title}>Learn Basic German</h1>
//         <p style={styles.subtitle}>
//           Enhance your knowledge with these basic questions!
//         </p>
//       </div>
//       <div style={styles.content}>
//         <div style={styles.infoContainer}>
//           <h3 style={styles.question}>1. What does 'Hallo' mean in German?</h3>
//           <p style={styles.answer}>
//             Answer: 'Hallo' means 'Hello' in German. It is a common greeting
//             used throughout the day.
//           </p>

//           <h3 style={styles.question}>
//             2. How do you say 'Thank you' in German?
//           </h3>
//           <p style={styles.answer}>
//             Answer: 'Danke' is the German word for 'Thank you'. It is used to
//             show gratitude.
//           </p>

//           <h3 style={styles.question}>
//             3. What is the number 'two' in German?
//           </h3>
//           <p style={styles.answer}>
//             Answer: The number 'two' is 'Zwei' in German. It's the second number
//             in the basic counting sequence.
//           </p>

//           <h3 style={styles.question}>4. What does 'Guten Morgen' mean?</h3>
//           <p style={styles.answer}>
//             Answer: 'Guten Morgen' means 'Good morning' in German. It is used to
//             greet someone in the morning.
//           </p>

//           <h3 style={styles.question}>
//             5. How do you say 'Goodbye' in German?
//           </h3>
//           <p style={styles.answer}>
//             Answer: 'Auf Wiedersehen' is the German word for 'Goodbye'. It
//             literally translates to 'Until we see each other again'.
//           </p>

//           <h3 style={styles.question}>6. What is the color 'red' in German?</h3>
//           <p style={styles.answer}>
//             Answer: The color 'red' is 'Rot' in German.
//           </p>

//           <h3 style={styles.question}>
//             7. What is the German word for 'bread'?
//           </h3>
//           <p style={styles.answer}>
//             Answer: The German word for 'bread' is 'Brot'. It is a staple food
//             in Germany.
//           </p>

//           <h3 style={styles.question}>8. How do you say 'Please' in German?</h3>
//           <p style={styles.answer}>
//             Answer: 'Bitte' means 'Please' in German. It is used when making
//             requests or offering something.
//           </p>

//           <h3 style={styles.question}>9. What is 'one' in German?</h3>
//           <p style={styles.answer}>Answer: 'One' is 'Eins' in German.</p>

//           <h3 style={styles.question}>
//             10. What does 'Entschuldigung' mean in English?
//           </h3>
//           <p style={styles.answer}>
//             Answer: 'Entschuldigung' means 'Excuse me' in English. It is used
//             when you want to apologize or get someone's attention.
//           </p>
//         </div>

//         <div style={styles.buttonContainer}>
//           <button
//             onClick={handleStartGame}
//             style={styles.button}
//             onMouseEnter={(e) =>
//               (e.target.style.backgroundColor =
//                 styles.buttonHover.backgroundColor)
//             }
//             onMouseLeave={(e) =>
//               (e.target.style.backgroundColor = styles.button.backgroundColor)
//             }
//           >
//             Start Game
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//     backgroundColor: "#f0f4f8",
//     padding: "20px",
//     fontFamily: "'Roboto', sans-serif",
//   },
//   header: {
//     textAlign: "center",
//     marginBottom: "40px",
//     height: "auto",
//   },
//   title: {
//     fontSize: "36px",
//     color: "#333",
//     fontWeight: "bold",
//     borderBottom: "3px solid #007bff",
//     paddingBottom: "10px",
//     marginBottom: "15px",
//   },
//   subtitle: {
//     fontSize: "18px",
//     color: "#666",
//     marginTop: "10px",
//   },
//   content: {
//     backgroundColor: "#ffffff",
//     borderRadius: "12px",
//     boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
//     padding: "30px",
//     maxWidth: "700px",
//     width: "100%",
//     height: "auto",
//     overflowY: "auto",
//     borderTop: "5px solid #007bff",
//   },
//   infoContainer: {
//     marginBottom: "30px",
//   },
//   question: {
//     fontSize: "20px",
//     color: "#007bff",
//     marginBottom: "5px",
//     fontWeight: "500",
//   },
//   answer: {
//     fontSize: "16px",
//     color: "#555",
//     marginBottom: "20px",
//     lineHeight: "1.6",
//     backgroundColor: "#f9f9f9",
//     padding: "10px",
//     borderRadius: "5px",
//   },
//   buttonContainer: {
//     display: "flex",
//     justifyContent: "center",
//     marginTop: "20px",
//   },
//   button: {
//     padding: "12px 24px",
//     fontSize: "18px",
//     backgroundColor: "#28a745",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     transition: "background-color 0.3s ease",
//   },
//   buttonHover: {
//     backgroundColor: "#218838",
//   },
// };

// export default Learn;

import React from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const germanWords = [
    {
      word: "Hallo",
      example: "Hallo, wie geht's?",
      translation: "สวัสดี",
      sentenceTranslation: "สวัสดี, สบายดีไหม?",
    },
    {
      word: "Danke",
      example: "Danke für deine Hilfe.",
      translation: "ขอบคุณ",
      sentenceTranslation: "ขอบคุณสำหรับความช่วยเหลือของคุณ",
    },
    {
      word: "Ja",
      example: "Ja, ich verstehe.",
      translation: "ใช่",
      sentenceTranslation: "ใช่, ฉันเข้าใจ",
    },
    {
      word: "Nein",
      example: "Nein, das ist nicht richtig.",
      translation: "ไม่",
      sentenceTranslation: "ไม่, นั่นไม่ถูกต้อง",
    },
    {
      word: "Entschuldigung",
      example: "Entschuldigung, wo ist der Bahnhof?",
      translation: "ขอโทษ",
      sentenceTranslation: "ขอโทษ, สถานีรถไฟอยู่ที่ไหน?",
    },
    {
      word: "Guten Morgen",
      example: "Guten Morgen! Wie geht's?",
      translation: "สวัสดีตอนเช้า",
      sentenceTranslation: "สวัสดีตอนเช้า! สบายดีไหม?",
    },
    {
      word: "Gute Nacht",
      example: "Gute Nacht, träum schön!",
      translation: "ราตรีสวัสดิ์",
      sentenceTranslation: "ราตรีสวัสดิ์, ฝันดี!",
    },
    {
      word: "Tschüss",
      example: "Tschüss, bis später!",
      translation: "บ๊ายบาย",
      sentenceTranslation: "บ๊ายบาย, แล้วเจอกันใหม่!",
    },
    {
      word: "Wie viel?",
      example: "Wie viel kostet das?",
      translation: "เท่าไหร่?",
      sentenceTranslation: "มันราคาเท่าไหร่?",
    },
    {
      word: "Wasser",
      example: "Ich trinke Wasser.",
      translation: "น้ำ",
      sentenceTranslation: "ฉันดื่มน้ำ",
    },
    {
      word: "Freund",
      example: "Er ist mein bester Freund.",
      translation: "เพื่อน",
      sentenceTranslation: "เขาคือเพื่อนที่ดีที่สุดของฉัน",
    },
    {
      word: "Essen",
      example: "Ich habe Hunger, lass uns essen gehen.",
      translation: "กิน",
      sentenceTranslation: "ฉันหิว, ไปกินข้าวกันเถอะ",
    },
    {
      word: "Haus",
      example: "Ich wohne in einem großen Haus.",
      translation: "บ้าน",
      sentenceTranslation: "ฉันอาศัยอยู่ในบ้านหลังใหญ่",
    },
    {
      word: "Arbeit",
      example: "Ich muss morgen arbeiten.",
      translation: "ทำงาน",
      sentenceTranslation: "ฉันต้องทำงานพรุ่งนี้",
    },
    {
      word: "Schule",
      example: "Die Schule beginnt um 8 Uhr.",
      translation: "โรงเรียน",
      sentenceTranslation: "โรงเรียนเริ่มตอน 8 โมง",
    },
    {
      word: "Buch",
      example: "Ich lese ein interessantes Buch.",
      translation: "หนังสือ",
      sentenceTranslation: "ฉันอ่านหนังสือที่น่าสนใจ",
    },
    {
      word: "Auto",
      example: "Mein Auto ist blau.",
      translation: "รถ",
      sentenceTranslation: "รถของฉันสีน้ำเงิน",
    },
    {
      word: "Hund",
      example: "Der Hund läuft im Park.",
      translation: "สุนัข",
      sentenceTranslation: "สุนัขวิ่งในสวนสาธารณะ",
    },
    {
      word: "Katze",
      example: "Die Katze schläft auf dem Sofa.",
      translation: "แมว",
      sentenceTranslation: "แมวหลับอยู่บนโซฟา",
    },
    {
      word: "Freude",
      example: "Ich empfinde große Freude.",
      translation: "ความสุข",
      sentenceTranslation: "ฉันรู้สึกมีความสุขมาก",
    },
  ];

  const navigate = useNavigate();
  const handleStartGame = () => {
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
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
              <button onClick={handleStartGame} className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-md">
                เริ่มทำแบบทดสอบ
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
