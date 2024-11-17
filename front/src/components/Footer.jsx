import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#192064] text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm">
             Dedicated to providing the best solutions for managing tasks and improving productivity.
            </p>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-sm">Email: </p>
          
          </div>

          {/* Social Media Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="" className="text-sm hover:text-blue-500">LinkedIn</a>
              </li>
             
            </ul>
          </div>

          {/* Privacy Policy & Terms of Service Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy-policy" className="text-sm hover:text-blue-500">Privacy Policy</a>
              </li>
             
            </ul>
          </div>
        </div>

        <div className="text-center mt-6 border-t pt-4">
          <p className="text-sm">&copy; 2024 . All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
