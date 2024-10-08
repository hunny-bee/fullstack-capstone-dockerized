const Footer = () => {
  return (
    <footer className="w-full absolute bottom-0 left-0 bg-white text-gray-900 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <p className="text-gray-700">
              Explore the world with our vacation planning app. Discover new destinations and plan unforgettable trips!
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-yellow-600">About Us</a></li>
              <li><a href="#" className="text-gray-700 hover:text-yellow-600">Destinations</a></li>
              <li><a href="#" className="text-gray-700 hover:text-yellow-600">Travel Blog</a></li>
              <li><a href="#" className="text-gray-700 hover:text-yellow-600">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-700">138 Victoria St.<br />Sandton City, 2192</p>
            <p className="text-gray-700">Phone: +27-619-0086</p>
            <p className="text-gray-700">Email: support@Staycation.com</p>
          </div>
        </div>
        <div className="text-center mt-10">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <p className="text-gray-700">© 2024 Staycation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
