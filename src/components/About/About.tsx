import { Card, Grid, CardHeader, CardContent, useTheme, useMediaQuery } from "@mui/material";
import React from "react";
import ShowMoreText from "react-show-more-text";
import { SelfIntroduction } from "../Home";
import { CardPanel } from "../CardPanel";
export const About: React.FC = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [expand, setExpand] = React.useState(false);
  const onClick = () => {
    setExpand(!expand);
  };
  return <>
    <Grid container paddingLeft={sm?2:0} paddingRight={sm?2:0} textAlign={sm?"center": "left"}>
    <SelfIntroduction />
      <CardPanel title="Meet Us At The Salon">
        <Grid item xs>
          At SM, we are dedicated to bringing indulgence, comfort, and luxury right to your fingertips. From our contemporary ambiance to our extensive range of services, products, and color options, take a seat, and you might just find yourself wanting to stay all day.
        </Grid>
      </CardPanel>
      <CardPanel title="Our Values">
        <Grid container flexDirection={sm?"column":"row"}>
          <Grid item xs md={4} >
            <Card>
              <CardHeader title="Cleanliness" />
              <CardContent>
                <ShowMoreText
                  lines={4}
                  more="show more"
                  less="show less"
                  onClick={onClick}
                  expanded={expand}
                  className='text-more'
                >
                  At SM Salon, cleanliness is our top priority. We maintain strict hygiene standards, ensuring that all instruments are thoroughly cleaned, dried, and sealed for sterilization. Our tools undergo rigorous sanitization processes to provide you with a safe and germ-free environment. Your health and well-being are paramount to us.

                </ShowMoreText>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs md={4}>
            <Card>
              <CardHeader title="Quality" />
              <CardContent>we are dedicated to excellence. We take pride in providing high value service that makes our clients feel confident as soon as they walk out the door. We want our specialty to be the finishing touch to your every day look.</CardContent>
            </Card>
          </Grid>
          <Grid item xs md={4}>
            <Card>
              <CardHeader title="Customer Experience" />
              <CardContent>Customer experience is our top priority. You are the heart of our salon, and we extend the same care to you as you would to yourself. Stepping into our salon should feel like stepping into the warmth of home.</CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardPanel>

    </Grid>
  </>
};
