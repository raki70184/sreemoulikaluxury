import { Grid, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import "./Footer.css";

export const Footer = () => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Grid
            container
            direction='row'
            bgcolor='#f3ede8'
            justifyContent="space-between"
            paddingBottom={2}
            paddingLeft={sm ? 20 : 1}
            paddingRight={sm ? 10 : 1}
            paddingTop={2}
        >
            <Grid item>
                <div className="left1">
                    <Typography variant="h4" marginBottom={1}>Email</Typography>
                    <Typography variant="body1">glamteam.sreemoulika@gmail.com</Typography>
                </div>
                <div className="left1">
                    <Typography variant="h4" marginBottom={1}>Address</Typography>
                    <Typography variant="body1" noWrap>
                        #304, Jain Balaji BigTown Mall, <br />
                        Safilguda, Malkajgiri, <br />
                        Hyderabad, Telangana - 500047</Typography>
                </div>
            </Grid>
            <Grid item>
                <Typography variant="h4" marginBottom={1}>Services</Typography>
                <ul>
                    <li><a href="#">Hair Treatment</a></li>
                    <li><a href="#">Hair Services</a></li>
                    <li><a href="#">Hair Spa</a></li>
                    <li><a href="#">Glamour Services</a></li>
                    <li><a href="#">Nails Services</a></li>
                    <li><a href="#">Makeup</a></li>
                    <li><a href="#">Manicure</a></li>
                    <li><a href="#">Pedicure</a></li>
                </ul>
            </Grid>
            <Grid item>
                <Typography variant="h4" marginBottom={1}>Bussiness Hours</Typography>
                <ul>
                    <li>Monday : 11.00 - 08.00</li>
                    <li>Tuesday : 11.00 - 08.00</li>
                    <li>Wednesday : 11.00 - 08.00</li>
                    <li>Thursday : 11.00 - 08.00</li>
                    <li>Friday : 11.00 - 08.00</li>
                    <li>Saturday : 11.00 - 08.00</li>
                    <li>Sunday : 11.00 - 08.00</li>
                    <li>Working all days for you.</li>
                </ul>
            </Grid>
        </Grid>
    )
}