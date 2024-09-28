import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
                <p className="text-2xl font-light mt-4 mb-8">Oops! The page you're looking for does not exist.</p>

                <div className="flex justify-center mb-6">
                    <svg className="w-16 h-16 text-red-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m2 6H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z" />
                    </svg>
                </div>

                <Link to="/" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                    Go Back Home
                </Link>

                <p className="mt-6 text-gray-400 text-sm">
                    If you believe this is an error, please{' '}
                    <a href="mailto:vmakksimov@gmail.com" className="underline hover:text-red-400 transition duration-300 ease-in-out">
                        contact support
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default NotFoundPage;
