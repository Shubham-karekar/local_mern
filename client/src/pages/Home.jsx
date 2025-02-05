import Carousal from "../Components/Carousal";
import Services from "../Components/Services";
import Footer from "../Components/Footer";
import Product from "../Components/Product";
import Trust from "../Components/Trust";

export const Home = () => {
  return (
    <div>
      <Carousal />
      <Trust />
      <Product />
      <Services />
      <Footer />
    </div>
  );
};
