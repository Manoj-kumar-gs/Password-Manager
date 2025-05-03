import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 w-full h-[10vh] flex flex-col justify-around items-center px-6 text-white">
            <div className="text-[10px]">
                © {new Date().getFullYear()} Password Manager. All rights reserved.
            </div>
            <div className="flex space-x-4 text-[12px]">
                <a
                    href="#"
                    className="hover:text-gray-400 transition-colors duration-200"
                >
                    Privacy Policy
                </a>
                <a
                    href="#"
                    className="hover:text-gray-400 transition-colors duration-200"
                >
                    Terms of Service
                </a>
            </div>
        </footer>
    );
};

export default Footer;
