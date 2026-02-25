import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { useEffect, useState } from "react";

export default function Hero() {
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [direction, setDirection] = useState("up");
  
  const taglines = [
    "Triage Intelligently",
    "Resolve Faster",
    "Capture Everywhere",
    "Detect Proactively"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("down");
      
      // First trigger the exit animation
      setTimeout(() => {
        setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
        setDirection("up");
      }, 500); // This should match the duration of your slide-down animation
      
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const scrollToForm = () => {
    // Find the form section and scroll to it
    const formSection = document.getElementById('waitlist-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32 flex flex-col items-center text-center">
      {/* Hero heading with gradient text effect */}
      <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-tighter">
        <GradientText>Kepler</GradientText>
      </h1>
      
      {/* Hero subtitle with carousel effect */}
      <div className="h-14 md:h-16 mb-6 overflow-hidden relative">
        <h2 
          key={currentTaglineIndex}
          className={direction === "up" ? "animate-slide-up text-2xl md:text-3xl font-semibold" : "animate-slide-down text-2xl md:text-3xl font-semibold"}
        >
          <GradientText variant={currentTaglineIndex % 2 === 0 ? "purple" : "blue"}>
            {taglines[currentTaglineIndex]}
          </GradientText>
        </h2>
      </div>
      
      {/* Hero description */}
      <p className="text-lg text-gray-300 max-w-2xl mb-12">
        An agentic platform that fundamentally changes how you find issues and fix software.
      </p>
      
      {/* CTA Button */}
      <Button 
        className="btn-gradient text-white font-medium px-8 py-6 h-auto text-lg mb-20"
        onClick={scrollToForm}
      >
        Join Waitlist
      </Button>
      
      {/* Abstract Tech Elements */}
      <div className="relative w-full max-w-4xl h-64 md:h-96">
        {/* Abstract elements using divs with gradients */}
        <div className="absolute w-64 h-64 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl top-0 right-1/4 animate-float"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-accent/10 to-accent-alt/10 rounded-full blur-3xl bottom-0 left-1/4 animate-float-delayed"></div>
        
        {/* Tech gradient overlay element */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
            <div className="h-2 bg-primary/50 rounded-full"></div>
            <div className="h-2 bg-secondary/50 rounded-full"></div>
            <div className="h-2 bg-accent-alt/50 rounded-full"></div>
            <div className="h-2 bg-accent/50 rounded-full"></div>
            <div className="h-2 bg-primary/50 rounded-full"></div>
            <div className="h-2 bg-secondary/50 rounded-full"></div>
            <div className="h-2 bg-accent-alt/50 rounded-full"></div>
            <div className="h-2 bg-accent/50 rounded-full"></div>
            <div className="h-2 bg-primary/50 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
