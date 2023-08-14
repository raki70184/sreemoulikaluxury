import { Grid, Typography } from '@mui/material';
import Self from "../images/Self.jpg";

export const SelfIntroduction = () => (
  <Grid
    container
    direction='row'
    justifyContent='space-between'
    sx={{ flexGrow: 1, marginTop: '10px' }}
    spacing={2}
    alignItems='center'
  >
    <Grid item sm={6}>
      <img src={Self} className='image' alt='SMBeauty parlour' width="500" height="5y
      00"/>
    </Grid>
    <Grid item sm={6} spacing={2} marginTop={8} padding={8}>
      <Typography variant='body1' marginBottom={'20px'}>Welcome to Sree Moulika Beauty Salon, a vision of beauty realized through passion and experience. Our story began with a deep-rooted love for the art of beauty and a commitment to providing exceptional services that transcend the ordinary since 2000.

      </Typography>
      <Typography variant='body1' marginBottom={'20px'}>As a sister establishment to our well-established salon nearby, we draw upon years of expertise and a loyal clientele who have become part of our extended family. Guided by our founder's journey as a certified nail technician in the USA, we embarked on a new chapter to bring a luxury salon experience to life.</Typography>
      <Typography variant='body1' marginBottom={'50px'}>
        Our commitment to excellence goes beyond just stunning hair, flawless nails, and captivating makeup. We prioritize your well-being, using premium products and adhering to clean and safe practices that nurture your beauty from within.</Typography>
    </Grid>

  </Grid>
)
