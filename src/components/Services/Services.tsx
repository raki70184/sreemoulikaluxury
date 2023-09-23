import { Grid, Typography } from "@mui/material";
import React from "react";
import { IconText } from "../IconText";
import { ReactComponent as HairIcon } from "../images/hair-style.svg";
import { ReactComponent as HairCut } from "../images/hair-cut.svg";
import { ServicesList } from "../utils";
import { CardPanel } from "../CardPanel";
export const Services = () => {
  return (
    <Grid container justifyContent={"space-evenly"} alignItems={"baseline"} flexDirection={"row"}>
      {ServicesList.map((item: any) => {
        return <IconText text={item.title} Icon={item.img} isNails={item.nailsEnhancement}>
          <ul className='serviceList'>
            {item.list.map((itemList: string) => (<li>{itemList}</li>))}
          </ul>
          
          { item.nailsEnhancement?.length > 0 && <><hr className="borderSpacing "/>
            <Grid container justifyContent={"space-evenly"} alignItems={"baseline"} flexDirection={"row"}> 
            { item.nailsEnhancement.map((nails: any) => {
            return <IconText text={nails.name}>
            <ul className='serviceList'>
              {nails.list.map((itemList: string) => (<li>{itemList}</li>))}
            </ul>
            </IconText>})}
            </Grid>
            </>
          }
        </IconText>
      })}
    </Grid>
  )
};
