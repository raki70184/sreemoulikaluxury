import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Alert,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LoadingButton } from "@mui/lab";

import { PostDetailsUrl } from "../utils/constants";

import "./ContactForm.css"; // Import the CSS file for styles

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  schedule: string | null;
}

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  message: "",
  schedule: null,
};

const ContactForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(
    null
  ) as React.MutableRefObject<HTMLFormElement>;
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handlePhoneChange = (e:any) => {
    // Remove non-digit characters from the input
    const sanitizedInput = e.target.value.replace(/\D/g, '');

    // Check if the input is a number and has a length of 10
    if (/^\d{0,10}$/.test(sanitizedInput)) {
      setFormData({ ...formData, phone: sanitizedInput });
    }
  };
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const submitHanlder = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(form.current.action, {
      method: form.current.method,
      body: new FormData(form.current),
    })
      .then((response) => {
        setSubmitted(response.ok);
        setFormData(initialFormData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message) 
        setIsLoading(false);
      });
  };

  return (
    <>
      {submitted ? (
        <Grid
          container
          alignItems={"center"}
          textAlign={"center"}
          justifyContent={"center"}
          spacing={3}
          marginTop={2}
        >
          <Grid item>
            <Alert severity="success" sx={{ fontStyle: "italic" }}>
              The information has been submitted successfully !
            </Alert>
          </Grid>
          <Grid item sx={{ fontStyle: "italic" }}>
            DM{" "}
            <a
              target="blank"
              className="instagram"
              href="https://instagram.com/sm.luxe_?igshid=MzRlODBiNWFlZA=="
            >
              @sm.luxe_
            </a>{" "}
            for any other queries !!
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          flexDirection={"row"}
          padding={2}
          textAlign={sm ? "center" : "left"}
        >
          <Grid item>
            <Typography variant="h3">Let's Get in Touch!</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" marginTop={2} marginBottom={2}>
              We're here to help you look and feel your best. Contact us with
              any questions, to schedule an appointment, or to provide feedback.
            </Typography>
          </Grid>
          <form
            id="contact-form"
            style={{ width: "100%" }}
            ref={form}
            action={PostDetailsUrl}
            method="POST"
            onSubmit={submitHanlder}
          >
            <Grid
              item
              container
              flexDirection={"column"}
              marginTop={2}
              className="contact-form"
              paddingRight={sm ? 0 : 2}
            >
              <Grid container flexDirection={"row"}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  paddingRight={sm ? 0 : 2}
                  paddingBottom={sm ? 2 : 0}
                >
                  <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    type="tel"
                  />
                </Grid>
              </Grid>
              <Grid container flexDirection={"row"}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  paddingRight={sm ? 0 : 2}
                  paddingBottom={sm ? 2 : 0}
                >
                  <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Email"
                    name="email"
                    value={formData.email}
                    type="email"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      slotProps={{
                        textField: {
                          inputProps: {
                            name: "schedule",
                          },
                        },
                      }}
                      label="Appointment Date"
                      value={formData.schedule}
                      sx={{ width: "100%" }}
                      onChange={(e) =>
                        setFormData({ ...formData, schedule: e })
                      }
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Comment"
                  multiline
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item marginTop={2} className="appointment">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  sx={{ borderRadius: "10px" }}
                  fullWidth={sm}
                  loading={isLoading}
                  loadingIndicator="Submitting..."
                  size="large"
                >
                  Schedule Your Visit
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      )}
    </>
  );
};

export default ContactForm;
