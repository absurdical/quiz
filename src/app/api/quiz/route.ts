import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
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

  // Search for popular artists (broad query)
  const artistRes = await fetch(
    `https://api.spotify.com/v1/search?q=a&type=artist&market=US&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const artistData = await artistRes.json();
  const artists = (artistData.artists?.items || []).filter(
  (artist: { popularity: number }) => artist.popularity >= 60
);

  if (artists.length < 4) {
    return NextResponse.json(
      { error: 'Not enough popular artists found' },
      { status: 404 }
    );
  }

  const shuffledArtists = artists.sort(() => 0.5 - Math.random()).slice(0, 10);

  const artistAlbums = await Promise.all(
    shuffledArtists.map(async (artist: { id: string }) => {

      try {
        const albumRes = await fetch(
          `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=album&market=US&limit=20`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const albums = (await albumRes.json()).items || [];
        if (albums.length === 0) return null;

        const album = albums.find((a: { images?: { url: string }[] }) => a.images?.[0]?.url);
        if (!album) return null;

        return { artist, album };
      } catch {
        return null;
      }
    })
  );

  const validAlbums = artistAlbums.filter(Boolean).slice(0, 4);

  if (validAlbums.length < 4) {
    return NextResponse.json(
      { error: 'Could not find enough valid albums' },
      { status: 404 }
    );
  }

  const shuffled = validAlbums.sort(() => 0.5 - Math.random());
  const correct = shuffled[0];
  const correctAnswer = `${correct.artist.name} - ${correct.album.name}`;
  const distractors = shuffled.slice(1).map(
    entry => `${entry.artist.name} - ${entry.album.name}`
  );

  const allOptions = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());

  return NextResponse.json({
    albumCover: correct.album.images?.[0]?.url ?? '',
    correctAnswer,
    options: allOptions,
  });
}
