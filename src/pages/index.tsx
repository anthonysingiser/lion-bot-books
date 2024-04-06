import {openai} from '../projectKey'
import {animals, firstTenFryWords} from '../data';
import Image from 'next/image';

export async function getServerSideProps() {

    const mainCharacter = animals[Math.floor(Math.random() * animals.length)]

    async function createStory(choiceWords: string[], mainCharacter: string): Promise<string>{
      const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `create ten sentences that use these words:${choiceWords}. make the sentences primarily made from these words. each sentence will be slight variations on the first sentence generated. The sentences together will tell a story focusing on the thoughts and feelings of a ${mainCharacter}. The story needs a central conflict, that is resolved by the end.`}],
        model: 'gpt-3.5-turbo',
      });

      if (response.choices[0]?.message.content){
        return response.choices[0].message.content;
      } else {
        throw new Error("Story content is undefined");
      }
    }

    async function generateImage(prompt: string, animal: string): Promise<string> {
      const image = await openai.images.generate({
          model: "dall-e-3", 
          prompt: `${prompt} in the style of a children's book illustration. The main character of the image is a ${animal}`,
      });
    
      if (image.data[0]?.url) {
        return image.data[0].url;
      } else {
        throw new Error("Image URL is undefined");
      }
    }

    async function createBook(): Promise<{story: string, image: string}> {
      try {
        let storyArray: string[] = [];
        const story = await createStory(firstTenFryWords, mainCharacter);
        storyArray = story.split('.').filter((sentence) => {
          return !/[0-9\n]/.test(sentence);
        });
    
        const image = await generateImage(storyArray[0], mainCharacter);
        return {story: storyArray[0], image: image};
      } catch (error) {
        console.error("Error creating book: ", error);
        throw error;
      }
    }

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
      <h1>Index.tsx</h1>
      <p>{story}</p>
      <Image src={image} alt="book illustration" width={500} height={300}/>
    </div>
  );
}