import Error from './Error';

type Image = {
  id: string;
  src: string;
  alt: string;
};

export default function ImageRow({
  images,
  setCurrentImage,
  currentImage,
}: {
  images: Image[];
  setCurrentImage: React.Dispatch<React.SetStateAction<Image>>;
  currentImage: { id: string; alt: string; src: string };
}) {
  return (
    <div className="flex items-center justify-start gap-2 overflow-y-auto">
      {images &&
        images.map((item) => (
          <img
            key={item.id}
            src={item.src}
            alt={item.alt}
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
