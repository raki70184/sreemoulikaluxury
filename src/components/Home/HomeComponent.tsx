import { Button, Grid, Typography } from "@mui/material";
import { staticData } from '../utils/constants';
import { SelfIntroduction, ServicesImageList } from ".";
import SMHome from "../images/home.jpeg";
import { HomeSlider } from "./HomeSlider";
import './Home.css';
export const HomeComponent = () => {
  const { home, buttonText } = staticData;
  return (
    <>
    <Grid container>
      <Grid item sx={{width: '100%', height: '500px', textAlign: 'center'}}>
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
        <Grid item sm={6} spacing={2} marginTop={8} padding={8}>
          <Typography variant='h3' marginBottom={'20px'}>{home.tagLine}</Typography>
          <Typography variant='body1' marginBottom={'20px'}>{home.description}</Typography>
          <Typography variant='body1' marginBottom={'50px'}>{home.subDescription}</Typography>
          <Typography align='center'><Button color="warning" variant="contained" size="medium">{buttonText.bookAppointment}</Button></Typography>
        </Grid>
        <Grid item sm={6}>
          <img src={SMHome} className='image' alt='SMBeauty parlour' />
        </Grid>
      </Grid>
      <Grid container direction="column" marginTop={8} padding={8}>
        <Grid item>
          <Typography variant='h3' marginBottom={8} align='center'>{home.ourServices}</Typography>
        </Grid>
        <Grid item>
          <ServicesImageList />
        </Grid>
      </Grid>
      <Grid container direction="column" marginTop={8} padding={8}>
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
