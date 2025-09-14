// import React, { useState, useEffect } from 'react';
// import './App.css';

// function App() {
//   const [text, setText] = useState('');
//   const [summary, setSummary] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [wordCount, setWordCount] = useState(130);

//   const handleSubmit = async () => {
//     if (!text.trim()) {
//       setError('Please provide text to summarize');
//       return;
//     }
//     setError('');
//     setSummary('');
//     setIsLoading(true);

//     try {
//       const response = await fetch('http://localhost/api/summarize', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text, word_count: wordCount }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setSummary(data.summary);
//       } else {
//         setError(data.detail || 'An error occurred');
//       }
//     } catch (err) {
//       setError('Failed to connect to the server');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const clearInput = () => {
//     setText('');
//     setSummary('');
//     setError('');
//     setWordCount(130);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-2xl font-bold mb-4 text-gray-800">Text Summarization App</h1>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <div className="mb-4">
//             <input
//               type="number"
//               className="w-32 p-2 border rounded"
//               value={wordCount}
//               onChange={(e) => setWordCount(parseInt(e.target.value) || 130)}
//               placeholder="Word count"
//             />
//           </div>
//           <div className="flex items-center mb-4">
//             <textarea
//               className="flex-1 p-3 border rounded-l-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows="5"
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               placeholder="Enter an article to summarize..."
//               onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
//             />
//             <button
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-r-lg disabled:bg-blue-300"
//               onClick={handleSubmit}
//               disabled={isLoading || !text.trim()}
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                 />
//               </svg>
//             </button>
//           </div>
//           <button
//             className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
//             onClick={clearInput}
//           >
//             Clear
//           </button>
//           {isLoading && (
//             <div className="mt-4 text-gray-600">
//               Generating summary...
//             </div>
//           )}
//           {error && (
//             <div className="mt-4 text-red-600">
//               Error: {error}
//             </div>
//           )}
//           {summary && (
//             <div className="mt-4">
//               <h2 className="text-xl font-semibold text-gray-800">Summary:</h2>
//               <p className="p-3 bg-gray-100 rounded-lg">{summary}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import './App.css';
import languages from './languages'; 

function App() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [wordCount, setWordCount] = useState(100);
  const [language , setLanguage] = useState('English');

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError('Please provide text to summarize');
      return;
    }
    setError('');
    setSummary('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, word_count: wordCount, language }),
      });

      const data = await response.json();
      if (response.ok) {
        setSummary(data.summary);
      } else {
        setError(data.detail || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  const clearInput = () => {
    setText('');
    setSummary('');
    setError('');
    setWordCount(100);
    setLanguage('English');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
          🌍 Cross-Lingual Text Summarization
        </h1>

        {/* Card Container */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Word Count
              </label>
              <input
                type="number"
                className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={wordCount}
                onChange={(e) => setWordCount(parseInt(e.target.value) || 100)}
                placeholder="Word count"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Language
              </label>
              <div className="relative">
                <select
                  className="w-full p-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-800 
                            focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition
                            appearance-none"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {languages.map((lang, index) => (
                    <option key={index} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                {/* Custom Dropdown Arrow */}
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  ▼
                </span>
              </div>
            </div>

          </div>

          {/* Text Area */}
          <div className="mb-6">
            <textarea
              className="w-full p-4 border rounded-xl shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              rows="7"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your article here..."
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mb-6">
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white font-medium px-5 py-2 rounded-lg shadow transition"
              onClick={clearInput}
            >
              🗑️ Clear
            </button>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition disabled:bg-indigo-300 flex items-center gap-2"
              onClick={handleSubmit}
              disabled={isLoading || !text.trim()}
            >
              🚀 Summarize
            </button>
          </div>

          {/* Status Messages */}
          {isLoading && (
            <div className="mt-4 text-indigo-600 font-medium animate-pulse">
              ✨ Generating summary...
            </div>
          )}
          {error && (
            <div className="mt-4 text-red-600 font-semibold">
              ⚠️ Error: {error}
            </div>
          )}

          {/* Summary */}
          {summary && (
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                📖 Summary:
              </h2>
              <p className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-gray-700 leading-relaxed shadow-sm">
                {summary}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;