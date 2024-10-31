// src/App.tsx
import React from 'react';
import Trending from '../components/Trending';
import PropertyTypes from '../components/PropertyTypes';
import DestinationList from '../components/DestinationList';
import DestinationData from '../components/DestinationData';

const App: React.FC = () => (
    <>
   
    <Trending />
    <PropertyTypes />
    <DestinationList/>
    <DestinationData/>
  
  </>
);

export default App;
