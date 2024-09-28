const FooterSection: React.FC = () => {
  return (
      <footer className="bg-gradient-to-r from-[#605959] to-black text-white p-2 flex justify-center items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Footer Top: Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
                  {/* Column 1: Links */}
                  <div>
                      <h3 className="text-lg font-semibold mb-1">Links</h3> 
                      <ul>
                          <li className="mb-1">
                              <a href="/" className="hover:text-gray-400">Home</a>
                          </li>
                          <li className="mb-1">
                              <a href="/play" className="hover:text-gray-400">Play</a>
                          </li>
                          <li className="mb-1">
                              <a href="/simulation" className="hover:text-gray-400">Simulation</a>
                          </li>
                      </ul>
                  </div>

                  {/* Column 2: About */}
                  <div>
                      <h3 className="text-lg font-semibold mb-1">About</h3> 
                      <p className="text-gray-400 text-sm">
                          The Casino App is your ultimate hub for both playing and simulating exciting games.
                      </p>
                  </div>

                  {/* Column 3: Social Media */}
                  <div>
                      <h3 className="text-lg font-semibold mb-1">Follow Us</h3> 
                      <div className="flex justify-center md:justify-start space-x-3"> 
                          <a href="#" className="hover:text-gray-400">
                              <i className="fab fa-facebook-f"></i> 
                          </a>
                          <a href="#" className="hover:text-gray-400">
                              <i className="fab fa-twitter"></i> 
                          </a>
                          <a href="#" className="hover:text-gray-400">
                              <i className="fab fa-instagram"></i> 
                          </a>
                      </div>
                  </div>
              </div>

              {/* Footer Bottom: Copyright */}
              <div className="mt-4 border-t border-gray-700 pt-2 text-center text-gray-400"> 
                  <p className="text-sm">&copy; {new Date().getFullYear()} Casino App. All rights reserved.</p> 
              </div>
          </div>
      </footer>
  );
};

export default FooterSection;
