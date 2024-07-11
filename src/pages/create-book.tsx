import React,{ useState, useEffect, useCallback } from 'react';
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (book) {
      setLoading(false);
    }
  }, [book]);
  
  // a general function to handle index changes
  const handleIndexChange = useCallback((change: number) => {
    try {
      // Check if book is in the expected format
      if (!Array.isArray(book) || book.length === 0 || typeof(book) === 'undefined') {
        throw new Error("Book is not in the expected format or is empty.");
      }
  
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + change;
        // Ensure the new index is within the valid range
        if (newIndex >= 0 && newIndex < book.length) {
          return newIndex;
        }
        // If not, return the previous index
        return prevIndex;
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }, [book]);
  
  // general functions for next and back clicks
  const handleNextClick = useCallback(() => handleIndexChange(1), [handleIndexChange]);
  const handleBackClick = useCallback(() => handleIndexChange(-1), [handleIndexChange]);
  
  const progress = book ? Math.floor(((currentIndex + 1) / book.length) * 100): 0;
  
  if (loading) {
    return <Loading />
  }
  
  if (error) {
    return <div className="error">{error}</div>;
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
  )};