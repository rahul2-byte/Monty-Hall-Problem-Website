import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChoiceList from './components/ChoiceList';
import ChoiceResult from './components/ChoiceResult';
import Navbar from "./components/NavBar";

function App() {

  const navLinks = [
    { text: 'Home', href: '/' },
    { text: 'About', href: '/about' },
    { text: 'Contact', href: '/contact' }
  ];

  return (
    <Router>
      <div>
      <Navbar brandName="Monty Hall Problem" links={navLinks} />
        <Routes>
          <Route path="/" element={<ChoiceList />} />
          <Route path="/result" element={<ChoiceResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
