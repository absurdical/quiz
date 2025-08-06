type GenreSelectProps = {
  genre: string;
  onChange: (genre: string) => void;
};

const genres = ['Rock', 'Pop', 'Hip Hop', 'Country'];

export default function GenreSelect({ genre, onChange }: GenreSelectProps) {
  return (
    <div className="relative">
      <label className="block text-sm mb-1 text-gray-400">Genre</label>
      <select
        value={genre}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-gray-800 text-white py-2 px-4 pr-10 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
      >
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </div>
  );
}
