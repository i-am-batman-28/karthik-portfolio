import { Calendar, Building, MapPin } from "lucide-react";

const experiences = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Ontune AI",
    duration: "Jul 2025 – Present",
    location: "Hybrid",
    description: [
      "Engineered scalable AI agents and custom retrieval flows using LangChain, LLaMA3, and Pinecone",
      "Deployed multilingual RAG-based systems for real estate and hospital automation",
      "Designed low-latency pipelines to handle dynamic document streams and client queries"
    ]
  },
  {
    id: 2,
    title: "Software Developer Engineer",
    company: "NLightN",
    duration: "Jul 2025 – Present",
    location: "Remote",
    description: [
      "Led development of internal LLM-powered APIs with FastAPI and Flask",
      "Implemented data extraction flows with resilient scrapers and scheduler-based automation",
      "Boosted data throughput and modular design across AI evaluation pipelines"
    ]
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "OmniSageAI",
    duration: "Jul 2025 – Present",
    location: "Remote",
    description: [
      "Delivered actionable analytics on Amazon refund trends and merchant behavior",
      "Built risk dashboards and fraud detection logic based on transactional anomalies",
      "Led root-cause investigations across large, noisy e-commerce datasets"
    ]
  },
  {
    id: 4,
    title: "AI Intern",
    company: "Excelerate",
    duration: "May 2025 – Jul 2025",
    location: "Remote",
    description: [
      "Collaborated with Dubai and US teams to extract insights from global job datasets",
      "Analyzed employer trust scores and identified anomalies in verified hiring networks",
      "Modeled time series job trends using Python and exploratory feature pipelines"
    ]
  }
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Work <span className="text-primary">Experience</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          My internship experiences in AI, data science, and software engineering.
        </p>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-primary">
                    {experience.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <Building className="h-4 w-4" />
                    <span>{experience.company}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{experience.location}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-2">
                {experience.description.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 