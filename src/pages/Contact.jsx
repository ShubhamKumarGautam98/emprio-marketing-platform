import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Footer from "../components/Footer";
import "./Contact.css";

export default function Contact() {

  const location = useLocation();
  const formRef = useRef();

  const [vw, setVw] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  /* ===============================
     RESPONSIVE DETECTION
  =============================== */

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);

    emailjs.init("fxl7XczeaeiA-8doV");

    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ===============================
     AUTO-FILL EMAIL FROM FOOTER
  =============================== */

  useEffect(() => {
    if (location.state?.email) {
      setFormData((prev) => ({
        ...prev,
        email: location.state.email,
      }));
    }
  }, [location.state]);

  const isMobile = vw < 768;

  /* ===============================
     FORM INPUT HANDLER
  =============================== */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ===============================
     FORM SUBMISSION
  =============================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    const file = formRef.current.resume.files[0];

    /* Resume size limit */
    if (file && file.size > 5 * 1024 * 1024) {
      alert("Resume must be smaller than 5MB");
      return;
    }

    setLoading(true);
    setSent(false);

    emailjs
      .sendForm(
        "service_92zz08e",
        "template_jtkpqou",
        formRef.current,
        "fxl7XczeaeiA-8doV"
      )
      .then(() => {

        setSent(true);
        setLoading(false);

        /* Reset state */
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        /* Reset form */
        formRef.current.reset();

      })
      .catch((error) => {
        console.error("Email error:", error);
        setLoading(false);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <>
      <section className="contact-wrapper">

        <h1 className="contact-heading">
          GET IN TOUCH <br /> WITH US
        </h1>

        <div className="contact-divider" />

        <div className={`contact-content ${isMobile ? "mobile" : ""}`}>

          {/* LEFT INFO */}

          <div className="contact-info">

            <div className="contact-block">
              <span className="contact-label">ADDRESS</span>
              <p>
                5th Floor, DLF Two Horizon Centre,
                <br />
                DLF Phase 5, Sector 43,
                <br />
                Gurugram, Haryana 122009
              </p>
            </div>

            <div className="contact-block">
              <span className="contact-label">EMAIL</span>
              <p>business@emprio.in</p>
            </div>

            <div className="contact-block">
              <span className="contact-label">PHONE</span>
              <p>(+91)-9211388919</p>
            </div>

            <p className="contact-note">
              FILL OUT THE FORM AND OUR
              <br />
              SPECIALIST WILL CONTACT YOU
              <br />
              AS SOON AS POSSIBLE
            </p>

          </div>

          {/* RIGHT FORM */}

          <div className="contact-form-container">

            <form
              ref={formRef}
              className="contact-form"
              onSubmit={handleSubmit}
            >

              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
              />

              {/* Resume Upload */}

              <label className="contact-upload-label">
                Upload Resume (PDF / DOC)
              </label>

              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                className="contact-file"
              />

              <textarea
                name="message"
                placeholder="Your Message *"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "SEND MESSAGE"}
              </button>

              {sent && (
                <p className="success-message">
                  Message sent successfully. We'll contact you soon.
                </p>
              )}

            </form>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}