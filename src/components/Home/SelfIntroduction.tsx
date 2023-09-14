import { Grid, Hidden, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ShowMoreText from "react-show-more-text";

import Self from "../images/Self.jpg";

export const SelfIntroduction = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [expand, setExpand] = React.useState(false);
  const onClick = () => {
    setExpand(!expand);
  };
  return <Grid
    container
    direction='row'
    justifyContent='space-between'
    sx={{ flexGrow: 1, marginTop: '10px' }}
    spacing={2}
    alignItems='flex-start'
    paddingLeft={2}
    paddingBottom={2}
  >
    <Hidden smDown>
      <Grid item md={5} xs className='self-image'>
        <img src={Self} className='image' alt='SMBeauty parlour' width="300" height="auto" />
      </Grid>
    </Hidden>
    <Grid item xs md={7} className='text-more'>
      <Typography variant="body1" marginBottom={1} >Welcome to Sree Moulika Beauty Salon, a vision of beauty realized through passion and experience. Our story began with a deep-rooted love for the art of beauty and a commitment to providing exceptional services that transcend the ordinary since 2000.</Typography>
      <Typography variant="body1" marginBottom={1} >As a sister establishment to our well-established salon nearby, we draw upon years of expertise and a loyal clientele who have become part of our extended family. Guided by our founder's journey as a certified nail technician in the USA, we embarked on a new chapter to bring a luxury salon experience to life.
      </Typography>
      <ShowMoreText
        lines={1}
        more="show more"
        less="show less"
        onClick={onClick}
        expanded={expand}
        className='text-more'
      >
        Our commitment to excellence goes beyond just stunning hair, flawless nails, and captivating makeup. We prioritize your well-being, using premium products and adhering to clean and safe practices that nurture your beauty from within.

      </ShowMoreText>
    </Grid>

  </Grid>
}
