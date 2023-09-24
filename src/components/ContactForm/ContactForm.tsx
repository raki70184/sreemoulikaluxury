import React, { useState } from "react";
import { Button, Grid, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import "./ContactForm.css"; // Import the CSS file for styles

interface FormData {
  customerName: string;
  phoneNumber: string;
  email: string;
  message: string;
  scheduledDate: string | null;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    customerName: "",
    phoneNumber: "",
    email: "",
    message: "",
    scheduledDate: null
  });

  const handleFormSubmit = () => {

    const { customerName, phoneNumber, email, message, scheduledDate } = formData;
    const subject = "Contact Form Submission";
    const body = `Name: ${customerName}\n Phone Number: ${phoneNumber}\n Email: ${email}\n Message: ${message}\n ScheduledDate: ${scheduledDate}`;
    const mailtoLink = `mailto:test@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid container flexDirection={"row"} padding={2} textAlign={sm?"center":"left"}>
      <Grid item>
        <Typography variant="h3">Let's Get in Touch!</Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption">We're here to help you look and feel your best. Contact us with any questions, to schedule an appointment, or to provide feedback.</Typography>
      </Grid>
      <Grid item container flexDirection={"column"} marginTop={2} className="contact-form" paddingRight={sm?0:2}>
        {/* <form id="contact-form"> */}
          <Grid  container flexDirection={"row"} >
            <Grid item xs={12} sm={6} paddingRight={sm?0:2} paddingBottom={sm?2:0}>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Your Name"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}> 
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />

            </Grid>
          </Grid>
          <Grid  container flexDirection={"row"} >
            <Grid item xs={12} sm={6} paddingRight={sm?0:2} paddingBottom={sm?2:0}>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                label="Scheduled Date"
                value={formData.scheduledDate}
                sx={{width: "100%"}}
                onChange={(e) =>
                    setFormData({ ...formData, scheduledDate: e })} />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid item >
            <TextField
              id="outlined-multiline-flexible"
              label="Comment"
              multiline
              maxRows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              fullWidth
              required
            />
          </Grid>
          <Grid item marginTop={2}>
            <Button color="warning" variant="contained" size="medium" fullWidth={sm} onClick={handleFormSubmit}>
              <a href='tel:+916304400431' className="appointment">Book Appointment</a>
            </Button>
          </Grid>
        {/* </form> */}
      </Grid>
    </Grid>
  );
};

export default ContactForm;
