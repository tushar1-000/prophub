import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";

const HomePage = ({ Children }) => {
  
  return (
    <div>
      <Hero />
      <InfoBoxes></InfoBoxes>
      <HomeProperties />
    </div>
  );
};
export default HomePage;
