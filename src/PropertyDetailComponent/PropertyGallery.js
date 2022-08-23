import React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import HotelImage1 from './image/f526fd54305fe996b8759421e43ad0e5.jpg'
import HotelImage2 from './image/156060aac0346e24700d6b93e23d246b.jpg'
import HotelImage3 from './image/aeebd3540eaf7d7cb7971307a11e7ee1.jpg'
import HotelImage4 from './image/b9f4e17f65a6f874c961afdb6a3395b4.jpg'
import HotelImage5 from './image/c32db54330edbf5935858fa84cd9bb3f.jpg'
import HotelImage6 from './image/cabcf32596dd81c7fd60a94a5fc34b95.jpg'
import HotelImage7 from './image/880a1ada95dee0b4879dbab52850f854.jpg'

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({

    img: {
      '&:hover': {
        opacity: 0.5
    },
  }})
  

function PropertyGallery(){
    const style=useStyles()
    return (
        <Box sx={{ width: '100%', pt:1}}>
            <Stack direction="row" spacing={1}>
                <Box sx={{height:"288px", position:'relative'}}>
                  <Box>
                  <img className={style.img} style={{borderRadius: '5% 0 0 5%'}} src={HotelImage1} height="288px" alt=""/>
                  </Box>
                  <Box sx={{position:'absolute', bottom:'6px',right:0}}>
                    <Button variant="contained" size="small" startIcon={<PhotoCameraIcon />}>
                      See all photos
                    </Button>
                  </Box>
                  
                </Box>
                <ImageList sx={{ width:684 ,overflow: 'hidden'}} cols={3} rowHeight={140} gap={8}>
                    {itemData.map((item, index) => {
                        if(index === 2){
                            return (
                                <ImageListItem key={item.img}>
                                <img
                                    className={style.img}
                                    src={`${item.img}?w=220&h=140&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=220&h=140&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    style={{borderRadius: '0 5% 0 0', height:"140px"}}
                                    loading="lazy"
                                />
                                </ImageListItem>
                        )} else if(index===5) {
                            return (
                                <ImageListItem key={item.img}>
                                <img
                                    className={style.img}
                                    src={`${item.img}?w=220&h=140&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=220&h=140&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    style={{borderRadius: '0 0 5% 0', height:"140px"}}
                                    loading="lazy"
                                />
                                </ImageListItem>
                        )} else {
                            return (
                                <ImageListItem key={item.img}>
                                <img
                                    className={style.img}
                                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    style={{ height:"140px"}}
                                    alt={item.title}
                                    loading="lazy"
                                />
                                </ImageListItem>
                            )
                        }
                        
                    })}
                </ImageList>
            </Stack>
        </Box>
    );
}
export default PropertyGallery

const itemData = [
    {
      img: HotelImage2,
      title: 'Breakfast',
    },
    {
      img: HotelImage3,
      title: 'Burger',
    },
    {
      img: HotelImage7,
      title: 'Camera',
    },
    {
      img: HotelImage4,
      title: 'Burger',
    },
    {
      img: HotelImage5,
      title: 'Camera',
    },
    {
      img: HotelImage6,
      title: 'Camera',
    }
  ];