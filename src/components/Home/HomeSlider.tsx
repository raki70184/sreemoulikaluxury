import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { CarousalItem } from './CarousalItem';
import { homeImagesList, mobileImagesList } from '../utils/constants';

export const HomeSlider = () => {
  const isLargeScreen = window.innerWidth >= 768;

  return (
    <Carousel height="500px" animation="fade" sx={{ maxWidth: 'fit-cover' }} className="carousal-wrapper">
      {isLargeScreen ? (
        // Display ImageServiceList for screen width over 768px
        homeImagesList.map((item, i: any) => <CarousalItem key={i} item={item} />)
      ) : (
        // Display ImageNew for screen width below 768px
        mobileImagesList.map((item, i: any) => <CarousalItem key={i} item={item} />)
      )}
    </Carousel>
  );
};
