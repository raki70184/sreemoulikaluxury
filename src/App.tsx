import { Route, Routes } from "react-router-dom";
import { About, Contact, HomeComponent, Services, Footer, Instagram } from "./components";
import AppBarComponent from "./components/AppBar/AppBarComponent";
import "./styles.css";
import { Gallery } from "./components/Gallery";

export default function App() {
  return (
    <>
      <div className="App">
        <AppBarComponent />
        <div className="mainBody">
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </div>
      </div>
      <Instagram />
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}
