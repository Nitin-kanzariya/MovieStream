import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminMoviesList = () => {
  const { data: movies = [], refetch } = useGetAllMoviesQuery();
  const [deletingMovieId, setDeletingMovieId] = useState(null);

  const handleDeleteMovie = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      setDeletingMovieId(id); // Set loading state for this movie
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/v1/movies/delete-movie/${id}`,
          {
            withCredentials: true, // Include credentials if required
          }
        );

        if (response.data.success) {
          toast.success(response.data.message || "Movie deleted successfully!");
          refetch(); // Refresh the movies list
        } else {
          toast.error(response.data.message || "Deletion failed!");
        }
      } catch (error) {
        console.error("Error deleting movie:", error);
        toast.error(error.response?.data?.message || "Failed to delete movie");
      } finally {
        setDeletingMovieId(null); // Reset loading state
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto px-4 py-8 bg-gray-300 min-h-screen mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Movies Management
              <span className="text-gray-500 ml-3">({movies.length})</span>
            </h1>
            <Link
              to="/admin/movies/create"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-md"
            >
              Add New Movie
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative">
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute top-0 right-0 m-4 bg-black/50 text-white px-3 py-1 rounded">
                    <span className="text-sm font-medium">Admin</span>
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 truncate">
                    {movie.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {movie.detail}
                  </p>

                  <div className="flex justify-between items-center">
                    <Link
                      to={`/admin/movies/update/${movie._id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm font-semibold"
                    >
                      Edit Movie
                    </Link>
                    <button
                      className={`px-4 py-2 rounded-md text-white text-sm font-semibold ${
                        deletingMovieId === movie._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      } transition-colors duration-300`}
                      onClick={() => handleDeleteMovie(movie._id)}
                      disabled={deletingMovieId === movie._id}
                    >
                      {deletingMovieId === movie._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {movies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No movies found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminMoviesList;
