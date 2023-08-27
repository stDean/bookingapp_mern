import "./home.styles.css";
import {
  Featured,
  FeaturedProperties,
  Footer,
  Header,
  MailList,
  NavBar,
  PropertyList,
} from "../../components";

const Home = () => {
  return (
    <>
      <NavBar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </>
  );
};

export default Home;
