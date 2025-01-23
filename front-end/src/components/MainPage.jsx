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
       
      </section>

      {/* Section 2: Contact */}
      <section className="contact-section ">
        <Contact />
      </section>

      {/* Section 3: Footer */}
      <section className="footer-section ">
        <Footer />
      </section>
    </div>
  );
};
// nice
export default MainPage;
