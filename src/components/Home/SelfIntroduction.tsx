import React from "react";

import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { nailTechnician, familyImage } from "../images/WebsiteImages";
import { CldImage } from "../CldImage";

interface SelfIntroductionProps {
  isAbout?: boolean;
}
export const SelfIntroduction: React.FC<SelfIntroductionProps> = ({
  isAbout,
}) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid
      container
      justifyContent="space-between"
      sx={{ flexGrow: 1, marginTop: "10px" }}
      spacing={2}
      alignItems={sm ? "center" : "flex-start"}
      paddingLeft={sm ? 0 : 2}
      paddingRight={2}
      paddingBottom={sm ? 2 : 4}
    >
      {isAbout ? (
        <>
          <Grid item md={5} xs={12} className="technician-image">
            <CldImage
              publicId={nailTechnician}
              className="image"
              alt="SM Luxe Salon — nail care by certified technician"
              widths={[320, 480, 640, 800]}
              sizes="(max-width: 600px) 280px, 400px"
              width={sm ? 280 : 400}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            textAlign={"center"}
            paddingLeft={sm ? 2 : 0}
          >
            <Typography
              variant="h6"
              align="justify"
              letterSpacing={0}
              marginBottom={1}
            >
              Welcome to SM Luxury Salon, a vision of beauty realized
              through passion and experience. Our story began with a deep-rooted
              love for the art of beauty and a commitment to providing
              exceptional services that transcend the ordinary since 2000.
            </Typography>
            <Typography
              variant="h6"
              align="justify"
              letterSpacing={0}
              marginBottom={1}
            >
              As a sister establishment to our well-established salon nearby, we
              draw upon years of expertise and a loyal clientele who have become
              part of our extended family. Guided by our founder's journey as a
              certified nail technician in the USA, we embarked on a new chapter
              to bring a luxury salon experience to life.
            </Typography>
            <Typography variant="h6" align="justify" letterSpacing={0}>
              Our commitment to excellence goes beyond just stunning hair,
              flawless nails, and captivating makeup. We prioritize your
              well-being, using premium products and adhering to clean and safe
              practices that nurture your beauty from within.
            </Typography>
          </Grid>
        </>
      ) : (
        <>
          <Grid item md={5} xs={12} className="family-image" paddingLeft={2}>
            <CldImage
              publicId={familyImage}
              className="image"
              alt="SM Luxe Salon family-friendly experience"
              widths={[320, 480, 640, 800, 1000]}
              sizes="(max-width: 600px) 400px, 500px"
              width={sm ? 400 : 500}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h6" align="justify" letterSpacing={0}>
              At SM, we are dedicated to bringing indulgence, comfort, and
              luxury right to your fingertips. From our contemporary ambiance to
              our extensive range of services, products, and color options, take
              a seat, and you might just find yourself wanting to stay all day.
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
};
