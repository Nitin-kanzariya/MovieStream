import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../../pages/Movies/MovieCard";
import { Heart } from "lucide-react";
import Footer from "./Footer";

const FavoriteMovies = () => {
  const favorites = useSelector((state) => state.favorites);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-700 pb-4">
          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold text-white">
              My Favorite Movies
            </h1>
          </div>
          <div className="text-gray-400">
            <span className="font-semibold text-white">{favorites.length}</span>
            {" movies"}
          </div>
        </div>

        {/* Content Section */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <div
                key={movie._id}
                className="transform transition duration-200 hover:scale-105"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <Heart className="w-16 h-16 text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No Favorites Yet
            </h3>
            <p className="text-gray-400 max-w-md">
              Start building your collection by adding movies you love to your
              favorites list.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FavoriteMovies;
