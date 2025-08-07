'use client';

import { useEffect, useState } from 'react';
import AlbumArt from './components/AlbumArt';
import AnswerOptions from './components/AnswerOptions';
import FilterSidebar from './components/FilterSidebar';
import { CheckCircle, Eye } from 'lucide-react';

type QuizData = {
  albumCover: string;
  correctAnswer: string;
  options: string[];
};

export default function Home() {
  const [genre, setGenre] = useState<string>('Rock');
  const [decade, setDecade] = useState<string>('90s');
  const [correct, setCorrect] = useState(0);
  const [viewed, setViewed] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Set --vh for dynamic viewport height
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  const fetchNextAlbum = async () => {
    setLoading(true);
    setSelected(null);
    setIsCorrect(null);

    try {
      const res = await fetch(`/api/quiz?genre=${genre}&decade=${decade}`);
      const data = await res.json();

      if (res.ok) {
        setQuizData({
          albumCover: data.albumCover,
          correctAnswer: data.correctAnswer,
          options: data.options,
        });
      } else {
        console.error('Quiz API error:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNextAlbum();
  }, []);

  useEffect(() => {
    if (selected === null) {
      fetchNextAlbum();
    }
  }, [genre, decade]);

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
  }, [selected, isCorrect]);

  return (
    <main
      className="flex bg-gradient-to-br from-[#1f1f1f] to-[#141414] text-white"
      style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
    >
      {/* Sidebar filters */}
      <aside className="hidden sm:block fixed left-4 top-20 w-44 font-mono space-y-6">
        <FilterSidebar
          selectedGenre={genre}
          onGenreChange={setGenre}
          selectedDecade={decade}
          onDecadeChange={setDecade}
        />
      </aside>

      {/* Score badge HUD */}
      <div className="fixed top-6 right-6 sm:top-8 sm:right-8 bg-white/10 backdrop-blur-md text-sm text-white px-4 py-2 rounded-xl shadow-lg font-mono flex items-center gap-3 z-40">
        <CheckCircle className="w-4 h-4 text-green-400" />
        {correct}
        <Eye className="w-4 h-4 text-blue-400" />
        {viewed}
      </div>

      {/* Main quiz content */}
      <div className="flex-1 w-full pt-20 px-6 flex flex-col items-center">
        {loading || !quizData ? (
          <p className="text-gray-400 mt-32 text-sm">Loading album...</p>
        ) : (
          <>
            <AlbumArt imageUrl={quizData.albumCover} />
            <div style={{ paddingBottom: 'calc(var(--vh, 1vh) * 10)' }}>
              <AnswerOptions
                options={quizData.options}
                correctAnswer={quizData.correctAnswer}
                selected={selected}
                onSelect={handleAnswerClick}
              />
            </div>
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
    </main>
  );
}
