type AlbumArtProps = {
  imageUrl: string;
};

export default function AlbumArt({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full max-w-md">
      <img
        src={imageUrl}
        alt="Album Cover"
        className="w-full rounded-3xl shadow-xl mb-6"
      />
    </div>
  );
}