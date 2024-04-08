import Image from 'next/image';
import createBook from '../utils/api';

export async function getServerSideProps() {

    try {
      const book = await createBook();
      return { props: { story: book.story, image: book.image } };
    } catch (error) {
      console.error(error);
      return { props: { story: '', image: '' } };
    }
}

export default function Home({ story, image }: { story: string, image: string }) {
  return (
    <div>
      <Image src={image} alt="book illustration" width={600} height={400}/>
      <h2>{story}.</h2>
    </div>
  );
}