'use client';

import { useState, useEffect } from 'react';
import AlbumArt from './components/AlbumArt';
import AnswerOptions from './components/AnswerOptions';
import FilterSidebar from './components/FilterSidebar';
import { CheckCircle, Eye } from 'lucide-react';

export default function Home() {
  const [genre, setGenre] = useState<string | null>(null);
  const [decade, setDecade] = useState<string | null>(null);
  const [correct, setCorrect] = useState(3);
  const [viewed, setViewed] = useState(7);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const quizData = {
    albumCover:
      'https://upload.wikimedia.org/wikipedia/en/a/a6/Blink-182_-_Enema_of_the_State_cover.jpg',
    correctAnswer: 'Herbie Hancock - Head Hunters',
    options: [
      'Diana Krall - Love Scenes',
      'George Benson - Breezin’',
      'Herbie Hancock - Head Hunters',
      'Miles Davis - Kind of Blue',
    ],
  };

  const handleAnswerClick = (answer: string) => {
    setSelected(answer);
    setViewed((v) => v + 1);

    const correct = answer === quizData.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setCorrect((c) => c + 1);
    }
  };

  const fetchNextAlbum = () => {
    // Placeholder logic — replace with real fetch later
    setSelected(null);
    setIsCorrect(null);
    // Eventually update quizData here
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
    <main className="min-h-screen flex bg-gradient-to-br from-[#1f1f1f] to-[#141414] text-white">
      {/* Sidebar with filters under logo */}
      <aside className="hidden sm:block fixed left-4 top-20 w-44 font-mono space-y-6">
        <FilterSidebar
          selectedGenre={genre}
          onGenreChange={setGenre}
          selectedDecade={decade}
          onDecadeChange={setDecade}
        />
      </aside>

      {/* Fixed score badge */}
      <div className="fixed top-6 right-6 sm:top-8 sm:right-8 bg-white/10 backdrop-blur-md text-sm text-white px-4 py-2 rounded-xl shadow-lg font-mono flex items-center gap-3 z-40">
        <CheckCircle className="w-4 h-4 text-green-400" />
        {correct}
        <Eye className="w-4 h-4 text-blue-400" />
        {viewed}
      </div>

      {/* Main quiz content */}
      <div className="w-full pt-20 px-6 flex flex-col items-center">
        <AlbumArt imageUrl={quizData.albumCover} />

        <AnswerOptions
          options={quizData.options}
          correctAnswer={quizData.correctAnswer}
          selected={selected}
          onSelect={handleAnswerClick}
        />

        {/* Feedback & Next for incorrect answers */}
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
      </div>
    </main>
  );
}
