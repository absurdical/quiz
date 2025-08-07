// src/app/api/quiz/route.ts
import { genreClusters } from '@/utils/genreClusters';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const genre = req.nextUrl.searchParams.get('genre') || 'Rock';
  const decade = req.nextUrl.searchParams.get('decade') || '90s';

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'Missing Spotify credentials' },
      { status: 500 }
    );
  }

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!tokenRes.ok) {
    const error = await tokenRes.text();
    return NextResponse.json({ error }, { status: 500 });
  }

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  const subgenres = genreClusters[genre] || [genre];
  const chosenGenre = subgenres[Math.floor(Math.random() * subgenres.length)];
  const query = `${chosenGenre} year:${mapDecadeToYears(decade)}`;
  const searchRes = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await searchRes.json();
  const albums = data.albums?.items || [];

  if (albums.length < 4) {
    return NextResponse.json(
      { error: 'Not enough albums found' },
      { status: 404 }
    );
  }

  const correct = albums[Math.floor(Math.random() * albums.length)];
  const correctAnswer = `${correct.artists[0].name} - ${correct.name}`;

  const distractors = (albums as {
  id: string;
  name: string;
  artists: { name: string }[];
}[])
  .filter((a) => a.id !== correct.id && a.artists[0].name !== correct.artists[0].name)
  .sort(() => 0.5 - Math.random())
  .slice(0, 3)
  .map((a) => `${a.artists[0].name} - ${a.name}`);


  const allOptions = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());

  return NextResponse.json({
    albumCover: correct.images?.[0]?.url ?? '',
    correctAnswer,
    options: allOptions,
  });
}

function mapDecadeToYears(decade: string): string {
  switch (decade) {
    case '60s':
      return '1960-1969';
    case '70s':
      return '1970-1979';
    case '80s':
      return '1980-1989';
    case '90s':
      return '1990-1999';
    case '00s':
      return '2000-2009';
    case '10s':
      return '2010-2019';
    case '20s':
      return '2020-2025';
    default:
      return '1970-2025';
  }
}
