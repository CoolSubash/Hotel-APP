// src/components/Destinations.tsx
import React from 'react';

const destinationsData = [
  { name: 'Texel', properties: 411 },
  { name: 'Bora Bora', properties: 59 },
  { name: 'Bali', properties: 13206 },
  { name: 'Hawaii', properties: 5452 },
  { name: 'Phuket Province', properties: 5547 },
  { name: 'Lake District', properties: 2461 },
  { name: 'Jersey', properties: 90 },
  { name: 'Guernsey', properties: 64 },
  { name: 'Ibiza', properties: 1642 },
  { name: 'England', properties: 80602 },
  { name: 'Santorini', properties: 1794 },
  { name: 'Tenerife', properties: 9735 },
  { name: 'Cornwall', properties: 5459 },
  { name: 'Ras Al Khaimah', properties: 117 },
  { name: 'Uttar Pradesh', properties: 4463 },
  { name: 'Isle of Wight', properties: 961 },
  { name: 'Bihar', properties: 781 },
  { name: 'Mykonos', properties: 1455 },
  { name: 'Zanzibar', properties: 882 },
];

const DestinationData: React.FC = () => {
  return (
    <section className="destinations my-8 px-4">
      <h2 className="text-3xl font-semibold  text-blue-600 mb-4">Destinations Bookers Love</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
        {destinationsData.map((destination, index) => (
          <div key={index} className="destination-card p-2 bg-white rounded-lg cursor-pointer ">
            <p className=" font-medium">{destination.name}</p>
            <p className="text-gray-600">{destination.properties.toLocaleString()} properties</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DestinationData;
