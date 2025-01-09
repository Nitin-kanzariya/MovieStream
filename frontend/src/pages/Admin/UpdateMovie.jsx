import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { Star } from "lucide-react";
import toast from "react-hot-toast";

const UpdateMovie = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: "",
    rating: 0,
    genre: "",
    tier: "silver",
  });

  const [modifiedFields, setModifiedFields] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data: initialMovieData } = useGetSpecificMovieQuery(id);
  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();
  const [updateMovie] = useUpdateMovieMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  useEffect(() => {
    if (initialMovieData) {
      const formattedData = {
        ...initialMovieData,
        cast: Array.isArray(initialMovieData.cast)
          ? initialMovieData.cast
          : initialMovieData.cast.split(",").map((item) => item.trim()),
      };
      setMovieData(formattedData);
      setModifiedFields({});
    }
  }, [initialMovieData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "year") {
      // Ensure that only a 4-digit number is allowed
      if (value.length <= 4 && /^[0-9]*$/.test(value)) {
        newValue = parseInt(value) || "";
      } else {
        // If the value exceeds 4 digits or is not numeric, keep the previous value
        newValue = movieData.year;
      }
    }

    if (initialMovieData) {
      const initialValue = initialMovieData[name];
      let hasChanged = false;

      if (name === "cast") {
        // Normalize backend cast (array to string)
        const normalizedBackendCast = initialMovieData.cast
          .map((item) => item.trim()) // Trim spaces from each item
          .join(","); // Join array into a comma-separated string

        // Normalize input cast (input string to array and then back to string)
        const normalizedInputCast = value
          .split(",") // Split by commas
          .map((item) => item.trim()) // Trim spaces from each element
          .join(","); // Join back into a comma-separated string

        // Log for debugging
        console.log("Backend Cast (normalized):", normalizedBackendCast);
        console.log("Input Cast (normalized):", normalizedInputCast);

        // Compare the normalized values
        hasChanged = normalizedInputCast !== normalizedBackendCast;
      } else {
        // For other fields, perform a direct comparison
        hasChanged = newValue !== initialValue;
      }

      if (hasChanged) {
        console.log(`Field "${name}" has changed.`);
        setModifiedFields((prev) => ({
          ...prev,
          [name]: true,
        }));
      } else {
        console.log(`Field "${name}" has not changed.`);
        const updatedModifiedFields = { ...modifiedFields };
        delete updatedModifiedFields[name];
        setModifiedFields(updatedModifiedFields);
      }
    }

    // Update the state with the new value
    setMovieData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      setModifiedFields((prev) => ({ ...prev, image: true }));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setSelectedVideo(file);
    if (file) {
      setModifiedFields((prev) => ({ ...prev, video: true }));
    }
  };

  const handleRatingChange = (rating) => {
    setMovieData((prev) => ({ ...prev, rating }));

    if (initialMovieData && initialMovieData.rating !== rating) {
      setModifiedFields((prev) => ({
        ...prev,
        rating: true,
      }));
    } else {
      const updatedModifiedFields = { ...modifiedFields };
      delete updatedModifiedFields.rating;
      setModifiedFields(updatedModifiedFields);
    }
  };

  const handleCastChange = (e) => {
    let castValue = e.target.value;
    setMovieData((prev) => ({
      ...prev,
      cast: castValue, // Do not trim the value immediately
    }));
  };

  const handleUpdateMovie = async () => {
    try {
      if (
        Object.keys(modifiedFields).length === 0 &&
        !selectedImage &&
        !selectedVideo
      ) {
        toast.info("No changes detected");
        return;
      }

      const formData = new FormData();

      Object.keys(modifiedFields).forEach((field) => {
        if (field === "cast") {
          formData.append("cast", JSON.stringify(movieData.cast));
        } else if (field === "detail") {
          formData.append("detail", movieData.detail.trim());
        } else {
          formData.append(field, movieData[field]);
        }
      });

      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      if (selectedVideo) {
        formData.append("video", selectedVideo);
      }

      console.log("Modified fields:", Object.keys(modifiedFields));
      formData.forEach((value, key) => {
        console.log("Sending:", key, value);
      });

      setLoading(true);
      const response = await axios.put(
        `http://localhost:3000/api/v1/movies/update-movie/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Movie updated successfully!");
        setTimeout(() => {
          window.location.href = "/admin/movies-list";
        }, 1000); // Added delay for toast visibility
      } else {
        toast.error(response.data.message || "Update failed!");
      }
    } catch (error) {
      console.error("Error updating movie:", error);
      toast.error(error.response?.data?.message || "Failed to update movie");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMovie = async () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        setLoading(true);
        const response = await axios.delete(
          `http://localhost:3000/api/v1/movies/delete-movie/${id}`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          toast.success(response.data.message || "Movie deleted successfully!");
          setTimeout(() => {
            window.location.href = "/admin/movies-list";
          }, 1000); // Added delay for toast visibility
        } else {
          toast.error(response.data.message || "Deletion failed!");
        }
      } catch (error) {
        console.error("Error deleting movie:", error);
        toast.error(error.response?.data?.message || "Failed to delete movie");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-950 p-6 mt-12">
        <div className="max-w-7xl mx-auto bg-gray-900 rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-gray-700">
            Update Movie
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Movie Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={movieData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                  placeholder="Enter movie name"
                />
              </div>

              {/* Year Input */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Year:
                </label>
                <input
                  type="number"
                  name="year"
                  value={movieData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                  placeholder="Enter release year"
                  min="1900"
                  max={new Date().getFullYear()}
                  maxLength="4"
                />
              </div>

              {/* Genre Select */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Genre
                </label>
                <select
                  name="genre"
                  value={movieData.genre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                >
                  {isLoadingGenres ? (
                    <option>Loading genres...</option>
                  ) : (
                    genres?.map((genre) => (
                      <option key={genre._id} value={genre._id}>
                        {genre.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Cast Input */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Cast (comma-separated):
                </label>
                <input
                  type="text"
                  name="cast"
                  value={movieData.cast}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                  placeholder="Enter cast names"
                />
              </div>

              {/* Rating Stars - update the onClick handler */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Rating
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                      <Star
                        key={star}
                        size={24}
                        className={`cursor-pointer transition-colors ${
                          star <= (hoveredRating || movieData.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-400"
                        }`}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => handleRatingChange(star)}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-300">
                    {hoveredRating > 0 ? hoveredRating : movieData.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Movie Details */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Movie Details
                </label>
                <textarea
                  name="detail"
                  value={movieData.detail}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Enter movie description"
                />
              </div>

              {/* Tier Select */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Tier
                </label>
                <select
                  name="tier"
                  value={movieData.tier}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                >
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                  <option value="platinum">Platinum</option>
                </select>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Update Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"
                />
                {movieData.image && !selectedImage && (
                  <p className="mt-2 text-sm text-gray-400">
                    {/* Current image: {movieData.image.split("/").pop()} */}
                  </p>
                )}
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Update Video
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"
                />
                {movieData.video && !selectedVideo && (
                  <p className="mt-2 text-sm text-gray-400">
                    {/* Current video: {movieData.video.split("/").pop()} */}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex space-x-4">
            <button
              type="button"
              onClick={handleUpdateMovie}
              disabled={loading}
              className="flex-1 bg-teal-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update Movie"
              )}
            </button>
            <button
              type="button"
              onClick={handleDeleteMovie}
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
            >
              Delete Movie
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateMovie;
