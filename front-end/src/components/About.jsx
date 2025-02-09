import React from "react";

const AboutUs = () => {
  const developers = [
    {
      name: "Gokul R",
      description:
        "A skilled frontend developer with expertise in React, MongoDB, and UI/UX design. Gokul has been instrumental in ensuring the project’s responsiveness and user-friendliness.",
    },
    {
      name: "Moni N ",
      description:
        "Focused on backend development and database management. Moni played a critical role in designing and optimizing the booking system’s backend.",
    },
    {
      name: "Sachin",
      description:
        "A creative thinker with a knack for problem-solving. Sachin contributed to integrating real-time functionality and improving overall system performance.",
    },
    {
      name: "Ilakkeshwaran G",
      description:
        "Specialized in testing and debugging, Ilakkeshwaran ensured the project runs smoothly across all platforms, maintaining high-quality standards.",
    },
    {
      name: "Muthuraj N",
      description:
        "An all-rounder who contributed to both frontend and backend, Muthuraj provided innovative ideas that enhanced the user experience.",
    },
  ];

  return (
    <div className="bg-gray-100 text-gray-800 font-sans p-6 rounded-lg max-w-4xl mx-auto shadow-lg">
      <h1 className="text-center text-2xl font-bold mb-6 text-blue-600">
        Developers Batch 2022-2025 B.Sc. Computer Science
      </h1>
      {developers.map((dev, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="text-lg font-semibold text-gray-900">{dev.name}</div>
          <div className="mt-2 text-sm text-blue-500">{dev.description}</div>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
