import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/navbar/Navbar";
import HeroSection from "./components/herosection/HeroSection";
import SearchBar from "./components/searchbar/SearchBar";
import LatestInternships from "./components/latestinternships/LatestInternships";
import Footer from "./components/footer/Footer";
import DomainsSection from "./components/domainsSection/DomainsSection";
function Home() {
  return (
      <main className={styles.main}>
      <Navbar/>
      <HeroSection/>
      <SearchBar/>
      <DomainsSection/>
      <LatestInternships/>
      <br />
      <Footer/>
      </main>
  );
}

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

export default Home