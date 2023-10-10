import React from "react";

import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Self from "../images/Self.jpg";

interface SelfIntroductionProps {}
export const SelfIntroduction: React.FC<SelfIntroductionProps> = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid
      container
      justifyContent="space-between"
      sx={{ flexGrow: 1, marginTop: "10px" }}
      spacing={2}
      alignItems={sm ? "center" : "flex-start"}
      paddingLeft={sm?0:2}
      paddingRight={2}
      paddingBottom={2}
    >
      <Grid item md={5} xs={12} className="self-image">
        <img
          src={Self}
          className="image"
          alt="SMBeauty parlour"
          width={sm?"280":"300"}
          height="auto"
        />
      </Grid>
      <Grid item xs={12} md={7} textAlign={"center"} paddingLeft={sm ? 2 : 0}>
        <Typography variant="h6" align="justify" letterSpacing={0} marginBottom={1}>
          Welcome to Sree Moulika Beauty Salon, a vision of beauty realized
          through passion and experience. Our story began with a deep-rooted
          love for the art of beauty and a commitment to providing exceptional
          services that transcend the ordinary since 2000.
        </Typography>
        <Typography variant="h6" align="justify" letterSpacing={0} marginBottom={1}>
          As a sister establishment to our well-established salon nearby, we
          draw upon years of expertise and a loyal clientele who have become
          part of our extended family. Guided by our founder's journey as a
          certified nail technician in the USA, we embarked on a new chapter to
          bring a luxury salon experience to life.
        </Typography>
        <Typography variant="h6" align="justify" letterSpacing={0}>
          Our commitment to excellence goes beyond just stunning hair, flawless
          nails, and captivating makeup. We prioritize your well-being, using
          premium products and adhering to clean and safe practices that nurture
          your beauty from within.
        </Typography>
      </Grid>
    </Grid>
  );
};
