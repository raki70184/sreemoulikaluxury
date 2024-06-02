import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import ContactForm from "../ContactForm/ContactForm";

import "./Contactstyles.css";

export const Contact = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {/* <Banner title="Feel like having a chat or setting up an appointment? We're all ears and here to make it happen with a warm welcome!" /> */}
      <Grid
        container
        flexDirection={"row"}
        alignItems="space-between"
        paddingLeft={sm ? 3 : 5}
        paddingRight={sm ? 3 : 5}
      >
        <Grid item sm={12} md={6}>
          <ContactForm />
        </Grid>
        <Grid
          item
          container
          flexDirection={"column"}
          sm={12}
          md={6}
          spacing={3}
          paddingLeft={sm ? 1 : 5}
          textAlign={sm ? "center" : "left"}
          marginTop={0.75}
        >
          <Grid item>
            <Typography variant="h4">
              CONTACT INFO
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" paddingBottom={1}>
              WORKING HOURS::{" "}
            </Typography>
            <Typography variant="h6">
              <AccessTimeOutlinedIcon className="icon" />
              Monday to Friday: 11:00 AM - 09:00 PM
            </Typography>
            <Typography variant="h6">
              <AccessTimeOutlinedIcon className="icon" />
              Saturday & Sunday: 10:00 AM - 9:00 PM
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">PHONE: </Typography>
            <Typography variant="h6">
              <PhoneOutlinedIcon className="icon" />
              +91 9347238248
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">EMAIL: </Typography>
            <Typography variant="h6">
              <EmailOutlinedIcon className="icon" />
              smluxesalon@gmail.com
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">ADDRESS: </Typography>
            <Typography variant="h6">
              <PlaceIcon className="icon" />
              <>
                Jain Balaji BigTown Mall, Shop No 304, 3rd Floor<br />
                Safilguda, Malkajgiri, Hyderabad - 500047 (T.S.){" "}
              </>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} marginTop={10} marginBottom={10}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.99724007655!2d78.53380847526489!3d17.459846200713518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9bdfc8647bbb%3A0x631bc3accc77af0e!2sSM%20LUXURY%20SALON!5e0!3m2!1sen!2sus!4v1702131032378!5m2!1sen!2sus"
            width={"100%"}
            height="400"
            style={{
              border: 0,
            }}
            loading="lazy"
          />
        </Grid>
      </Grid>
    </>
  );
};
