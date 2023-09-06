import { Button, Grid, Hidden, Typography } from "@mui/material";
import { staticData } from '../utils/constants';
import { SelfIntroduction, ServicesImageList } from ".";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import SMHome from "../images/home.jpeg";
import { HomeSlider } from "./HomeSlider";
import './Home.css';
export const HomeComponent = () => {
  const { home, buttonText } = staticData;
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <>
      <Grid container>
        <Grid item sx={{ width: '100%', height: '500px', textAlign: 'center' }}>
          <HomeSlider />
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        sx={{ flexGrow: 1, marginTop: '10px' }}
        spacing={2}
        alignItems='center'
      >
        <Grid item xs sm={6} spacing={2} marginTop={8} padding={8}>
          <Typography variant='h3' marginBottom={'20px'}>{home.tagLine}</Typography>
          <Typography variant='body1' marginBottom={'20px'}>{home.description}</Typography>
          <Typography variant='body1' marginBottom={'50px'}>{home.subDescription}</Typography>
          <Typography align='center'>
            <Button color="warning" variant="contained" size="medium">
              <a href='tel:+916304400431' className="appointment">{buttonText.bookAppointment}</a>
            </Button>
          </Typography>
        </Grid>
        <Hidden smDown>
          <Grid item xs sm={6}>
            <img src={SMHome} className='image' alt='SMBeauty parlour' />
          </Grid>
        </Hidden>
      </Grid>
      <Grid container direction="column" marginTop={8}>
        <Grid item>
          <Typography variant='h3' marginBottom={8} align='center'>{home.ourServices}</Typography>
        </Grid>
        <Grid item flexGrow={1}>
          <ServicesImageList />
        </Grid>
      </Grid>
      <Grid container direction="column" marginTop={8}>
        <Grid item>
          <Typography variant='h3' marginBottom={8} align='center'>About Me</Typography>
        </Grid>
        <Grid item>
          <SelfIntroduction />
        </Grid>
      </Grid>
    </>
  );
};
