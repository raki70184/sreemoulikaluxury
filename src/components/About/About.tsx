import { Grid, useTheme, useMediaQuery, Typography } from "@mui/material";
import React from "react";

import { SelfIntroduction } from "../Home";
import { CardPanel } from "../CardPanel";

export const About: React.FC = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return <>
    <Grid container paddingLeft={sm ? 0 : 5}
      paddingRight={sm ? 2 : 5} textAlign={"center"}>
      <SelfIntroduction />
      <CardPanel title="Meet Us At The Salon">
        <Grid item xs>
          <Typography variant="body1">
            At SM, we are dedicated to bringing indulgence, comfort, and luxury right to your fingertips. From our contemporary ambiance to our extensive range of services, products, and color options, take a seat, and you might just find yourself wanting to stay all day.
          </Typography>
        </Grid>
      </CardPanel>
      <CardPanel title="Our Values" >
        <Grid container flexDirection={sm ? "column" : "row"} marginBottom={2}>
          <Grid item xs md={4} padding={1}  >
            <Typography variant="h5" align="center">Cleanliness</Typography>
            <Typography variant="body1">
              At SM Salon, cleanliness is our top priority. We maintain strict hygiene standards, ensuring that all instruments are thoroughly cleaned, dried, and sealed for sterilization. Our tools undergo rigorous sanitization processes to provide you with a safe and germ-free environment. Your health and well-being are paramount to us.
            </Typography>
          </Grid>
          <Grid item xs md={4} padding={1}>
            <Typography variant="h5" align="center">Quality</Typography>
            <Typography variant="body1">we are dedicated to excellence. We take pride in providing high value service that makes our clients feel confident as soon as they walk out the door. We want our specialty to be the finishing touch to your every day look.</Typography>
          </Grid>
          <Grid item xs md={4} padding={1}>
            <Typography variant="h5" align="center">Customer Experience</Typography>
            <Typography variant="body1">Customer experience is our top priority. You are the heart of our salon, and we extend the same care to you as you would to yourself. Stepping into our salon should feel like stepping into the warmth of home.</Typography>
          </Grid>
        </Grid>
      </CardPanel>
    </Grid>
  </>
};
