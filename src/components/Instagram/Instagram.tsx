import React from "react";
import { Typography } from "@mui/material";
import {Instagram as InstagramIcon } from "@mui/icons-material";

import "./Instagram.css";

export const Instagram: React.FC = () => (
  <>
    <Typography variant="h4" align="center" marginBottom={10}>
      Follow along on{" "}
      <a
        target="blank"
        href="https://instagram.com/sm.luxe_?igshid=MzRlODBiNWFlZA=="
      >
      Instagram 
      </a>{" "}
      <InstagramIcon className="insta-icon" />
    </Typography>
  </>
);
