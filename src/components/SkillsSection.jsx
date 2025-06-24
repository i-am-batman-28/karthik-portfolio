import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Programming Languages
  { name: "Python", level: 95, category: "programming" },
  { name: "SQL", level: 90, category: "programming" },
  { name: "HTML/CSS", level: 90, category: "programming" },
  { name: "JavaScript", level: 85, category: "programming" },
  { name: "R", level: 70, category: "programming" },

  // Frameworks & Libraries
  { name: "Flask", level: 90, category: "frameworks" },
  { name: "FastAPI", level: 85, category: "frameworks" },
  { name: "LangChain", level: 90, category: "frameworks" },
  { name: "HuggingFace Transformers", level: 85, category: "frameworks" },
  { name: "Pandas / Numpy", level: 90, category: "frameworks" },
  { name: "Matplotlib / Seaborn", level: 85, category: "frameworks" },
  { name: "Scikit-Learn", level: 80, category: "frameworks" },

  // Tools
  { name: "Git/GitHub", level: 95, category: "tools" },
  { name: "Docker", level: 80, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Power BI / Tableau", level: 80, category: "tools" },
  { name: "Beautiful Soup", level: 75, category: "tools" },
];

const categories = ["all", "programming", "frameworks", "tools"];

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

        {/* Skill Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
