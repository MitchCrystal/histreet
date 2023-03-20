export default function Footer() {
  return (
    <>
      <footer className="border-t border-gray-300 py-8 px-4">
        <div className="max-w-[1200px] m-auto">
          <p className="text-sm">
            {/* @TODO Insert dynamic email */}
            <span className="text-bold">Customer Support:</span>{' '}
            example@example.com
          </p>
        </div>
      </footer>
    </>
  );
}
