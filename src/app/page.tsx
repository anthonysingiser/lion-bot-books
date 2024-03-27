import OpenAI from 'openai';
import 'dotenv/config';


export async function getServerSideProps() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.completions.create({
    engine: 'text-davinci-003',
    prompt: 'Once upon a time...'
  });

  const story = await response.choices[0].text;

  if (!story) {
    return {
      notFound: true,
    }
  }

  return {
    props: { story }, // will be passed to the page component as props
  }
}

export default function Home() {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  );
}