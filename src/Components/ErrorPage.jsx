import { FiHome } from "react-icons/fi";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 text-center">
      <h1 className="text-9xl font-extrabold text-gray-300 mb-6">404</h1>

      <h2 className="text-4xl font-bold text-gray-800 mb-2">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        <FiHome className="mr-2" size={20} />
        Go to Home
      </Link>

      <img
        src="https://i.ibb.co/ck1SGFJ/404-Illustration.png"
        alt="404 Illustration"
        className="mt-12 w-1/2 max-w-sm md:max-w-md"
      />
    </div>
  );
};

export default ErrorPage;
