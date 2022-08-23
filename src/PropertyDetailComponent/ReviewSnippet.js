import React, {useState} from 'react';
import { Box, Typography, MobileStepper } from '@mui/material';
import flag from './image/bg-sprite-flags.jpg'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import IconButton from '@mui/material/IconButton';

function ReviewSnippet(props){
    const property = props.property;
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [position, setPosition] = useState(0);
    const updateIndex = (index) =>{
        console.log(reviewList().length)
        if(index<1){
            setCarouselIndex(0)
            setShowLeftButton(false)
            setShowRightButton(true)
        } else if(index >= reviewList().length-1) {
            setCarouselIndex(reviewList().length-1)
            setShowRightButton(false)
            setShowLeftButton(true)
        } else {
            setCarouselIndex(index)
            setShowRightButton(true)
            setShowLeftButton(true)
        }

        if(index<=1 && index !==reviewList().length-1){
            setPosition(index*195)
        } else if(index === reviewList().length-1){
            if(reviewList().length-1 ===1){
                setPosition(position+170)
            } else {
                setPosition(position+190)
            }
        } else if(index > 1 && index <reviewList().length-1)
            setPosition(195+(index-1)*220)
    }

    const reviewList = () =>{
        const list = []; 
        let length = 3;
        if(property.reviews.length < length){
            length = property.reviews.length
        }
        for(let i = 0 ; i < length ; i++){
            list.push(
                <Box key={i} sx={{ border: 1, width: '210px', borderColor: 'rgba(0, 0, 0, 0.12)', borderRadius: '8px', mt: 2, mr:1, pb:1}}>
                    <Box sx={{ height:'65%', backgroundColor: 'rgb(248, 247, 249)', borderRadius: '8px' }}>
                        <Typography sx={{ p: 2, mb: 1, fontSize: '12px' }}>{property.reviews[i].title}</Typography>
                    </Box>
                    <Box sx={{ pt: 1, height:'30%', position: 'relative', bottom: '10px', display: 'flex', backgroundColor: 'rgb(255, 255, 255)' }}>
                        <img style={{ marginLeft: '16px', marginRight: '8px', marginTop: '8px' }} height='16px' alt='' src={flag} />
                        <Box>
                            <Typography sx={{ fontSize: '12px' }}>{property.reviews[i].firstname}</Typography>
                            <Typography sx={{ fontSize: '12px' }}>{new Date(property.reviews[i].createdat * 1000).toLocaleDateString()}</Typography>
                        </Box>
                    </Box>
                </Box>
            )
        }
        return list;
    }
    return (
        <>
        <Box sx={{ position: 'relative', alignItems: 'center', display: 'flex', overflow: 'hidden' }}>
            {showLeftButton === true && (
                <>
                    <IconButton onClick={(e) => { updateIndex(carouselIndex - 1); } } sx={{ position: 'absolute', zIndex: '200' }} color="primary" aria-label="upload picture" component="div">
                        <ArrowCircleLeftOutlinedIcon sx={{ backgroundColor: "#fff", borderRadius: '50%' }} />
                    </IconButton>
                    <Box style={{ background: 'linear-gradient(to left, rgba(255, 255, 255, 0), rgb(255, 255, 255))', position: 'absolute', height: '100%', width: '50px', zIndex: 100 }} />
                </>
            )}
            {showRightButton === true && (
                <>
                    <IconButton onClick={(e) => { updateIndex(carouselIndex + 1); } } sx={{ position: 'absolute', right: '10px', zIndex: '200' }} color="primary" aria-label="upload picture" component="div">
                        <ArrowCircleRightOutlinedIcon sx={{ backgroundColor: "#fff", borderRadius: '50%' }} />
                    </IconButton>
                    <Box style={{ background: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255))', position: 'absolute', right: '0px', height: '100%', width: '50px', zIndex: 100 }} />
                </>
            )}
            <Box style={{ transform: `translateX(-${position}px)`, transition:'1s' }} sx={{ display: 'flex'}}>
                {reviewList()}
            </Box>
        </Box>
        <MobileStepper
            variant="dots"
            steps={reviewList().length}
            position="static"
            activeStep={carouselIndex}
            sx={{ maxWidth: 36, flexGrow: 1, marginLeft:'auto',marginRight:'auto' }} />
        </>
    )
}
export default ReviewSnippet
