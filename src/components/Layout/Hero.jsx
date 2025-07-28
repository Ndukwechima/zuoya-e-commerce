import React from 'react'
import heroImg from '../../assets/featured.jpg'
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="heroImg"
        className="w-full
      md:h-[600px] lg-[750px] object-center"
      />
      <div
        className="absolute inset-0 flex 
      items-center justify-center"
      >
        <div className="text-center text-white p-6">
          <h1
            className="text-3xl md:text-8xl font-bold 
             tracking-tighter uppercase mb-4"
          >
            Elegant <br /> & <br /> Casual
          </h1>
          <p className="text-white text-sm tracking-tighter md:text-lg mb-6">
            Explore our vacation-ready outfits with fast worldwide shipping
          </p>
          <Link
            to="#"
            className="bg-white text-gray-950 
             px-6 py-2 rounded-sm text-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero