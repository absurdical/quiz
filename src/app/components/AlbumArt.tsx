'use client';

import React from 'react';

interface AlbumArtProps {
  imageUrl: string;
  blurred?: boolean;
}

const AlbumArt: React.FC<AlbumArtProps> = ({ imageUrl, blurred = false }) => {
  return (
    <div className="w-full max-w-sm aspect-square rounded-xl overflow-hidden shadow-lg border border-white/10">
      <img
        src={imageUrl}
        alt="Album Cover"
        className={`w-full h-full object-cover transition duration-500 ${
          blurred ? 'blur-md scale-105 brightness-90' : ''
        }`}
      />
    </div>
  );
};

export default AlbumArt;
