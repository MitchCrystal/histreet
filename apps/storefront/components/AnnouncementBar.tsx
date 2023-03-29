export default function AnnouncementBar({ backgroundColour }: {backgroundColour: string}) {
  return (
    <div className="text-white text-sm p-3 text-center" style={{backgroundColor: backgroundColour}}>
      Fast shipping UK wide!
    </div>
  );
}
