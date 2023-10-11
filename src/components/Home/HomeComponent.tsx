import { Button, Grid, Hidden, Typography } from "@mui/material";
import { staticData } from "../utils/constants";
import { SelfIntroduction, ServicesImageList } from ".";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import SMHome from "../images/home.jpeg";
import { HomeSlider } from "./HomeSlider";
import "./Home.css";
export const HomeComponent = () => {
  const { home, buttonText } = staticData;
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Grid container>
        <Grid item sx={{ width: "100%", height: "500px", textAlign: "center" }}>
          <HomeSlider />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        sx={{ flexGrow: 1, marginTop: "10px" }}
        spacing={2}
        alignItems="center"
        paddingLeft={sm ? 3 : 10}
        paddingRight={sm ? 0 : 10}
      >
        <Grid
          item
          xs
          container
          sm={6}
          spacing={2}
          marginTop={8}
          padding={sm ? 0 : 8}
          textAlign={sm ? "center" : "left"}
        >
          <Typography variant={sm ? "h5" : "h3"} marginBottom={"20px"}>
            {home.tagLine}
          </Typography>
          <Typography
            variant="h6"
            align="justify"
            marginBottom={"20px"}
            letterSpacing={0}
          >
            {home.description}
          </Typography>
          <Typography
            variant="h6"
            align="justify"
            letterSpacing={0}
            marginBottom={"50px"}
          >
            {home.subDescription}
          </Typography>
          <Button variant="contained" size="large" fullWidth={sm} className="bookAppointment">
            <a href="tel:+916304400431" >
              {buttonText.bookAppointment}
            </a>
          </Button>
        </Grid>
        <Hidden smDown>
          <Grid item xs sm={6} className="self-image">
            <img src={SMHome} className="image" alt="SMBeauty parlour" />
          </Grid>
        </Hidden>
      </Grid>
      <Grid
        container
        direction="column"
        marginTop={8}
        paddingLeft={sm ? 0 : 3}
        paddingRight={sm ? 0 : 3}
      >
        <Grid item>
          <Typography
            variant={sm ? "h5" : "h3"}
            marginBottom={sm ? 1 : 8}
            align="center"
          >
            {home.ourServices}
          </Typography>
        </Grid>
        <Grid item flexGrow={1}>
          <ServicesImageList />
        </Grid>
      </Grid>
      <Grid container direction="column" marginTop={8} paddingBottom={2}>
        <Grid item>
          <Typography
            variant={sm ? "h5" : "h3"}
            marginBottom={sm ? 1 : 2.5}
            align="center"
          >
            Meet Us At The Salon
          </Typography>
        </Grid>
        <Grid item>
          <SelfIntroduction />
        </Grid>
      </Grid>
    </>
  );
};
