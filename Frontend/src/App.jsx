import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cards from "./components/cards";

function App() {

  return (
    <div className="mx-auto font-sans">
      <Navbar />
      <main>
        <Cards />
      </main>
      <Footer />
    </div>
  );
}

export default App;
