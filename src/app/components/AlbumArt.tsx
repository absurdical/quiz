'use client';

import Image from 'next/image';

type AlbumArtProps = {
  imageUrl: string;
};

export default function AlbumArt({ imageUrl }: AlbumArtProps) {
  return (
    <div className="w-full max-w-xs mb-8">
      <Image
        src={imageUrl}
        alt="Album Cover"
        width={500}
        height={500}
        priority
        className="rounded-lg shadow-xl object-cover w-full h-auto"
      />
    </div>
  );
}
