import Image from 'next/image';

type BookProps = {
    book: { story: string, image: string }[];
    currentIndex: number;
  };

export default function Book({ book, currentIndex }: BookProps) {
  return (
    <div>
      <Image
        src={book[currentIndex].image}
        alt="book illustration"
        width={600}
        height={400}
      />
      <h2 className="text-4xl text-center font-bold text-blue-500 mt-8">
        {book[currentIndex].story}.
      </h2>
    </div>
  );
}