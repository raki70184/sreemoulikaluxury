import React from 'react';
import { Grid, SvgIcon, Typography, useMediaQuery, useTheme } from '@mui/material';

import { ReactComponent as manicureIcon } from "../images/MANICURE-icon.svg";
import "./Banner.css";

interface BannerProps {
  title: string;
}

export const Banner: React.FC<BannerProps> = ({title}) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid className='banner' flexDirection={"row-reverse"} container justifyContent={"space-evenly"} alignItems={"center"} marginBottom={2}>
       <Grid item className='bannerSvg' >
        <SvgIcon component={manicureIcon} inheritViewBox width="500px" height="500px" />
        </Grid>
        <Grid item >
            <Typography variant="body1"> Welcome to Sree Moulika Luxury Parlour</Typography>
            <Typography variant={sm?"h4":"h1"} color='white'> {title}</Typography>
        </Grid>
        
    </Grid>
  );
}
