import {openai} from '../projectKey';
import {animals, firstTenFryWords} from '../data';

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

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateImage(prompt: string, animal: string): Promise<string> {
  await delay(12000); // Wait for 12 seconds

  const image = await openai.images.generate({
      model: "dall-e-3", 
      prompt: `${prompt} in a hand-drawn style with muted primary and secondary colors. The main character of the image is a ${animal}`,
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
    const story = await createStory(firstTenFryWords, mainCharacter);
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