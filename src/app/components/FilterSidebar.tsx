type Props = {
  selectedGenre: string | null;
  onGenreChange: (g: string | null) => void;
  selectedDecade: string | null;
  onDecadeChange: (d: string | null) => void;
};

const genres = ['Rock', 'Pop', 'Hip Hop', 'Country'];
const decades = ['60s', '70s', '80s', '90s', '00s', '10s', '20s'];

export default function FilterSidebar({
  selectedGenre,
  onGenreChange,
  selectedDecade,
  onDecadeChange,
}: Props) {
  const base =
    'px-3 py-1 rounded-lg text-sm font-medium transition bg-gray-800 text-white hover:bg-indigo-600';
  const active = 'bg-indigo-600 text-white font-bold';

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs text-gray-400 uppercase mb-2 pl-1">Genre</div>
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => (
            <button
              key={g}
              className={`${base} ${selectedGenre === g ? active : ''}`}
              onClick={() => onGenreChange(selectedGenre === g ? null : g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs text-gray-400 uppercase mb-2 pl-1">Decade</div>
        <div className="flex flex-wrap gap-2">
          {decades.map((d) => (
            <button
              key={d}
              className={`${base} ${selectedDecade === d ? active : ''}`}
              onClick={() => onDecadeChange(selectedDecade === d ? null : d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
