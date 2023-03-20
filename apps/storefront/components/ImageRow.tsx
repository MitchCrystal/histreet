export default function ImageRow({
  images,
  setCurrentImage,
  currentImage,
}: {
  images: { id: string; image: string }[];
  setCurrentImage: React.Dispatch<
    React.SetStateAction<{ id: string; image: string }>
  >;
  currentImage: { id: string; image: string };
}) {
  return (
    <div className="flex items-center justify-start gap-2 overflow-y-auto">
      {images.map((item) => (
        <img
          key={item.id}
          src={item.image}
          alt="Product 1"
          width="50px"
          height="50px"
          className={`h-[65px] w-[65px] cursor-pointer hover:border-2 border-gray-500 ${
            currentImage.id === item.id && 'border-2 border-gray-500'
          }`}
          onClick={() => setCurrentImage(item)}
        />
      ))}
    </div>
  );
}
