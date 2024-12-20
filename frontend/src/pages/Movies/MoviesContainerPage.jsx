import { useEffect, useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
  useGetAllMoviesQuery
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";


const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();
  const { data: allMovies } = useGetAllMoviesQuery();
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = allMovies?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );
    
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <section className="flex flex-col items-center justify-center w-full py-12">
        {/* Choose For You Section */}
        <div className="w-full lg:max-w-[80rem] mb-16 flex flex-col items-center px-4 sm:px-6 md:px-8">
          <h1 className="mb-8 text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Choose For You
          </h1>
          <div className="w-full max-w-[80rem] bg-gray-800/50 rounded-xl p-6 shadow-lg backdrop-blur-sm">
            <SliderUtil data={randomMovies} />
          </div>
        </div>

        {/* Top Movies Section */}
        <div className="w-full lg:max-w-[80rem] mb-16 flex flex-col items-center px-4 sm:px-6 md:px-8">
          <h1 className="mb-8 text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Top Movies
          </h1>
          <div className="w-full max-w-[80rem] bg-gray-800/50 rounded-xl p-6 shadow-lg backdrop-blur-sm">
            <SliderUtil data={topMovies} />
          </div>
        </div>

        {/* Choose Movie Section */}
        <div className="w-full lg:max-w-[80rem] mb-8 flex flex-col items-center px-4 sm:px-6 md:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full mb-8 gap-6 lg:gap-0">
            <h1 className="text-3xl font-bold text-center lg:text-left bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
              Choose Movie
            </h1>
            <nav className="flex flex-wrap justify-center lg:justify-start gap-3">
              {genres?.map((g) => (
                <button
                  key={g._id}
                  onClick={() => handleGenreClick(g._id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ease-in-out border border-gray-700 ${
                    selectedGenre === g._id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-lg hover:scale-105"
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="w-full max-w-[80rem] bg-gray-800/50 rounded-xl p-6 shadow-lg backdrop-blur-sm">
            <SliderUtil data={filteredMovies} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
