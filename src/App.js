import Header from "./components/header/Header.jsx";
import Hero from "./components/hero/hero"
import MainSection from "./components/main-section/main-section.jsx";
import FeaturedCollection from "./components/featured-collection/featured-collection.jsx";
import "./App.scss";


function App() {
  return (
    <div className='App'>
      <Header />
      <Hero />
      <MainSection />
      <FeaturedCollection />
    </div>
  );
}

export default App;
