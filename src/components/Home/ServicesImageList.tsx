import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ImageServiceList } from "../utils";

export const ServicesImageList = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/services");
  };
  return (
    <ImageList cols={sm ? 1 : 4} gap={8}>
      {ImageServiceList.map((item) => (
        <ImageListItem
          key={item.img}
          className="serviceImage"
          onClick={clickHandler}
        >
          <img
            src={item.img}
            srcSet={item.img}
            alt={item.title}
            loading="lazy"
            width="100"
            height="100"
          />
          <ImageListItemBar
            title={item.title}
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
