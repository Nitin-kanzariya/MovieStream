import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import { Search, Film } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import banner from "../../assets/banner3.jpg";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";

import Footer from "./Footer";
const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    sort: "",
  });

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    setFilters({ ...filters, genre: "", year: "", sort: "" });
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));
    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleGenreClick = (genreId) => {
    if (!genreId) {
      setFilters({ ...filters, genre: "" });
      dispatch(setFilteredMovies(data || []));
      return;
    }

    setFilters({ ...filters, genre: genreId, year: "", sort: "" });
    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
  };

  const handleYearChange = (year) => {
    if (!year) {
      setFilters({ ...filters, year: "" });
      dispatch(setFilteredMovies(data || []));
      return;
    }

    setFilters({ ...filters, year, genre: "", sort: "" });
    const filterByYear = data.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption) => {
    if (!sortOption) {
      setFilters({ ...filters, sort: "" });
      dispatch(setFilteredMovies(data || []));
      return;
    }

    setFilters({ ...filters, sort: sortOption, genre: "", year: "" });
    let sortedMovies;
    switch (sortOption) {
      case "new":
        sortedMovies = newMovies;
        break;
      case "top":
        sortedMovies = topMovies;
        break;
      case "random":
        sortedMovies = randomMovies;
        break;
      default:
        sortedMovies = data;
    }
    dispatch(setFilteredMovies(sortedMovies));
  };

  return (
    <div className="min-h-screen bg-gray-900 mt-16">
      {/* Hero Section */}
      <div
        className="relative h-[600px] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900"></div>

        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-white">
              Discover<span className="text-blue-500"> Movies</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light">
              Explore thousands of movies, from latest releases to timeless
              classics.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="absolute mt-[260px] w-full max-w-4xl mx-auto px-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Search for movies..."
                    value={moviesFilter.searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-3">
                  <select
                    className="h-12 px-4 rounded-xl bg-white/10 border border-gray-700 text-white cursor-pointer hover:bg-white/20 transition-colors"
                    value={filters.genre}
                    onChange={(e) => handleGenreClick(e.target.value)}
                  >
                    <option value="">All Genres</option>
                    {genres?.map((genre) => (
                      <option key={genre._id} value={genre._id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>

                  <select
                    className="h-12 px-4 rounded-xl bg-white/10 border border-gray-700 text-white cursor-pointer hover:bg-white/20 transition-colors"
                    value={filters.year}
                    onChange={(e) => handleYearChange(e.target.value)}
                  >
                    <option value="">Year</option>
                    {uniqueYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>

                  <select
                    className="h-12 px-4 rounded-xl bg-white/10 border border-gray-700 text-white cursor-pointer hover:bg-white/20 transition-colors"
                    value={filters.sort}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value="">All Movies</option>
                    <option value="new">New Movies</option>
                    <option value="top">Top Movies</option>
                    <option value="random">Random Movies</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="mx-[110px]">
        <div className="container mt-[-150px] mx-auto px-6 pt-24 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies?.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>

          {filteredMovies?.length === 0 && (
            <div className="text-center py-20">
              <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl text-gray-400">No movies found</h3>
              <p className="text-gray-600 mt-2">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
      <hr className="my-8 border-t border-gray-700" />

      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default AllMovies;

// original code

// import { useGetAllMoviesQuery } from "../../redux/api/movies";
// import { useFetchGenresQuery } from "../../redux/api/genre";
// import {
//   useGetNewMoviesQuery,
//   useGetTopMoviesQuery,
//   useGetRandomMoviesQuery,
// } from "../../redux/api/movies";
// import MovieCard from "./MovieCard";
// import { useEffect } from "react";
// import { Search } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import banner from "../../assets/banner3.jpg";
// import {
//   setMoviesFilter,
//   setFilteredMovies,
//   setMovieYears,
//   setUniqueYears,
// } from "../../redux/features/movies/moviesSlice";

// const AllMovies = () => {
//   const dispatch = useDispatch();
//   const { data } = useGetAllMoviesQuery();
//   const { data: genres } = useFetchGenresQuery();
//   const { data: newMovies } = useGetNewMoviesQuery();
//   const { data: topMovies } = useGetTopMoviesQuery();
//   const { data: randomMovies } = useGetRandomMoviesQuery();

//   const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

//   // console.log('data', data);
//   const movieYears = data?.map((movie) => movie.year);
//   const uniqueYears = Array.from(new Set(movieYears));

//   useEffect(() => {
//     dispatch(setFilteredMovies(data || []));
//     dispatch(setMovieYears(movieYears));
//     dispatch(setUniqueYears(uniqueYears));
//   }, [data, dispatch]);

//   console.log("moviesFilter", moviesFilter);
//   const handleSearchChange = (e) => {
//     dispatch(setMoviesFilter({ searchTerm: e.target.value }));

//     const filteredMovies = data.filter((movie) =>
//       movie.name.toLowerCase().includes(e.target.value.toLowerCase())
//     );

//     dispatch(setFilteredMovies(filteredMovies));
//   };

//   const handleGenreClick = (genreId) => {
//     const filterByGenre = data.filter((movie) => movie.genre === genreId);
//     dispatch(setFilteredMovies(filterByGenre));
//   };

//   const handleYearChange = (year) => {
//     const filterByYear = data.filter((movie) => movie.year === +year);
//     dispatch(setFilteredMovies(filterByYear));
//   };

//   const handleSortChange = (sortOption) => {
//     switch (sortOption) {
//       case "new":
//         dispatch(setFilteredMovies(newMovies));
//         break;
//       case "top":
//         dispatch(setFilteredMovies(topMovies));
//         break;
//       case "random":
//         dispatch(setFilteredMovies(randomMovies));
//         break;

//       default:
//         dispatch(setFilteredMovies([]));
//         break;
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem]">
//       <>
//         <section>
//           <div
//             className="relative h-[50rem] w-screen mb-10 flex items-center justify-center bg-cover"
//             style={{ backgroundImage: `url(${banner})` }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>

//             <div className="relative pt-32 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
//               <div className="text-center">
//                 <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight">
//                   Play<span className="text-blue-500">Box</span>
//                 </h1>
//                 <p className="text-xl font-bold md:text-2xl text-gray-300 max-w-2xl mx-auto">
//                   Cinematic Odyssey: Unveiling the Magic of Movies
//                 </p>
//               </div>
//             </div>

//             <section className="absolute -bottom-[5rem]">
//               <div className="relative">
//                 <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   className="w-full h-12 pl-12 pr-4 rounded-full bg-white border border-gray-700 text-gray placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                   placeholder="Search for movies..."
//                   value={moviesFilter.searchTerm}
//                   onChange={handleSearchChange}
//                 />
//               </div>

//               <section className="sorts-container mt-[2rem] ml-[10rem]  w-[30rem]">
//                 <select
//                   className="border p-2 rounded-lg text-black"
//                   value={moviesFilter?.selectedGenre}
//                   onChange={(e) => handleGenreClick(e.target.value)}
//                 >
//                   <option value="">Genres</option>
//                   {genres?.map((genre) => (
//                     <option key={genre._id} value={genre._id}>
//                       {genre.name}
//                     </option>
//                   ))}
//                 </select>

//                 <select
//                   className="border p-2 rounded-lg ml-4 text-black"
//                   value={moviesFilter?.selectedYear}
//                   onChange={(e) => handleYearChange(e.target.value)}
//                 >
//                   <option value="">Year</option>
//                   {uniqueYears.map((year) => (
//                     <option key={year} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>

//                 <select
//                   className="border p-2 rounded-lg ml-4 text-black"
//                   value={moviesFilter?.selectedSort[0]}
//                   onChange={(e) => handleSortChange(e.target.value)}
//                 >
//                   <option value="">Sort By</option>
//                   <option value="new">New Movies</option>
//                   <option value="top">Top Movies</option>
//                   <option value="random">Random Movies</option>
//                 </select>
//               </section>
//             </section>
//           </div>

//           <section className="mt-[10rem] w-screen flex justify-center items-center flex-wrap">
//             {filteredMovies?.map((movie) => (
//               <MovieCard key={movie._id} movie={movie} />
//             ))}
//           </section>
//         </section>
//       </>
//     </div>
//   );
// };

// export default AllMovies;
