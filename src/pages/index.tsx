import 'dotenv/config';
import { Poor_Story } from 'next/font/google';
import { OpenAI } from 'openai';

export async function getServerSideProps() {

    const firstTenFryWords = ['a', 'about', 'all', 'am', 'an', 'and', 'are', 'as', 'at', 'be',]

    const animals = ['unicorn', 'chipmunk', 'squirrel', 'dog', 'puppy', 'kitten', 'cat', 'fox', 'bat', 'mouse', 'robin', 'horse', 'cow', 'pig', 'duck', 'goose', 'gecko', 'goat', 'giraffe', 'aardvark', 'beaver', 'elephant', 'otter', 'penguin', 'fly', 'grasshopper', 'frog']

    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const mainCharacter = animals[Math.floor(Math.random() * animals.length)]

    async function createStory(choiceWords: string[], mainCharacter: string){
      const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `create ten sentences that use these words:${firstTenFryWords}. make the sentences primarily made from these words. each sentence will be slight variations on the first sentence generated. The sentences together will tell a story focusing on the thoughts and feelings of a ${mainCharacter}. The story needs a central conflict, that is resolved by the end.`}],
        model: 'gpt-3.5-turbo',
      });

      return response.choices[0].message.content;

    }
  

    async function generateImage(prompt: string, animal: string) {
      const image = await openai.images.generate({
          model: "dall-e-3", 
          prompt: `${prompt} in the style of a children's book illustration. The main character of the image is a ${animal}`,
      });
      return image.data[0].url;
    }

    async function createBook(){

      let storyArray: string[] = []
      createStory(firstTenFryWords, mainCharacter).then((story) => {
        storyArray = story.split('.').filter((sentence) => {
          return !/[0-9\n]/.test(sentence);
        })
        return storyArray
      }).then((storyArray) => {
        generateImage(storyArray[0], mainCharacter).then((image) => {
          return {story: storyArray[0], image: image}
        })
      })
    }

   return createBook().then((book) => {
      {
        props: {
          story: book.story,
          image: book.image
        }
      }
    })
}

export default function Home({ story }: { story: string }) {
  return (
    <div>
      <h1>Index.tsx</h1>
      <p>{story}</p>
    </div>
  );
}