import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.success) {
        alert(`${result.role} login successful`);
        if (email === "admin@example.com") {
          navigate("/admin.");
        } else {
          navigate("/bookingform");
        }
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Failed to login. Please try again later.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 overflow-hidden">
      {/* Background Animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-50 animate-flow z-0"></div>
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-pink-400 opacity-30 animate-bounce-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-yellow-300 opacity-30 animate-spin-slow"></div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 animate-fadeIn">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isRegistering ? "Admin Login" : "User Login"}
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            ullapo.
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-600 underline"
          >
            Switch to {isRegistering ? "User Login" : "Admin Login"}
          </button>
          
        </div>
      </div>
    </div>
  );
};




export default Login;
