import Image from 'next/image';
import { useState, useEffect } from 'react';
import createBook from '../utils/api';

export async function getServerSideProps() {
  try {
    const book = await createBook();
    return { props: { book } };
  } catch (error) {
    console.error(error);
    return { props: { story: '', image: '' } };
  }
}

export default function Home({ book }: { book: { story: string, image: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (book) {
      setLoading(false);
    }
  }, [book]);

  const handleNextClick = () => {
    if (currentIndex < book.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }
  const handleBackClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-bounce h-12 w-12 bg-purple-500">
          making book...
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center">
        <button
          className="mx-2 py-2 px-4 bg-blue-500 text-white rounded"
          onClick={handleBackClick}
        >
          &#8592; {/* Left arrow symbol */}
        </button>
        <Image
          src={book[currentIndex].image}
          alt="book illustration"
          width={600}
          height={400}
        />
        <button
          className="mx-2 py-2 px-4 bg-blue-500 text-white rounded"
          onClick={handleNextClick}
        >
          &#8594; {/* Right arrow symbol */}
        </button>
      </div>
      <h2 className="text-4xl text-center font-bold text-blue-500 mt-8">
        {book[currentIndex].story}.
      </h2>
    </div>
  );
} 