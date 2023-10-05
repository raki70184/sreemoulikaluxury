import React from "react";
import {
  Button,
  Grid,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { ReactComponent as manicureIcon } from "../images/MANICURE-icon.svg";
import "./Banner.css";

interface BannerProps {
  title: string;
}

export const Banner: React.FC<BannerProps> = ({ title }) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid
      className="banner"
      container
      justifyContent={"space-evenly"}
      alignItems={"center"}
      marginBottom={2}
      padding={sm ? 2 : 5}
    >
      <Grid item sm={12} md={7} className="bannerText">
        <Typography
          variant={sm ? "h6" : "h4"}
          color="white"
          textAlign={"center"}
        >
          {title}
        </Typography>
      </Grid>
      <Grid item sm={12} md={5} className="bannerButton">
        <Button
          color="warning"
          variant="contained"
          size="medium"
          fullWidth={sm}
        >
          <a href="tel:+916304400431" className="bannerAppointment">
            Book Appointment
          </a>
        </Button>
      </Grid>
    </Grid>
  );
};
