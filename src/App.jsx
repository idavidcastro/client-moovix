import "./App.css";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import NavBar from "./components/nav-bar/NavBar";
import Rated from "./components/rated/Rated";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        {/* <Render /> */}
        <Rated />
        <Rated />
        <Rated />
      </main>
      <Footer />
    </>
  );
}

export default App;
