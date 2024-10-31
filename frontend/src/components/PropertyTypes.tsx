// src/components/PropertyTypes.tsx
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type PropertyType = {
  name: string;
  iconUrl: string;
};

const propertyTypes: PropertyType[] = [
  { name: 'Hotels', iconUrl: 'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=' },
  { name: 'Apartments', iconUrl:'https://r-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o='  },
  { name: 'Serviced Apartment', iconUrl:'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o='  },
  { name: 'Villas', iconUrl:'https://q-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o='  },
 
  { name: 'Cabins', iconUrl: 'https://r-xx.bstatic.com/xdata/images/hotel/263x210/52979454.jpeg?k=6ac6d0afd28e4ce00a8f817cc3045039e064469a3f9a88059706c0b45adf2e7d&o=' },
  { name: 'Cottage', iconUrl:'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450074.jpeg?k=7039b03a94f3b99262c4b3054b0edcbbb91e9dade85b6efc880d45288a06c126&o='  },
  { name: 'Lodge', iconUrl: 'https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450073.jpeg?k=795a94c30433de1858ea52375e8190a962b302376be2e68aa08be345d936557d&o=' }
];

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 cursor-pointer text-blue-600">
      <button onClick={onClick} className="bg-white rounded-full shadow-md p-2">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 4l8 8-8 8V4z" />
        </svg>
      </button>
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 cursor-pointer text-blue-600">
      <button onClick={onClick} className="bg-white rounded-full shadow-md p-2">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 20l-8-8 8-8v16z" />
        </svg>
      </button>
    </div>
  );
};

const PropertyTypes: React.FC = () => {
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
  
  const useSlider = propertyTypes.length > 3;

  return (
    <section className="property-types px-4 py-8 my-8">
      <h2 className="text-3xl font-semibold  text-blue-600 mb-6">Browse by Property Type</h2>
      <div className="slider-container property-grid gap-2">
        {useSlider ? (
          <Slider {...settings} >
            {propertyTypes.map((type, index) => (
              <div key={index} className="property-card bg-white shadow-md overflow-hidden">
                <img src={type.iconUrl} alt={type.name} className="mx-2 w-full rounded-md h-45 object-cover" />
                <h3 className="text-lg font-medium text-center py-4">{type.name}</h3>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {propertyTypes.map((type, index) => (
              <div key={index} className="property-card bg-white shadow-md rounded-lg overflow-hidden">
                <img src={type.iconUrl} alt={type.name} className="w-full h-45 object-cover" />
                <h3 className="text-lg font-medium text-center py-4">{type.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyTypes;
