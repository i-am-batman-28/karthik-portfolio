import { ArrowDown } from "lucide-react";
import { MagneticTypingProfile } from "./MagneticTypingProfile";
import { TypingText } from "./TypingText";
import { MagneticButton } from "./MagneticButton";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-8">
          {/* ✨ Magnetic Typing Profile */}
          <div className="opacity-0 animate-fade-in">
            <MagneticTypingProfile />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in-delay-1">Hi, I'm</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-2">
              {" "}
              <TypingText text="Karthik" speed={150} />
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-3">
              {" "}
              <TypingText text="M Sarma" speed={100} />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-4">
            BTech AI & Data Science student @ IIIT Sri City. I build full-stack
            AI tools, smart web apps, and meaningful solutions that blend
            technology with impact.
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-5">
            <MagneticButton 
              as="a" 
              href="#projects" 
              className="cosmic-button"
            >
              View My Work
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">Scroll</span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
