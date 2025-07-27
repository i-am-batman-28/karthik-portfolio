import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { ThreeDProjectCard } from "./3DProjectCard";
import { HolographicCard } from "./HolographicCard";

const projects = [
  {
    id: 1,
    title: "CloudNine Hospitals Chatbot",
    description:
      "Full-stack RAG chatbot using LangChain, LLaMA3, Pinecone, FastAPI, and React. Automated multilingual hospital QA with dynamic vector search and user memory.",
    image: "/projects/Cloudnine.mov",
    tags: ["Python", "FastAPI", "React", "LangChain", "Pinecone"],
    demoUrl: "#", // Add link if deployed
    githubUrl: "https://github.com/i-am-batman-28/cloudnine-chatbot",
  },
  {
    id: 2,
    title: "CraftChain – Artisan Marketplace",
    description:
      "E-commerce platform empowering artisans, with a future roadmap for smart contract/NFT integration.",
    image: "/projects/craftchain.png",
    tags: ["E-commerce", "Blockchain Roadmap", "React", "Tailwind"],
    demoUrl: "https://craft-chain.vercel.app", // Add link if deployed
    githubUrl: "https://github.com/i-am-batman-28/craftchain",
  },
  {
    id: 3,
    title: "AI SQL Generator",
    description:
      "Natural language to SQL generator using Groq, LangChain & Streamlit with DB integration.",
    image: "/projects/ai-sql.png",
    tags: ["LangChain", "Groq", "Streamlit", "SQL"],
    demoUrl: "#", // Add link if deployed
    githubUrl: "https://github.com/i-am-batman-28/sql-chat",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects that combine AI, web development,
          and creativity to solve real-world problems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <HolographicCard key={key} project={project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/i-am-batman-28"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
