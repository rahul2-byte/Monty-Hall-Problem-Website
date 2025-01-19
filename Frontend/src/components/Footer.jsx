const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Monty hall problem. All rights reserved.</p>
        <p>
          <a href="/privacy" className="text-blue-400 hover:underline mx-2">Privacy Policy</a>
          <a href="/terms" className="text-blue-400 hover:underline mx-2">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
