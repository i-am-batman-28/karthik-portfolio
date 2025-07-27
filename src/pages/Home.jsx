import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { ThreeDBackground } from "@/components/3DBackground";
import { ParticleEffects } from "@/components/ParticleEffects";
import { ParallaxScroll } from "@/components/ParallaxScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { FloatingNav } from "@/components/FloatingNav";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { InteractiveTimeline } from "@/components/InteractiveTimeline";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme Toggle */}
      <ThemeToggle />
      {/* Background Effects */}
      <StarBackground />
      <ThreeDBackground />
      <ParticleEffects />
      <ParallaxScroll />
      
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <InteractiveTimeline />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Floating Navigation */}
      <FloatingNav />

      {/* Footer */}
      <Footer />
    </div>
  );
};
