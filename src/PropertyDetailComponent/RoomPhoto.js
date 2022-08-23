import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import HotelImage1 from './image/c823143b4b05d76fee6dac06eb1eb106.jpeg'
import HotelImage2 from './image/2917401_19092517380081372758.jpg'
import HotelImage3 from './image/0d049274dc38372488b384688249385c.jpg'

function srcset(image, width, height, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${width * cols}&h=${
        height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
}
function RoomPhoto(){
    return (
        <ImageList
            sx={{
                width: 200,
                // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                transform: 'translateZ(0)',
                m:0
            }}
            rowHeight={140}
            gap={5}
        >
                <ImageListItem
                key={HotelImage1}
                cols={2 || 1}
                rows={1 || 1}
                
                >
                <img
                    {...srcset(HotelImage1, 208,140, 1, 2)}
                    alt={'HotelImage1'}
                    loading="lazy"
                />
                </ImageListItem>
                <ImageListItem
                key={HotelImage2}
                cols={1 || 1}
                rows={0.5 || 1}
                >
                <img
                    {...srcset(HotelImage2, 208,140, 1, 0.5)}
                    alt={'HotelImage12'}
                    loading="lazy"
                />
                </ImageListItem>
                <ImageListItem
                key={HotelImage3}
                cols={1 || 1}
                rows={0.5 || 1}
                >
                <img
                    {...srcset(HotelImage3, 208,140, 1, 0.5)}
                    alt={'HotelImage12'}
                    loading="lazy"
                />
                </ImageListItem>

            </ImageList>
    )
}
export default RoomPhoto
