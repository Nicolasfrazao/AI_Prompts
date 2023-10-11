import Feed from "@/components/Feed";

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Discover and share AI prompts
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center">AI powered Prompts</span>
    </h1>
    <p className="desc text-center">
      AI Prompt is a free service that allows you to generate and share artificial intelligence Prompts based on your own experience. It uses GPT3, an open source AI.
    </p>

    <Feed />
  </section>
);

export default Home;

