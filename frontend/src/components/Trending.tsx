// src/components/TrendingDestinations.tsx
import React from 'react';

type Destination = {
  name: string;
  imageUrl: string;
};

const trendingDestinations: Destination[] = [
  { name: 'New York', imageUrl: 'https://cf2.bstatic.com/xdata/images/city/600x600/977437.jpg?k=0e8e510a113c319717b54edcbd3df2b5e2cf190e403973548745a10a2c19e660&o=' },
  { name: 'Atlanta', imageUrl: 'https://cf2.bstatic.com/xdata/images/city/600x600/976884.jpg?k=00a3546794e9e8cbb86b98371056949ee731002b76358467601e85a0b09dd6db&o=' },
  { name: 'South Carolina', imageUrl: 'https://cf2.bstatic.com/xdata/images/city/600x600/976708.jpg?k=cb62481ca3494ac4e0b030345eedc77024732fb227f5642c773e5a11f534016c&o=' },
  // Add more destinations as needed
];

const Trending: React.FC = () => (
  <section className="trending-destinations px-4 my-8 py-8">
    <h2 className="text-3xl text-blue-600 font-semibold  my-3">Top U.S. Travel Destinations</h2>
    <div className="grid  md:grid-cols-3 gap-6">
      {trendingDestinations.map((destination, index) => (
        <div key={index} className="destination-card bg-white shadow-md rounded-lg overflow-hidden">
          <img src={destination.imageUrl} alt={destination.name} className="w-full h-45 object-cover" />
          <h3 className="text-lg font-medium text-center py-4">{destination.name}</h3>
        </div>
      ))}
    </div>
  </section>
);

export default Trending;
