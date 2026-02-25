import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";

export default function Header() {
  const scrollToForm = () => {
    // Find the form section and scroll to it
    const formSection = document.getElementById('waitlist-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full py-6 px-4 md:px-6 max-w-7xl mx-auto">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <GradientText>Kepler</GradientText>
        </div>
        
        {/* Right nav items */}
        <div>
          <Button variant="outline" onClick={scrollToForm}>
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  );
}
