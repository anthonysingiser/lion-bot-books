import Image from 'next/image';
import { useState } from 'react';
import createBook from '../utils/api';

export async function getServerSideProps() {

    try {
      const book = await createBook();
      return { props: {book} };
    } catch (error) {
      console.error(error);
      return { props: { story: '', image: '' } };
    }
}

export default function Home({ book }: { book: { story: string, image: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    if (currentIndex < book.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handleBackClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Image 
        src={book[currentIndex].image} 
        alt="book illustration" 
        width={600} 
        height={400}
      />
      <h2 className="text-4xl text-center font-bold text-blue-500 mt-8">
        {book[currentIndex].story}.
      </h2>
      <div className="flex mt-4">
        <button 
          className="mx-2 py-2 px-4 bg-blue-500 text-white rounded" 
          onClick={handleBackClick}
        >
          Back
        </button>
        <button 
          className="mx-2 py-2 px-4 bg-blue-500 text-white rounded" 
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
}