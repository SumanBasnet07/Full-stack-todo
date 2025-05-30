import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/login"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-blue-700 transition"
        >
          Login 
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
