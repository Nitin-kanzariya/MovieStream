import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaTag } from "react-icons/fa";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../../redux/features/movies/favoritesSlice";
import toast from "react-hot-toast";

const MovieCard = ({ movie }) => {
  const { data: genres } = useFetchGenresQuery();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isLiked = favorites.some((fav) => fav._id === movie._id);

  const handleLike = () => {
    if (isLiked) {
      dispatch(removeFavorite(movie));
      toast.success(`${movie.name} removed from favorites`);
    } else {
      dispatch(addFavorite(movie));
      toast.success(`${movie.name} added to favorites`);
    }
  };

  const findGenreById = (id) => {
    const genre = genres?.find((genre) => genre._id === id);
    return genre ? genre.name : "Unknown Genre";
  };

  return (
    <>
      <div className="w-[15rem] bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.05]">
        {/* Movie Image Container */}
        <div className="relative group">
          <Link to={`/movies/${movie._id}`}>
            <img
              src={movie.image}
              alt={movie.name}
              className="w-full h-[20rem] object-cover"
            />
          </Link>

          {/* Overlay with Rating */}
          <div className="absolute top-0 left-0 right-0 p-3 flex justify-between">
            {/* Rating */}
            <div className="flex items-center bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-white text-sm font-medium">
                {movie.rating}
              </span>
            </div>
          </div>

          {/* Genre */}
          <div className="absolute bottom-3 right-3 flex items-center bg-pink-500 px-2 py-1 rounded-full">
            <FaTag className="text-gray-300 mr-1" />
            <span className="text-white text-xs uppercase tracking-wider">
              {findGenreById(movie?.genre)}
            </span>
          </div>

          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-sm rounded-full transition-all duration-300 ${
              isLiked
                ? "text-red-500 hover:text-red-600 hover:scale-110"
                : "text-white hover:text-gray-300 hover:scale-110"
            }`}
          >
            <FaHeart className="w-5 h-5" />
          </button>
        </div>

        {/* Movie Details */}
        <div className="p-4 bg-gray-900">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white truncate max-w-[10rem]">
              {movie.name}
            </h3>
            <span className="text-sm text-gray-400">{movie.year}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
