import HomeCourseSection from "../Components/HomeCourseSection";
import HomeHero from "../HomeComponents/HomeHero";
import TopInstructor from "../HomeComponents/TopInstructor";
import WhyUsSection from "../HomeComponents/WhyUsSection";

const Home = () => {
  return (
    <div>
      <HomeHero></HomeHero>
      <HomeCourseSection></HomeCourseSection>
      <TopInstructor></TopInstructor>
      <WhyUsSection></WhyUsSection>
    </div>
  );
};

export default Home;
