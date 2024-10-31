// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Discover</h3>
            <ul>
              <li>Countries</li>
              <li>Regions</li>
              <li>Cities</li>
              <li>Districts</li>
              <li>Airports</li>
              <li>Hotels</li>
              <li>Places of interest</li>
              <li>Vacation Homes</li>
              <li>Apartments</li>
              <li>Resorts</li>
              <li>Villas</li>
              <li>Hostels</li>
              <li>B&Bs</li>
              <li>Guest Houses</li>
              <li>Unique places to stay</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Support</h3>
            <ul>
              <li>Contact Customer Service</li>
              <li>Safety Resource Center</li>
              <li>Coronavirus (COVID-19) FAQs</li>
              <li>Manage your trips</li>
              <li>Discover monthly stays</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <ul>
              <li>About Booking.com</li>
              <li>How We Work</li>
              <li>Sustainability</li>
              <li>Careers</li>
              <li>Investor relations</li>
              <li>Press center</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm">© {new Date().getFullYear()} Narayani.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
