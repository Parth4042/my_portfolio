import Preloader from "@/components/ui/Preloader";
import Navbar from "@/components/ui/Navbar";
import Marquee from "@/components/ui/Marquee";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Pipeline from "@/components/sections/Pipeline";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Lab from "@/components/sections/Lab";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Pipeline />
        <Projects />
        <Experience />
        <Lab />
        <Contact />
      </main>
    </>
  );
}
