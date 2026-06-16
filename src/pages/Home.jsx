import EnhancedHomeCourseSection from "../Components/EnhancedHomeCourseSection";
import EnhancedHomeHero from "../HomeComponents/EnhancedHomeHero";
import EnhancedTopInstructor from "../HomeComponents/EnhancedTopInstructor";
import EnhancedWhyUsSection from "../HomeComponents/EnhancedWhyUsSection";
import InfrastructureBentoSection from "../HomeComponents/InfrastructureBentoSection";
import PricingTerminalSection from "../HomeComponents/PricingTerminalSection";
import TerminalMetricsSection from "../HomeComponents/TerminalMetricsSection";

const Home = () => {
  return (
    <div>
      <EnhancedHomeHero />
      <EnhancedHomeCourseSection />
      <TerminalMetricsSection></TerminalMetricsSection>
      <InfrastructureBentoSection></InfrastructureBentoSection>
      <PricingTerminalSection></PricingTerminalSection>
      <EnhancedTopInstructor />
      <EnhancedWhyUsSection />
    </div>
  );
};

export default Home;
