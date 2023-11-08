import React from "react";
import { Grid, useTheme, useMediaQuery, Typography } from "@mui/material";
import SpaSharpIcon from "@mui/icons-material/SpaSharp";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

import { SelfIntroduction } from "../Home";
import { CardPanel } from "../CardPanel";
import "./About.css";

export const About: React.FC = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Grid container paddingLeft={sm ? 0 : 2} textAlign={"center"}>
        <SelfIntroduction isAbout />
        <CardPanel title="Our Values">
          <Grid
            container
            flexDirection={sm ? "column" : "row"}
            marginBottom={2}
            className="about-wrapper"
          >
            <Grid item xs md={4} padding={2}>
              <SpaSharpIcon className="icon-color" />
              <Typography
                variant="h4"
                fontWeight={"bold"}
                align="center"
                marginBottom={2}
              >
                Cleanliness
              </Typography>
              <Typography variant="h6" align="justify" letterSpacing={0}>
                At SM Salon, cleanliness is our top priority. We maintain strict
                hygiene standards, ensuring that all instruments are thoroughly
                cleaned, dried, and sealed for sterilization. Our tools undergo
                rigorous sanitization processes to provide you with a safe and
                germ-free environment. Your health and well-being are paramount
                to us.
              </Typography>
            </Grid>
            <Grid item xs md={4} padding={2}>
              <StarOutlinedIcon className="icon-color" />
              <Typography
                variant="h4"
                fontWeight={"bold"}
                align="center"
                marginBottom={2}
              >
                Quality
              </Typography>
              <Typography variant="h6" align="justify" letterSpacing={0}>
                We are dedicated to excellence. We take pride in providing high
                value service that makes our clients feel confident as soon as
                they walk out the door. We want our specialty to be the
                finishing touch to your every day look.
              </Typography>
            </Grid>
            <Grid item xs md={4} padding={2}>
              <FavoriteOutlinedIcon className="icon-color" />
              <Typography
                variant="h4"
                fontWeight={"bold"}
                align="center"
                marginBottom={2}
              >
                Customer Experience
              </Typography>
              <Typography variant="h6" align="justify" letterSpacing={0}>
                Customer experience is our top priority. You are the heart of
                our salon, and we extend the same care to you as you would to
                yourself. Stepping into our salon should feel like stepping into
                the warmth of home.
              </Typography>
            </Grid>
          </Grid>
        </CardPanel>
      </Grid>
    </>
  );
};
