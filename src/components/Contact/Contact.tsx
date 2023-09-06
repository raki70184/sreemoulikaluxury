import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import "./Contactstyles.css";
import ContactForm from "../ContactForm/ContactForm";

export const Contact = () => {
  return (
    <Grid container direction={"row"} justifyContent="space-evenly">
      <Grid item xs={6}>
        <ContactForm />
      </Grid>
      <Grid item xs={4} className="contact-grid">
        <div className="contact-header">CONTACT INFO</div>
        <div className="contact-Info">
          <div className="address-header">ADDRESS:</div>
          <div className="address-text">
            <PlaceIcon className="place-icon" />
            <div className="address">
              304, Jain Balaji BigTown Mall, Safilguda, <br />
              Malkajgiri, Hyderabad - 500047 (T.S.)
            </div>
          </div>
          <div className="phone-header">PHONE:</div>
          <div className="telephone-text">
            <PhoneOutlinedIcon className="telephone-icon" />
            <div className="phone-number"> +91 6304400431</div>
          </div>
          <div className="email-header">EMAIL:</div>
          <div className="email-text">
            <EmailOutlinedIcon className="email-icon" />
            <div className="email"> glamteam.sreemoulika@gmail.com</div>
          </div>

          <div className="working-header">WORKING HOURS:</div>
          <div className="working-text">
            <AccessTimeOutlinedIcon className="working-icon" />
            <div className="working-hours">
              Monday to Sunday: <br /> 11:00 am - 09:00 pm
            </div>
          </div>
        </div>
      </Grid>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2618.8006068220047!2d78.53551060705429!3d17.459856918259312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9ba7ce90eeed%3A0xa1dd86151c8e19ff!2sJains%20Balaji%20Big%20Town!5e0!3m2!1sen!2sus!4v1693796290194!5m2!1sen!2sus"
          
          width={1100}
          height="450"
          style={{
            border: 0,
          }}
          loading="lazy"
        ></iframe>
      </div>
    </Grid>
  );
};
