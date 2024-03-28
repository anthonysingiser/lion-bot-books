import 'dotenv/config';
import { OpenAI } from 'openai';

export async function getServerSideProps() {
    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
  
    const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `Once upon a time, there was a`}],
        model: 'gpt-3.5-turbo',
    });
  
    const story = response.choices[0].message.content;
  
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