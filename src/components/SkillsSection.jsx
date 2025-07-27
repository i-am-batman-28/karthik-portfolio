import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThreeDSkillSpheres } from "./3DSkillSpheres";

const skills = [
  // Programming Languages
  { name: "Python", category: "programming" },
  { name: "Java", category: "programming" },
  { name: "C", category: "programming" },
  { name: "SQL", category: "programming" },
  { name: "R", category: "programming" },
  { name: "HTML/CSS", category: "programming" },

  // Frameworks & Libraries
  { name: "FastAPI", category: "frameworks" },
  { name: "Flask", category: "frameworks" },
  { name: "Streamlit", category: "frameworks" },
  { name: "LangChain", category: "frameworks" },
  { name: "HuggingFace Transformers", category: "frameworks" },
  { name: "Pandas / NumPy", category: "frameworks" },
  { name: "Seaborn", category: "frameworks" },
  { name: "Scikit-learn", category: "frameworks" },
  { name: "BeautifulSoup", category: "frameworks" },

  // AI & LLM Tools
  { name: "OpenAI APIs", category: "ai" },
  { name: "Google Gemini", category: "ai" },
  { name: "Groq", category: "ai" },
  { name: "RAG Pipelines", category: "ai" },
  { name: "Pinecone", category: "ai" },

  // Tools & Platforms
  { name: "Git/GitHub", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "Kubernetes", category: "tools" },
  { name: "VS Code", category: "tools" },
  { name: "Postman", category: "tools" },
  { name: "Jupyter", category: "tools" },
  { name: "Linux CLI", category: "tools" },
  { name: "Vercel", category: "tools" },
  { name: "Heroku", category: "tools" },
  { name: "n8n", category: "tools" },
];

const categories = ["all", "programming", "frameworks", "ai", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 3D Skill Spheres */}
        <div className="mb-12">
          <ThreeDSkillSpheres />
        </div>

        {/* Skill Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-card to-card/80 p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 border border-primary/20 hover:border-primary/40 overflow-hidden animate-[float-skill_3s_ease-in-out_infinite] hover:animate-[pulse-glow_2s_ease-in-out_infinite]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              {/* Skill name */}
              <div className="relative z-10 text-center">
                <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors duration-300 group-hover:scale-110">
                  {skill.name}
                </h3>
              </div>
              
              {/* Hover animation overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl" />
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-primary/20 group-hover:border-t-primary/40 transition-colors duration-300 rounded-bl-2xl" />
              
              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-2 left-2 w-1 h-1 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.2}s` }} />
                <div className="absolute bottom-2 right-2 w-1 h-1 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.4}s` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
