import 'dotenv/config';
import { OpenAI } from 'openai';

export async function getServerSideProps() {

    const firstTenFryWords = ['a', 'about', 'all', 'am', 'an', 'and', 'are', 'as', 'at', 'be',]

    const animals = ['unicorn', 'chipmunk', 'squirrel', 'dog', 'puppy', 'kitten', 'cat', 'fox', 'bat', 'mouse', 'robin', 'horse', 'cow', 'pig', 'duck', 'goose', 'gecko', 'goat', 'giraffe', 'aardvark', 'beaver', 'elephant', 'otter', 'penguin', 'fly', 'grashopper', 'frog']

    const mainCharacter = animals[Math.floor(Math.random() * animals.length)]

    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
  
    const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `create ten sentences that use these words:${firstTenFryWords}. make the sentences primarily made from these words. each sentence will be slight variations on the first sentence generated. The sentences together will tell a story focusing on the thoughts and feelings of a ${mainCharacter}. The story needs a central conflict, that is resolved by the end.`}],
        model: 'gpt-3.5-turbo',
    });
  
    const story = response.choices[0].message.content;

    const imageResponse = async function generateImage(prompt, animal) {
      const image = await openai.images.generate({
          model: "dall-e-3", 
          prompt: `${prompt} in the style of a children's book illustration. The main character of the image is a ${animal}`,
      });
      return image.data[0].url;
  }
  
    if (!story) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: { story }, 
    }
}

export default function Home({ story }: { story: string }) {
  return (
    <div>
      <h1>Index.tsx</h1>
      <p>{story}</p>
    </div>
  );
}