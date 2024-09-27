import React from 'react';
import { Link } from 'react-router-dom';

const HomeComponent: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-[75vh]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-white via-red-800 to-yellow-800 text-white py-20 text-center">

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to the Casino App
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Experience the best way to play and simulate!
        </p>
        <Link
          to="/play"
          className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100"
        >
          Get Started
        </Link>
      </div>

      {/* Features Section */}
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Features</h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore what our app has to offer.
          </p>
        </div>

        {/* Centered Features */}
        <div className="mt-10 flex justify-center gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xs">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Play Mode</h3>
            <p className="text-gray-600">
              Engage in setting real bets and win real cash.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xs">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Simulation</h3>
            <p className="text-gray-600">
              Run simulations to analyze strategies and improve gameplay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
