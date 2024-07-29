import { assets } from "../assets/assets";
import Layout from "../Components/Layout/Layout";
import "./About.css";
const About = () => {
  return (
    <Layout title={"About Us - ECOM"}>
      <div className="container">
        <div className="img">
          <img src={assets.about} alt="" />
        </div>
        <div className="details">
          <p className="heading">About us</p>
          <p>
            Ecom was founded on July 5, 2024, by pawan sangare in Indore, Madhya
            Pradesh. The company originally started as an online marketplace for
            books but gradually expanded its offerings to include a wide range
            of product categories. This diversification led to it being referred
            to as "The Everything Store".
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
