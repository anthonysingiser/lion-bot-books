import { useState, useEffect } from 'react';
import React, { useCallback } from 'react';
import createBook from '../utils/api';
import Loading from '../components/Loading';
import Book from '../components/Book';
import NavigationButtons from '../components/NavigationButtons';

export async function getServerSideProps() {
  try {
    const book = await createBook();
    return { props: { book } };
  } catch (error) {
    console.error(error);
    return { props: { story: '', image: '' } };
  }
}

// Extract the book type into its own type for reusability and clarity
type BookType = { story: string, image: string };

// Use this type in the Home component props
type HomeProps = { book: BookType[] };

export default function Home({ book }: HomeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use the presence of 'book' to set the initial loading state
  const [loading, setLoading] = useState(!book);

  useEffect(() => {
    // If 'book' is present, set loading to false
    if (book) {
      setLoading(false);
    }
  }, [book]);

  // Create a general function to handle index changes
  const handleIndexChange = useCallback((change: number) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + change;
      // Ensure the new index is within the valid range
      if (newIndex >= 0 && newIndex < book.length) {
        return newIndex;
      }
      // If not, return the previous index
      return prevIndex;
    });
  }, [book.length]);

  // Use the general function for next and back clicks
  const handleNextClick = useCallback(() => handleIndexChange(1), [handleIndexChange]);
  const handleBackClick = useCallback(() => handleIndexChange(-1), [handleIndexChange]);

  const progress = ((currentIndex + 1) / book.length) * 100;

  if (loading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="pb-4">
        <Book book={book} currentIndex={currentIndex} />
      </div>
      <NavigationButtons 
        handleBackClick={handleBackClick} 
        handleNextClick={handleNextClick}
        progress={progress}
      />
    </div>
  );
}
