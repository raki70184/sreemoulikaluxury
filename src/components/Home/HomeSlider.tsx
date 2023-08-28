import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { CarousalItem } from './CarousalItem';
import {ImageServiceList} from '../utils/constants';

export const HomeSlider = () => {

    return (
        <Carousel height="500px" animation="fade" sx={{maxWidth: 'fit-cover'}} className="carousal-wrapper">
            {
                ImageServiceList.map( (item, i: any) => <CarousalItem key={i} item={item} /> )
            }
        </Carousel>
    )
}