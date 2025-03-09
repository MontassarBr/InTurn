import Image from "next/image";
import styles from "./page.module.css";
import  Navbar from "./components/Navbar/Navbar"
import HeroSection from "./components/HeroSection/HeroSection";
import SearchBar from "./components/SearchBar/SearchBar";
import LatestInternships from "./components/LatestInternships/LatestInternships";
import Footer from "./components/Footer/Footer";
import DomainsSection from "./components/DomainsSection/DomainsSection";

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