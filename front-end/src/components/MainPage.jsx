// MainPage.js

import Homepage from "./Homepage";
import Contact from "./Contact";
import Footer from "./Footer";



const MainPage = () => {
  


  return (
    <div className="main-page">
      {/* Section 1: Homepage */}
      <section className="homepage-section">
        <Homepage />
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-center">
            Check Auditorium Availability
          </h2>
          <p className="text-center">
            Click on a date to book the auditorium for a specific time slot.</p>
        </div>
      </section>

      {/* Section 2: Contact */}
      <section className="contact-section mt-12">
        <Contact />
      </section>

      {/* Section 3: Footer */}
      <section className="footer-section ">
        <Footer />
      </section>
    </div>
  );
};

export default MainPage;
