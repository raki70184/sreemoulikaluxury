import React from "react";
import { Grid, Typography } from "@mui/material";
import "./CardPanel.css";
interface CardPanelProps {
  title: string;
  children: string | JSX.Element
}
export const CardPanel: React.FC<CardPanelProps> = (props) => {
  const { title, children } = props;
  return (
    <Grid container marginTop={2} flexDirection={"column"} marginBottom={2}>
      <Grid item xs >
        <Typography variant="h3" textAlign={"center"} marginBottom={2}>
          {title}
        </Typography>
      </Grid>
      {children}
    </Grid>
  )
};
