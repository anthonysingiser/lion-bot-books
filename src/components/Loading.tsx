export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen" aria-live="polite">
      <div className="animate-bounce h-12 w-12 bg-purple-500 p-3 rounded-full"></div>
      <p className="mt-4 text-lg text-purple-700">Making book...</p>
    </div>
  );
}