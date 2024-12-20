import { useGetTopMoviesQuery } from "../../redux/api/movies";
import MovieCard from "../../pages/Movies/MovieCard";

const TopMoviesPage = () => {
  const { data: topMovies } = useGetTopMoviesQuery();

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-5">Top Movies</h1>
      <div className="flex flex-wrap justify-center">
        {topMovies?.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default TopMoviesPage;
