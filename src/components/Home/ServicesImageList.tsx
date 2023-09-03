import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { ImageServiceList } from '../utils';

export const ServicesImageList = () => {
  return (
    <ImageList cols={4} gap={8}>
      {ImageServiceList.map((item) => (
        <ImageListItem key={item.img}>
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
            position="below"
            sx={{marginTop: '16px'}}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
