import { Button, Grid, Hidden, Typography } from "@mui/material";
import { staticData } from "../utils/constants";
import { SelfIntroduction, ServicesImageList } from ".";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import tailoredForYou from "../images/tailoredForYou.jpeg";
import "./Home.css";
export const HomeComponent = () => {
  const { home, buttonText } = staticData;
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("md"));
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Grid
        container
        className="title-description"
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
          lg={7}
          md={12}
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
          <Button variant="contained" size="large" fullWidth={xs} className="bookAppointment">
            <a href="tel: +91 9347238248" >
              {buttonText.bookAppointment}
            </a>
          </Button>
        </Grid>
        <Hidden mdDown>
          <Grid item xs lg={5} md={12} className="tailoredForYou-image">
            <img src={tailoredForYou} className="image" alt="SMBeauty parlour"/>
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
