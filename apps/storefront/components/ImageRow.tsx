type Image = {
  image_id: string;
  image_url: string;
  image_alt: string;
};

export default function ImageRow({
  images,
  setCurrentImage,
  currentImage,
}: {
  images: Image[];
  setCurrentImage: React.Dispatch<React.SetStateAction<Image>>;
  currentImage: { id: string; image: string };
}) {
  return (
    <div className="flex items-center justify-start gap-2 overflow-y-auto">
      {images.map((item) => (
        <img
          key={item.image_id}
          src={item.image_url}
          alt={item.image_id}
          width="50px"
          height="50px"
          className={`h-[65px] w-[65px] cursor-pointer hover:border-2 border-gray-500 ${
            currentImage.id === item.image_id && 'border-2 border-gray-500'
          }`}
          onClick={() => setCurrentImage(item)}
        />
      ))}
    </div>
  );
}
