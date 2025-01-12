import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cards from "./components/cards";

function App() {

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Cards />
      </main>
      <Footer />
    </div>
  );
}

export default App;
