import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="bg-white py-8 px-4 relative overflow-hidden">
      {/* Large GAMEDAY Background with transparent effect */}
      <div className="absolute top-[-3rem] left-0 w-full h-full flex justify-center items-start">
        <h1 className="text-[20rem] md:text-[16rem] font-extrabold leading-none relative">
          <span className=" text-gray-200 opacity-40 hidden md:block">
            {" "}
            {/* Hide on small screens */}
            GAMEDAY
          </span>
          <span className="absolute inset-0 bg-gradient-to-t from-white to-transparent bg-opacity-100" />
        </h1>
      </div>

      {/* Footer Container */}
      <div className="relative max-w-full mx-auto xl:px-24 lg:px-20 sm:px-8 px-6 z-10">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between pb-10">
          <div className="max-w-sm mb-6 md:mb-0 text-center md:text-left">
            {/* Center align text for small screens */}
            <h2 className="font-bold text-xl text-black">GAMEDAY.</h2>
            <p className="text-gray-800 mt-4">
              We’re passionate about equipping tourism enthusiasts with premium
              gear for every adventure. Gear up for your next journey into the
              wild! Whether you're hiking in the mountains or exploring new
              cities, we’ve got the tools to make every experience memorable and
              comfortable.
            </p>
            {/* Social media icons */}
            <div className="flex space-x-4 mt-6 justify-center md:justify-start">
              {/* Center on small screens, left-align on larger screens */}
              <a
                href="#"
                className="p-2 bg-gray-100 rounded-full flex items-center justify-center h-10 w-10 hover:bg-orange-500 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-black" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-100 rounded-full flex items-center justify-center h-10 w-10 hover:bg-orange-500 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faTwitter} className="text-black" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-100 rounded-full flex items-center justify-center h-10 w-10 hover:bg-orange-500 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-black" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-100 rounded-full flex items-center justify-center h-10 w-10 hover:bg-orange-500 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-black" />
              </a>
            </div>
          </div>

          {/* Other headings on the opposite end */}
          <div className="flex flex-col md:flex-row md:space-x-10 text-center md:text-left">
            {/* Center align for small screens */}
            {/* Second Column */}
            <div className="mb-6 md:mb-0">
              <h3 className="font-bold text-black">COMPANY</h3>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Our Guarantee</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Partner With Us</a>
                </li>
              </ul>
            </div>
            {/* Third Column */}
            <div className="mb-6 md:mb-0">
              <h3 className="font-bold text-black">SOCIAL</h3>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Linkedin</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
              </ul>
            </div>
            {/* Fourth Column */}
            <div>
              <h3 className="font-bold text-black">PRIVACY & TERMS</h3>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>
                  <a href="#">FAQS</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
                <li>
                  <a href="#">Cancellation Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-300 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center space-y-4 md:space-y-0">
            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-gray-400">NEED SUPPORT</h4>
              <p>
                <span className="text-black font-semibold">Call</span>
                <span className="text-orange-500 font-bold">
                  {" "}
                  1-900-123-4567
                </span>
              </p>
              <p className="text-gray-400">Mon – Fri: 09 am – 05 pm</p>
            </div>

            {/* Email Info */}
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-gray-400">EMAIL US</h4>
              <p className="text-black font-bold">Gameday@gmail.com</p>
              <p className="text-gray-400">We’ll get back to you</p>
            </div>

            {/* Payment Icons */}
            <div className="flex justify-center space-x-4">
              <img src="/paypal.png" alt="PayPal" className="h-6 w-auto" />
              <img src="/visa.png" alt="Visa" className="h-6 w-auto" />
              <img
                src="/mastercard.png"
                alt="MasterCard"
                className="h-6 w-auto"
              />
              <img src="/aws.png" alt="Amex" className="h-6 w-auto" />
            </div>
          </div>
        </div>

        {/* Add a thin line before the footer links */}
        <div className="border-t border-gray-300 mt-12 pt-2">
          {/* Footer Links */}
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center text-gray-400 text-sm space-y-4 md:space-y-0">
            <p>
              &copy;
              <span>2024 </span>
              <span className="text-black">GAMEDAY.</span>
              <span> All Rights Reserved</span>
            </p>
            <div className="flex space-x-4">
              <a href="#">Terms & Conditions</a>
              <a href="#">Cookies</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
