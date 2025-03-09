import React from "react";
import mensCollectionImage from "../../assets/mens-collection.webp";
import womensCollectionImage from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div
        className="container mx-auto flex flex-col 
        md:flex-row gap-8"
      >
        {/* Women collection */}
        <div className="relative flex-1">
          <img
            src={womensCollectionImage}
            alt="Women's Collection Img"
            className="w-full h-[700px] object-cover"
          />
          <div
            className="absolute bottom-8 left-8 bg-white 
          bg-opaccity-90 p-4"
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Women's Collection
            </h1>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
    {/* Men's collection */}
        <div className="relative flex-1">
          <img
            src={mensCollectionImage}
            alt="Men's Collection Img"
            className="w-full h-[700px] object-cover"
          />
          <div
            className="absolute bottom-8 left-8 bg-white 
          bg-opaccity-90 p-4"
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Men's Collection
            </h1>
            <Link
              to="/collections/all?gender=Men"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
