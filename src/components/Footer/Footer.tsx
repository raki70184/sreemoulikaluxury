import { Grid, Hidden } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import davins from "../images/Davins.png";
import voesh from "../images/voesh.png";

import "./Footer.css";

export const Footer = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Grid
        container
        alignItems={"center"}
        spacing={3}
        justifyContent={"center"}
      >
        <Grid item marginLeft={2} textAlign="center">
          &copy; 2023 SM - The Luxe Salon <Hidden smDown> | </Hidden>
          <Hidden smUp>
            <br />
          </Hidden>
          <a href="#">Salon Policy/FAQ</a>
        </Grid>
        <Grid
          item
          container
          margin={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Hidden smDown>
            <Grid item marginLeft={2}>
              Our Premium Brands
            </Grid>
          </Hidden>
          <Grid item marginLeft={sm ? 0 : 4}>
            <img src={davins} width="150px" />
          </Grid>
          <Grid item marginLeft={sm ? 2 : 4}>
            <img src={voesh} width="200px" />
          </Grid>
          <Grid item textAlign={sm?"center":"right"} marginLeft={sm ? 0 : 4}>
            Designed & Developed with &hearts; by
            <a
              href="mailto: thriveni.aswi@gmail.com"
              title="thriveni.aswi@gmail.com"
              className="developer"
            >
              3Veni
            </a>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
