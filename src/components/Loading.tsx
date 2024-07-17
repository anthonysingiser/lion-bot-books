
type LoadingProps = {
  progress?: number;
};

export default function Loading({ progress = 0 }: LoadingProps) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen" aria-live="polite">
      <div className="animate-bounce h-12 w-12 bg-purple-500 p-3 rounded-full"></div>
      <p className="mt-4 text-lg text-purple-700">Making book...</p>
      {/* Loading bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
        <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}