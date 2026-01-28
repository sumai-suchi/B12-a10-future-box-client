import EnhancedHomeCourseSection from "../Components/EnhancedHomeCourseSection";
import EnhancedHomeHero from "../HomeComponents/EnhancedHomeHero";
import EnhancedTopInstructor from "../HomeComponents/EnhancedTopInstructor";
import EnhancedWhyUsSection from "../HomeComponents/EnhancedWhyUsSection";

const Home = () => {
  return (
    <div>
      <EnhancedHomeHero />
      <EnhancedHomeCourseSection />
      <EnhancedTopInstructor />
      <EnhancedWhyUsSection />
    </div>
  );
};

export default Home;
