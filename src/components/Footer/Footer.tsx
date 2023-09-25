import { Grid, Hidden } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import davins from "../images/Davins.png";
import voesh from "../images/voesh.png";

import "./Footer.css";

export const Footer = () => {
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    return (<>
        <Grid container alignItems={"center"} spacing={3} justifyContent={"center"}>
            <Grid item>
                &copy; 2023 SM - The Luxe Salon | <a href="#">Salon Policy/FAQ</a>
            </Grid>
            <Grid item container justifyContent={"space-evenly"} padding={2} alignItems={"center"}>
                <Hidden smDown><Grid item>Our Premium Brands</Grid></Hidden>
                <Grid item><img src={davins} width='150px' /></Grid>
                <Grid item><img src={voesh} width='200px'/></Grid>
            <Grid item textAlign={"right"} >
                Designed & Developed with &hearts; by <a href="mailto: thriveni.aswi@gmail.com" title="thriveni.aswi@gmail.com" className="developer">3Veni</a>
            </Grid>
            </Grid>
        </Grid>
    </>
    )
}