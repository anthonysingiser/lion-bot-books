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

  const handleClick = () => {
    if (currentIndex < book.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div>
      <Image src={book[currentIndex].image} alt="book illustration" width={600} height={400}/>
      <h2>{book[currentIndex].story}.</h2>
      <button onClick={handleClick}>Next</button>
    </div>
  );
}