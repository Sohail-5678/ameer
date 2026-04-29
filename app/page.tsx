"use client";

import { useState } from "react";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { AIAssistant, AILauncher } from "@/components/AIAssistant";

export default function Home() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundEffects />
      <Navigation onAskAI={() => setAiOpen(true)} />

      <div className="relative z-10">
        <Hero onAskAI={() => setAiOpen(true)} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact onAskAI={() => setAiOpen(true)} />
        <Footer />
      </div>

      <AILauncher onClick={() => setAiOpen(true)} />
      <AIAssistant open={aiOpen} onOpenChange={setAiOpen} />
    </main>
  );
}
