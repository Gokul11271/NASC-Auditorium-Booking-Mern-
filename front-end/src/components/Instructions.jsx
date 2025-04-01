import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const InstructionsPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize(); // Get screen size for confetti

  const handleClose = () => {
    setIsOpen(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Confetti disappears after 3s
  };

  return (
    <div>
      {/* Button to Open Modal */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition transform hover:scale-105"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        How to Book?
      </motion.button>

      {/* Modal with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
              initial={{ y: 50, scale: 0.8, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -50, scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl transition-transform transform hover:scale-110"
              >
                ✖
              </button>

              <h2 className="text-2xl font-bold text-center mb-4">
                How to Book a Slot
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>Login to your account.</li>
                <li>Go to the "Booking Form" page.</li>
                <li>Select your preferred date.</li>
                <li>Choose your slot: Morning, Afternoon, or Full Day.</li>
                <li>Provide event details and submit your request.</li>
                <li>Wait for admin approval.</li>
              </ol>

              <h3 className="text-xl font-semibold mt-6">Slot Color Codes</h3>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center">
                  <span className="inline-block w-6 h-6 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
                  Morning Slot -{" "}
                  <span className="text-yellow-500 ml-1">Yellow</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-6 h-6 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                  Afternoon Slot -{" "}
                  <span className="text-blue-500 ml-1">Blue</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-6 h-6 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  Full-Day Slot - <span className="text-red-500 ml-1">Red</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti Effect 🎉🥳 */}
      {showConfetti && (
        <Confetti width={width} height={height} numberOfPieces={3500} />
      )}
    </div>
  );
};

export default InstructionsPopup;
