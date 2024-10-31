// src/components/DestinationSlider.tsx
import React from 'react';
import Slider from 'react-slick';

type Destination = {
  name: string;
  distance: number; // in miles
  imageUrl: string;
};

const destinations: Destination[] = [
  { name: 'Auburn', distance: 275, imageUrl: 'https://cf2.bstatic.com/xdata/images/xphoto/300x240/140046613.jpg?k=bf730767ccc5a12020fddd6584eb018e535432b59030c7e658ac5d3e6a5ddfae&o=' },
  { name: 'Fort Payne', distance: 286, imageUrl: 'https://cf2.bstatic.com/xdata/images/xphoto/300x240/140046614.jpg?k=650431ed861bf6b20fed6bb50df813a22df3bbcc7047e7aabe42a8c96a764822&o=' },
  { name: 'Gadsden', distance: 298, imageUrl: 'https://cf2.bstatic.com/xdata/images/xphoto/300x240/140046637.jpg?k=53a51eede5f1bb68de7da2e8934a6ee90cc3ff71bdfd83ca9e7e7f564bdeb9af&o=' },
  { name: 'Scottsboro', distance: 307, imageUrl: 'https://cf2.bstatic.com/xdata/images/xphoto/300x240/140046606.jpg?k=aedeeb17b9d1abd50b0b7d3fa6545d0d193335c50ec28b43573694080fd73369&o=' },
  { name: 'Dothan', distance: 308, imageUrl: 'https://cf2.bstatic.com/xdata/images/xphoto/300x240/140046598.jpg?k=95ca09f9a0641cd11efd132f71fd9ed1c196b067da0e6fb28ba9ff1ece40631c&o=' },
  { name: 'Guntersville', distance: 318, imageUrl: 'https://cf2.bstatic.com/xdata/images/xphoto/300x240/140046619.jpg?k=8174e87b8ebec19ac13d2c135b5892d61f780828f7d6469c76b0eb2e9da05c4d&o=' },
]


const NextArrow = (props: any) => {
    const {  onClick } = props;
    return (
      <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 cursor-pointer text-white">
        <button onClick={onClick} className="bg-blue-600 rounded-full shadow-md p-2">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 4l8 8-8 8V4z" />
          </svg>
        </button>
      </div>
    );
  };
  
  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div className="absolute top-1/2 -left-3 transform -translate-y-1/2 z-10 cursor-pointer text-white">
        <button onClick={onClick} className="bg-blue-600 rounded-full shadow-md p-2">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 20l-8-8 8-8v16z" />
          </svg>
        </button>
      </div>
    );
  };
  
  const DestinationList: React.FC = () => {
    const settings = {
      infinite: true,
      speed: 400,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };
    


  return (
    <section className="destination-slider gap-2 my-8 px-4">
      <h2 className="text-3xl font-semibold  text-blue-600 mb-4">Quick and Easy Trip Planner</h2>
      <p className="text-lg mb-6">Pick a vibe and explore the top destinations in the United States</p>
      <Slider {...settings}>
        {destinations.map((destination, index) => (
          <div key={index} className="destination-card flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="image-container w-full h-64">
              <img src={destination.imageUrl} alt={destination.name} className="w-full rounded-md mx-2 h-full object-cover" />
            </div>
            <div className="content-container p-4 text-center">
              <h3 className="text-xl font-medium">{destination.name}</h3>
              <p className="text-gray-600">{destination.distance} Miles away</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default DestinationList;
