import React, { useState } from "react";
import { useFormspark } from "@formspark/use-formspark";

const FORMSPARK_FORM_ID = "oXJnYUe8Q"; // Your Formspark form ID

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      // Ensure all fields are filled before submitting
      if (!name || !email || !message) {
        setError("Please fill all fields before submitting.");
        return;
      }

      // Submit form data to Formspark
      await submit({ name, email, message });

      // If successful, reset form fields
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError("There was an issue submitting the form. Please try again.");
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-800  shadow-md py-16 mb-0">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
        CONTACT
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6 text-gray-500 dark:text-gray-300"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-lg text-gray-700 dark:text-gray-300">
              Koorapalayam pirivu, Erode City
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6 text-gray-500 dark:text-gray-300"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="text-lg text-gray-700 dark:text-gray-300">
              +91 7373724422
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6 text-gray-500 dark:text-gray-300"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            
            <a href="mailto:info@nandhaarts.org" className="text-lg text-gray-700 dark:text-gray-300">
              info@nandhaarts.org
            </a>
           
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-lg text-gray-700 dark:text-gray-300 mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-lg text-gray-700 dark:text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-lg text-gray-700 dark:text-gray-300 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>

          {success && (
            <p
              className="text-green-500 text-lg"
              role="alert"
              aria-live="assertive"
            >
              Your message has been successfully sent!
            </p>
          )}
          {error && (
            <p
              className="text-red-500 text-lg"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
