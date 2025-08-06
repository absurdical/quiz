type DecadeSelectProps = {
  decade: string;
  onChange: (decade: string) => void;
};

const decades = ['60s', '70s', '80s', '90s', '00s', '10s', '20s'];

export default function DecadeSelect({ decade, onChange }: DecadeSelectProps) {
  return (
    <div className="relative">
      <label className="block text-sm mb-1 text-gray-400">Decade</label>
      <select
        value={decade}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-gray-800 text-white py-2 px-4 pr-10 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
      >
        {decades.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
}
