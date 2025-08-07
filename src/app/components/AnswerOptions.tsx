import React from 'react';

type AnswerOptionsProps = {
  options: string[];
  correctAnswer: string;
  selected: string | null;
  onSelect: (answer: string) => void;
};

export default function AnswerOptions({
  options,
  correctAnswer,
  selected,
  onSelect,
}: AnswerOptionsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl mt-6 px-2">
      {options.map((option, index) => {
        const isSelected = selected === option;
        const isCorrect = option === correctAnswer;
        const baseStyle = 'rounded-2xl px-4 py-3 shadow text-white font-semibold text-center transition-all';
        const wrapStyle = 'break-words line-clamp-2 leading-snug text-sm sm:text-base';
        const bgStyle = !selected
          ? 'bg-[#1f2a3a] hover:bg-[#2c3e50]'
          : isCorrect
          ? 'bg-green-600'
          : isSelected
          ? 'bg-red-600'
          : 'bg-[#1f2a3a] opacity-50';

        return (
          <button
            key={index}
            onClick={() => onSelect(option)}
            disabled={!!selected}
            className={`${baseStyle} ${wrapStyle} ${bgStyle}`}
            style={{ minHeight: '4.5rem', maxHeight: '5.5rem' }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
