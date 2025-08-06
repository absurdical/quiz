'use client';

import { useState } from 'react';
import AlbumArt from './components/AlbumArt';
import AnswerOptions from './components/AnswerOptions';

export default function Home() {
  const [genre, setGenre] = useState<string | null>(null);
  const [decade, setDecade] = useState<string | null>(null);
  const [correct, setCorrect] = useState(3);
  const [viewed, setViewed] = useState(7);
  const [selected, setSelected] = useState<string | null>(null);

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
    setViewed(viewed + 1);
    if (answer === quizData.correctAnswer) {
      setCorrect(correct + 1);
    }
  };

  return (
    <main className="min-h-screen flex bg-[#1f1f1f]">
      {/* Sidebar directly under the logo */}
      <aside className="hidden sm:block fixed left-4 top-20 w-44 font-mono space-y-6">
        <div>
          <div className="text-xs text-gray-400 uppercase mb-2 pl-1">Genre</div>
          <div className="flex flex-wrap gap-2">
            {['Rock', 'Pop', 'Hip Hop', 'Country'].map((g) => (
              <button
                key={g}
                className={`px-3 py-1 rounded-lg text-sm transition bg-gray-800 hover:bg-indigo-600 ${
                  genre === g ? 'bg-indigo-600 font-bold' : ''
                }`}
                onClick={() => setGenre(genre === g ? null : g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-400 uppercase mb-2 pl-1">Decade</div>
          <div className="flex flex-wrap gap-2">
            {['60s', '70s', '80s', '90s', '00s', '10s', '20s'].map((d) => (
              <button
                key={d}
                className={`px-3 py-1 rounded-lg text-sm transition bg-gray-800 hover:bg-indigo-600 ${
                  decade === d ? 'bg-indigo-600 font-bold' : ''
                }`}
                onClick={() => setDecade(decade === d ? null : d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main quiz content area */}
      <div className="flex-1 sm:ml-56 pt-20 px-6 flex flex-col items-center">
        <div className="text-sm text-gray-400 self-end mb-2">
          Correct: {correct} / Viewed: {viewed}
        </div>
        <AlbumArt imageUrl={quizData.albumCover} />
        <AnswerOptions
          options={quizData.options}
          correctAnswer={quizData.correctAnswer}
          selected={selected}
          onSelect={handleAnswerClick}
        />
      </div>
    </main>
  );
}
