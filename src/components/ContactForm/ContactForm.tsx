import React, { useState } from "react";
import "./ContactForm.css"; // Import the CSS file for styles

interface FormData {
  customerName: string;
  phoneNumber: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    customerName: "",
    phoneNumber: "",
    email: "",
    message: "",
  });

  const handleFormSubmit = () => {
    const { customerName, phoneNumber, email, message } = formData;
    const subject = "Contact Form Submission";
    const body = `Name: ${customerName}\nPhone Number: ${phoneNumber}\nEmail: ${email}\nMessage: ${message}`;
    const mailtoLink = `mailto:test@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

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
            <form id="contact-form">
              <div className="section-1">
                <div className="input-group">
                  <input
                    type="text"
                    id="user-name"
                    name="customerName"
                    className="form-input"
                    placeholder="Your Name"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="tel"
                    id="user-phone"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    className="form-input"
                    placeholder="Phone Number"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <input
                  type="email"
                  id="user-email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="form-input"
                  placeholder="Your E-mail"
                  required
                />
              </div>
              <div className="message-group">
                <textarea
                  id="user-message"
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="message-input"
                  placeholder="Your Message"
                  rows={4}
                  required
                />
              </div>

              <div className="input-group">
                <button
                  type="button"
                  id="submit-btn"
                  className="submit-button"
                  onClick={handleFormSubmit}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
        <script src="https://smtpjs.com/v3/smtp.js"></script>
        
      </div>
    </section>
  );
};

export default ContactForm;
