import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import ContactForm from "../ContactForm/ContactForm";
import { Banner } from "../Banner/Banner";

import "./Contactstyles.css";

export const Contact = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  return (<>
    <Banner title="Feel like having a chat or setting up an appointment? We're all ears and here to make it happen with a warm welcome!" />
    <Grid container flexDirection={"row"} alignItems="space-between" paddingLeft={sm ? 3 : 10}
      paddingRight={sm ? 3 : 10}>
      <Grid item sm={12} md={6}>
        <ContactForm />
      </Grid>
      <Grid item container flexDirection={"column"} sm={12} md={6} spacing={3} paddingLeft={sm ? 1 : 5} textAlign={sm ? "center" : "left"}>
        <Grid item>
          <Typography variant="h5">CONTACT INFO</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" paddingBottom={1}>WORKING HOURS:: </Typography>
          <Typography variant="body1">
            <AccessTimeOutlinedIcon className="icon" />
            Monday to Friday: 11:00 AM - 08:00 PM
          </Typography>
          <Typography variant="body1">
            <AccessTimeOutlinedIcon className="icon" />
            Saturday & Sunday: 10:00 AM - 8:30 PM
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">PHONE: </Typography>
          <Typography variant="body1"><PhoneOutlinedIcon className="icon" />+91 6304400431 </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">EMAIL: </Typography>
          <Typography variant="body1"><EmailOutlinedIcon className="icon" />glamteam.sreemoulika@gmail.com</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">ADDRESS: </Typography>
          <Typography variant="body1">
            <PlaceIcon className="icon" />
            <>304, Jain Balaji BigTown Mall, Safilguda, <br />
              Malkajgiri, Hyderabad - 500047 (T.S.) </>
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} marginTop={10} marginBottom={10}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2618.8006068220047!2d78.53551060705429!3d17.459856918259312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9ba7ce90eeed%3A0xa1dd86151c8e19ff!2sJains%20Balaji%20Big%20Town!5e0!3m2!1sen!2sus!4v1693796290194!5m2!1sen!2sus"

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
