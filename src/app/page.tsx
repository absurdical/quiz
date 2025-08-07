'use client';

import { useCallback, useEffect, useState } from 'react';
import AlbumArt from './components/AlbumArt';
import { CheckCircle, Eye } from 'lucide-react';

type QuizData = {
  albumCover: string;
  correctAnswer: string;
  options: string[];
};

export default function Home() {
  const [correct, setCorrect] = useState(0);
  const [viewed, setViewed] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNextAlbum = useCallback(async () => {
    setLoading(true);
    setSelected(null);
    setIsCorrect(null);

    try {
      const res = await fetch(`/api/quiz`);
      const data = await res.json();

      if (res.ok) {
        setQuizData({
          albumCover: data.albumCover,
          correctAnswer: data.correctAnswer,
          options: data.options,
        });
      } else {
        console.error('Quiz API error:', data.error || 'Unknown error');
        setQuizData(null);
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNextAlbum();
  }, [fetchNextAlbum]);

  useEffect(() => {
    if (selected === null) {
      fetchNextAlbum();
    }
  }, [selected, fetchNextAlbum]);

  const handleAnswerClick = (answer: string) => {
    setSelected(answer);
    setViewed((v) => v + 1);
    const correct = answer === quizData?.correctAnswer;
    setIsCorrect(correct);
    if (correct) setCorrect((c) => c + 1);
  };

  useEffect(() => {
    if (selected && isCorrect) {
      const timer = setTimeout(() => {
        fetchNextAlbum();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [selected, isCorrect, fetchNextAlbum]);

  return (
    <main className="min-h-screen flex bg-gradient-to-br from-[#1f1f1f] to-[#141414] text-white">
      {/* Score HUD */}
      <div className="fixed top-6 right-6 sm:top-8 sm:right-8 bg-white/10 backdrop-blur-md text-sm text-white px-4 py-2 rounded-xl shadow-lg font-mono flex items-center gap-3 z-40">
        <CheckCircle className="w-4 h-4 text-green-400" />
        {correct}
        <Eye className="w-4 h-4 text-blue-400" />
        {viewed}
      </div>

      {/* Main quiz content */}
      <div className="flex-1 pt-20 px-4 flex justify-center">
        <div className="w-full max-w-3xl flex flex-col items-center pb-16">
          {loading || !quizData ? (
            <p className="text-gray-400 mt-32 text-sm">
              {loading
                ? 'Loading album...'
                : 'No quiz data available. Try refreshing.'}
            </p>
          ) : (
            <>
              <AlbumArt imageUrl={quizData.albumCover} />

              {/* Answer Buttons */}
              <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
                {quizData.options.map((option) => {
                  let bgColor = 'bg-white/10';
                  if (selected) {
                    if (option === quizData.correctAnswer) {
                      bgColor = 'bg-green-600';
                    } else if (option === selected) {
                      bgColor = 'bg-red-600';
                    }
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswerClick(option)}
                      disabled={!!selected}
                      className={`text-white text-center px-4 py-5 rounded-2xl shadow-md font-semibold transition ${bgColor}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Wrong answer feedback */}
              {selected && isCorrect === false && (
                <div className="mt-6 text-center space-y-3">
                  <p className="text-sm text-gray-300 italic">
                    💡 The correct answer was:{' '}
                    <span className="font-semibold text-white">
                      {quizData.correctAnswer}
                    </span>
                  </p>
                  <button
                    onClick={fetchNextAlbum}
                    className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded-xl shadow"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
