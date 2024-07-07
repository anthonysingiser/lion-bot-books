import React, { useState, useEffect, useCallback } from 'react';
import createBook from '../utils/api';
import Loading from '../components/Loading';
import Book from '../components/Book';
import NavigationButtons from '../components/NavigationButtons';

// Extract the book type into its own type for reusability and clarity
type BookType = { story: string, image: string };

// Adjust the Home component for client-side rendering
export default function Home() {
  const [book, setBook] = useState<BookType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const fetchedBook = await createBook();
        setBook(fetchedBook);
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error(error);
        setError('Failed to fetch book');
        setLoading(false);
      }
    };

    fetchBook();
  }, []);

  const handleIndexChange = useCallback((change: number) => {
    try {
      if (!Array.isArray(book) || book.length === 0) {
        throw new Error("Book is not in the expected format or is empty.");
      }
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + change;
        if (newIndex >= 0 && newIndex < book.length) {
          return newIndex;
        }
        return prevIndex;
      });
    } catch (error) {
      console.error(error);
      setError('An error occurred while changing the index.');
    }
  }, [book]);

  const progress = book.length ? Math.round(((currentIndex + 1) / book.length)) * 100 : 0;

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Book book={book} currentIndex={currentIndex} />
      <NavigationButtons 
        handleBackClick={() => handleIndexChange(-1)} 
        handleNextClick={() => handleIndexChange(1)}
        progress={progress} 
      />
    </div>
  );
}