import { Route, Routes } from "react-router-dom";
import { About, Contact, HomeComponent, Services } from "./components";
import AppBarComponent from "./components/AppBar/AppBarComponent";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <AppBarComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}
