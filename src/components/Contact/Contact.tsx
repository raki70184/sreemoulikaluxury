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
    <Grid
      container
      direction={"row"}
      justifyContent="space-evenly"
    >
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
    </Grid>
  );
};
