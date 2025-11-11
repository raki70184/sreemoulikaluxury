import { Route, Routes } from "react-router-dom";
import {
  About,
  Contact,
  HomeComponent,
  Services,
  Footer,
  Cafe,
  FloatingCall,
  FooterCarousel,
} from "./components";
import AppBarComponent from "./components/AppBar/AppBarComponent";
import "./styles.css";
import Gallery from "./components/Gallery/Gallery";
import PageHero from "./components/Hero/PageHero";

export default function App() {
  return (
    <>
      <div className="App">
        <AppBarComponent />
        {/* Consistent top hero with fullscreen background video */}
        <PageHero />
        <div className="mainBody">
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/cafe" element={<Cafe />} />
          </Routes>
        </div>
      </div>
      {/* Bottom media strip above footer */}
      <FooterCarousel />
      <div className="footer">
        <Footer />
      </div>
      {/* Global floating call button with ringing animation + modal */}
      <FloatingCall />
    </>
  );
}

