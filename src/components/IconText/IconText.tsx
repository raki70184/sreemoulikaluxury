import React from "react";
import {
  Grid,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface IconTextProps {
  text: string;
  children: React.ReactNode;
  Icon?: any;
  isNails?: boolean;
}
export const IconText: React.FC<IconTextProps> = ({
  text,
  Icon,
  children,
  isNails,
}) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={isNails ? 12 : 4}
      textAlign={"center"}
      marginBottom={3}
      flexDirection={sm ? "column" : "row"}
    >
      <Grid
        item
        flexDirection={"column"}
        alignItems={"center"}
        className="svgIcon"
      >
        {Icon && (
          <SvgIcon
            component={Icon}
            inheritViewBox
            width="100px"
            height="100px"
          />
        )}
        <Typography variant="h5" fontWeight={"bold"} marginTop={2} marginBottom={1}>
          {text}
        </Typography>
      </Grid>
      <Grid item>{children}</Grid>
    </Grid>
  );
};
