import React from "react";
import "./ContactForm.css"; // Import the CSS file for styles

const ContactForm: React.FC = () => {
  return (
    <section id="schedule-appointment">
      <div className="Contact-us">
        <div className="Header-Section">
          <div className="Header-text">Let's Get in Touch!</div>
          <div className="SubHeader-text">
            We're here to help you look and feel your best. Contact us with any
            questions, to schedule an appointment, or to provide feedback.
          </div>
        </div>
        <div className="form-container">
          <div className="form-wrapper">
            <form id="contact-form" method="POST" name="google-sheet">
              <div className="section-1">
                <div className="input-group">
                  <input
                    type="text"
                    id="user-name"
                    name="customerName"
                    className="form-input"
                    placeholder="Your name*"
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    id="user-name"
                    name="Phone Number"
                    className="form-input"
                    placeholder="Phone Number*"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <input
                  type="email"
                  id="user-email"
                  name="email"
                  className="form-input"
                  placeholder="Your E-mail"
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="Message"
                  id="user-email"
                  name="message"
                  className="form-input"
                  placeholder="Your Message"
                  required
                />
              </div>

              <div className="input-group">
                <button type="submit" id="submit-btn" className="submit-button">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
