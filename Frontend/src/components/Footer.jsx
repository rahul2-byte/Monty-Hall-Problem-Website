import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Connect With Us</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Facebook</a></li>
              <li><a href="#" className="text-white">Twitter</a></li>
              <li><a href="#" className="text-white">Instagram</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Newsletter</h5>
            <p>Subscribe to our newsletter for updates</p>
            <input type="email" className="form-control mb-2" placeholder="Enter email" />
          </div>
        </div>
        <div className="text-center mt-3">
          <p>&copy; 2025 Card Game. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;