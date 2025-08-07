'use client';

import React from 'react';
import { genreClusters } from '@/utils/genreClusters';

interface FilterSidebarProps {
  selectedGenre: string;
  selectedDecade: string;
  onGenreChange: (genre: string) => void;
  onDecadeChange: (decade: string) => void;
}

const genreDisplayMap: Record<string, string> = {
  Rock: 'Rock',
  Pop: 'Pop',
  Metal: 'Metal',
  HipHop: 'Hip Hop',
  Electronic: 'Electronic',
  Jazz: 'Jazz',
  Classical: 'Classical',
  RnB_Soul: 'R&B / Soul',
  Country: 'Country',
  Latin: 'Latin',
  Reggae: 'Reggae',
  Folk: 'Folk',
  World: 'World',
  Chill: 'Chill / Ambient',
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedGenre,
  selectedDecade,
  onGenreChange,
  onDecadeChange,
}) => {
  const genres = Object.keys(genreClusters);
  const decades = ['60s', '70s', '80s', '90s', '2000s', '2010s', '2020s'];

  return (
    <div className="flex flex-col gap-6 text-sm">
      {/* Genre Filter */}
      <div>
        <p className="font-semibold mb-2 text-white">Genre</p>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreChange(genre)}
              className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
                selectedGenre === genre
                  ? 'bg-green-500 text-white border-green-500 shadow-md'
                  : 'border-gray-600 text-gray-200 hover:bg-gray-700'
              }`}
            >
              {genreDisplayMap[genre] || genre}
            </button>
          ))}
        </div>
      </div>

      {/* Decade Filter */}
      <div>
        <p className="font-semibold mb-2 text-white">Decade</p>
        <div className="flex flex-wrap gap-2">
          {decades.map((decade) => (
            <button
              key={decade}
              onClick={() => onDecadeChange(decade)}
              className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
                selectedDecade === decade
                  ? 'bg-green-500 text-white border-green-500 shadow-md'
                  : 'border-gray-600 text-gray-200 hover:bg-gray-700'
              }`}
            >
              {decade}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
