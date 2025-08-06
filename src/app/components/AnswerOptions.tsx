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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mt-4">
      {options.map((option) => {
        const isCorrect = option === correctAnswer;
        const isSelected = option === selected;

        let baseStyles =
          'w-full p-4 rounded-2xl text-sm font-semibold transition transform shadow-md focus:outline-none';
        let stateStyles = '';

        if (selected == null) {
          stateStyles =
            'bg-gray-800 hover:bg-gray-700 hover:scale-[1.02] hover:ring-2 hover:ring-indigo-400';
        } else if (isSelected) {
          stateStyles = isCorrect
            ? 'bg-green-600 scale-[1.02]'
            : 'bg-red-600 scale-[1.02]';
        } else {
          stateStyles = 'bg-gray-700 opacity-60';
        }

        return (
          <button
            key={option}
            className={`${baseStyles} ${stateStyles}`}
            onClick={() => onSelect(option)}
            disabled={selected !== null}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
