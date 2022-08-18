import aos from "aos/dist/aos";
import { useEffect } from "react";
import Info from "../Components/Info";
import CompletedProjects from "../Components/Sections/CompletedProjects";
import ContactWithMe from "../Components/Sections/ContactWithMe";
import ExperiencedTech from "../Components/Sections/ExperiencedTech";
import HeroSection from "../Components/Sections/HeroSection";
import ServicesIProvide from "../Components/Sections/ServicesIProvide";
import WorkingProcess from "../Components/Sections/WorkingProcess";

const Home = () => {
  useEffect(() => {
    aos.init({
      duration: 500,
    });
  }, []);

  return (
    <div>
      {/* Hero */}
      <HeroSection />

      {/* Technology I have Expeience  */}
      <ExperiencedTech />

      {/* Services I Provide  */}
      <ServicesIProvide />

      {/* Working Process*/}
      <WorkingProcess />

      {/* Completed Projects*/}
      <CompletedProjects />

      {/* Contact With Me  */}
      <ContactWithMe />

      {/* Information For User  */}
      <Info />
    </div>
  );
};

export default Home;
