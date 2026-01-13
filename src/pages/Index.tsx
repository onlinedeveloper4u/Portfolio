import { useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import CVDownloads from "../components/CVDownloads";
import Contact from "../components/Contact";
import FloatingNavigation from "../components/FloatingNavigation";
import { Toaster } from "sonner";

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (link?.hash) {
        e.preventDefault();
        const element = document.querySelector(link.hash);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Toaster position="top-right" />
      <FloatingNavigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <CVDownloads />
      <Contact />
    </main>
  );
};

export default Index;
