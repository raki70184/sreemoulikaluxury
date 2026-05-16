import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AppBarComponent from "./components/AppBar/AppBarComponent";
import PageHero from "./components/Hero/PageHero";
import { FloatingCall, FooterCarousel, Footer } from "./components";
import { Seo } from "./components/Seo/Seo";
import { Analytics } from "./components/Analytics/Analytics";
import ChatWidget from "./components/ChatWidget/ChatWidget";
import "./styles.css";

// Each route is code-split so the home payload doesn't drag in cafe / gallery / about.
const HomeComponent = lazy(() =>
  import("./components/Home").then((m) => ({ default: m.HomeComponent }))
);
const About = lazy(() =>
  import("./components/About/About").then((m) => ({ default: m.About }))
);
const Services = lazy(() =>
  import("./components/Services/Services").then((m) => ({ default: m.Services }))
);
const Contact = lazy(() =>
  import("./components/Contact/Contact").then((m) => ({ default: m.Contact }))
);
const Gallery = lazy(() => import("./components/Gallery/Gallery"));
const Cafe = lazy(() =>
  import("./components/Cafe/Cafe").then((m) => ({ default: m.Cafe }))
);

const RouteFallback = () => (
  <div
    style={{
      minHeight: "40vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#888",
      fontFamily: "system-ui, sans-serif",
    }}
    aria-live="polite"
  >
    Loading…
  </div>
);

function AppContent() {
  const location = useLocation();
  const isCafeRoute = location.pathname === "/cafe";
  return (
    <>
      <Seo pathname={location.pathname} />
      <Analytics />
      <ChatWidget />
      <div className="App">
        <AppBarComponent />
        <PageHero />
        <div className="mainBody">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<HomeComponent />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/cafe" element={<Cafe />} />
            </Routes>
          </Suspense>
        </div>
      </div>
      <FooterCarousel activeTab={isCafeRoute ? "cafe" : "beauty"} />
      <div className="footer">
        <Footer />
      </div>
      <FloatingCall />
    </>
  );
}

export default function App() {
  return <AppContent />;
}
