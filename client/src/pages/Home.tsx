import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background bg-tech-pattern">
      <Header />
      <main className="flex-grow flex flex-col">
        <Hero />
        <Features />
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  );
}
