import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { CarousalItem } from './CarousalItem';
import { homeImagesList, mobileImagesList } from '../utils/constants';

export const HomeSlider = () => {
  // SSR-safe: assume desktop until mounted, then re-measure.
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  useEffect(() => {
    const compute = () => setIsLargeScreen(window.innerWidth >= 768);
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const items = isLargeScreen ? homeImagesList : mobileImagesList;
  return (
    <Carousel height="500px" animation="fade" sx={{ maxWidth: 'fit-cover' }} className="carousal-wrapper">
      {items.map((item, i) => <CarousalItem key={i} item={item} />)}
    </Carousel>
  );
};
