import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl text-red-500">Unauthorized Access</h1>
      <p className="mt-2">You do not have permission to view this page.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Go to Login
      </Link>
    </div>
  );
};

export default Unauthorized;
