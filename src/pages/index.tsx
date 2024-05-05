import { useState, useEffect } from 'react';
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
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }
  const handleBackClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="pb-4">
        <Book book={book} currentIndex={currentIndex} />
      </div>
      <NavigationButtons handleBackClick={handleBackClick} handleNextClick={handleNextClick} />
    </div>
  );
} 