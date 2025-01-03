import Carousal from "../Components/Carousal";
import Services from "../Components/Services";
import Footer from "../Components/Footer";
import Product from "../Components/Product";

export const Home = () => {
  return (
    <div>
      <Carousal />
      <Product />
      <Services />
      <Footer />
    </div>
  );
};