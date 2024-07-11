import {openai} from '../projectKey';
import {animals, firstFiveFryWords} from '../data';

const mainCharacter = animals[Math.floor(Math.random() * animals.length)]

async function createStory(choiceWords: string[], mainCharacter: string): Promise<string>{
  const response = await openai.chat.completions.create({
    messages: [{ role: 'user', content: `create ten sentences that use these words:${choiceWords}. Make the sentences primarily made from these words. Each sentence will end with a period. Together they will tell a story focusing on the thoughts and feelings of a ${mainCharacter}. The story needs a central conflict outside of the main character that is resolved by the end of the story. The story needs a positive moral or lesson that isn't spelled out.`}],
    model: 'gpt-3.5-turbo',
  });

  if (response.choices[0]?.message.content){
    return response.choices[0].message.content;
  } else {
    throw new Error("Story content is undefined");
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateImage(prompt: string, animal: string): Promise<string> {
  await delay(12000); // Wait for 12 seconds

  const image = await openai.images.generate({
      model: "dall-e-3", 
      prompt: `Draw an image of what the following sentence in quotes describes: "${prompt}". The main character of the image is a ${animal}.The image should be in an art style fitting the sentece. Do not include the text, or any text, in the image you generate.`,
  });

  if (image.data[0]?.url) {
    return image.data[0].url;
  } else {
    throw new Error("Image URL is undefined");
  }
}

export default async function createBook(): Promise<{story: string, image: string}[]> {
  try {
    let storyArray: string[] = [];
    const story = await createStory(firstFiveFryWords, mainCharacter);
    storyArray = story.split('.').filter((sentence) => {
      return !/[0-9\n]/.test(sentence);
    });

    const book = [];
    for (const sentence of storyArray) {
      const image = await generateImage(sentence, mainCharacter);
      book.push({story: sentence, image: image});
    }

    return book;
  } catch (error) {
    console.error("Error creating book: ", error);
    throw error;
  }
}