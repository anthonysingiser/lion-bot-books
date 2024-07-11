import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to LionBot Books</h1>
      <Link href="/create-book" className="mt-5 text-xl text-blue-600">
        Make a Book
      </Link>
    </div>
  );
}