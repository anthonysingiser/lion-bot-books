import Image from 'next/image';
import { useState } from 'react';


interface BookProps {
    book: { 
      story?: string, 
      image: string 
    }[];
    currentIndex: number;
  };

export default function Book({ book, currentIndex }: BookProps) {
  const currentBook = book[currentIndex];
  const [isLoading, setIsLoading] = useState(true)

  if (!currentBook) {
    return <div>Book content is not available.</div>;
  }

  const handleImageLoad = () => {
    setIsLoading(false); // Set loading to false when image is loaded
  };

  return (
    <div className= "flex flex-col items-center">
      <div className="flex justify-center w-full">
      {isLoading && <div>Loading image...</div>}
        <Image
          src={book[currentIndex].image}
          alt="book illustration"
          width={600}
          height={400}
          onLoad={handleImageLoad}
        />
      </div>
 <h2 className="text-4xl text-center font-bold text-blue-500 mt-8">
  {currentBook.story && currentBook.story.trim() !== "" ? currentBook.story : "THE END"}.
</h2>
    </div>
  );
}