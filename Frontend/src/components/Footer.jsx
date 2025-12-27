import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-6 mt-10">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo + Title */}
          <h2 className="text-xl font-bold">Job Hunt</h2>
          <p className="text-sm text-gray-500">
            © 2024 Your Company. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-6">
            
            {/* Facebook */}
            <a
              href="https://facebook.com"
              className="text-gray-600 hover:text-blue-600 transition"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 3h-1.8v7A10 10 0 0022 12z" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com"
              className="text-gray-600 hover:text-sky-500 transition"
              aria-label="Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 001.88-2.37 8.48 8.48 0 01-2.71 1.04A4.24 4.24 0 0016 4a4.24 4.24 0 00-4.24 4.24c0 .33.04.64.1.95A12 12 0 013 5.15a4.24 4.24 0 001.31 5.66 4.17 4.17 0 01-1.92-.53v.05a4.24 4.24 0 003.4 4.15 4.3 4.3 0 01-1.92.07 4.24 4.24 0 003.95 2.93A8.5 8.5 0 012 19.54 12 12 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68l-.01-.53A8.18 8.18 0 0022.46 6z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              className="text-gray-600 hover:text-blue-700 transition"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5A2.5 2.5 0 102.5 6a2.5 2.5 0 002.48-2.5zM3 8.98h4v12H3v-12zm7 0h3.8v1.7h.05c.53-1 1.82-2.05 3.74-2.05 3.99 0 4.72 2.63 4.72 6v6.35h-4v-5.63c0-1.34-.02-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.73H10v-12z" />
              </svg>
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
