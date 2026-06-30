import Navbar from "@/components/navbar/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import TeamSection from "@/components/team/TeamSection";
import PainPointsSection from "@/components/PainProblem";
import Solution from "@/components/Solution";
import ServicesSection from "@/components/services";
import SuccessStoriesSection from "@/components/SuccessListings";

export default function Page() {
  return (
    <div className="min-h-screen bg-hard-ivory flex flex-col">
      <div className="flex flex-col gap-4">
        <Navbar />
        <HeroSection />
      </div>
      <PainPointsSection />
      <Solution />
      <ServicesSection />
      <SuccessStoriesSection />
      <TeamSection />
    </div>
  );
}
