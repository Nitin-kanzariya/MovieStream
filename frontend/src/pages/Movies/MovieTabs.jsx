import { Link } from "react-router-dom";

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="mb-12">
        {userInfo ? (
          <form onSubmit={submitHandler} className="max-w-2xl">
            <div className="space-y-4">
              <label
                htmlFor="comment"
                className="block text-xl font-semibold text-gray-800 dark:text-gray-200"
              >
                Write Your Review
              </label>

              <textarea
                id="comment"
                rows="4"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                  placeholder-gray-400 dark:placeholder-gray-500
                  transition duration-200 ease-in-out"
                placeholder="Share your thoughts about the movie..."
              />
            </div>

            <button
              type="submit"
              className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 
                text-white font-medium rounded-lg transition duration-200 
                ease-in-out transform hover:scale-[1.02] focus:ring-4 
                focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 max-w-2xl">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Please{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 
                  dark:hover:text-blue-300 font-medium underline underline-offset-2"
              >
                Sign In
              </Link>{" "}
              to write a review
            </p>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Reviews
        </h2>

        {movie?.reviews.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No reviews yet. Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {movie?.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm 
                  hover:shadow-md transition-shadow duration-200 p-6 
                  border border-gray-100 dark:border-gray-700"
              >
                <div
                  className="flex flex-col sm:flex-row sm:items-center 
                  sm:justify-between gap-2 mb-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full bg-blue-100 
                      dark:bg-blue-900 flex items-center justify-center"
                    >
                      <span className="text-blue-700 dark:text-blue-300 font-medium">
                        {review.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <strong className="text-gray-900 dark:text-gray-100 font-medium">
                      {review.name}
                    </strong>
                  </div>

                  <time className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MovieTabs;
