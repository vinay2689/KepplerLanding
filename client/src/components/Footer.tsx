import { GradientText } from "@/components/ui/gradient-text";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="font-bold text-2xl mb-6">
          <GradientText>Kepler</GradientText>
        </div>
        
        <div className="flex space-x-4 mb-6">
          <a 
            href="https://www.linkedin.com/in/vinaykanchanapally/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            <span className="sr-only">LinkedIn</span>
            <FaLinkedin className="h-6 w-6" />
          </a>
        </div>
        
        <div className="text-gray-500 text-sm flex flex-wrap justify-center gap-4">
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300">Terms of Service</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </div>
        
        <div className="mt-8 text-gray-600 text-sm">
          © {currentYear} Kepler. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
