import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import IconButton from '@mui/material/IconButton';
import {useEffect, useRef, useState} from 'react'
import './NoScrollBar.css';
import CircleIcon from '@mui/icons-material/Circle';
import ImportImage from './importImage.js'
function BannerBar (){
  const bannerElRef = useRef();
  const [scrollerY, setScrollerY] = useState(0)

  const scrollRight = () => {
    if(scrollerY+908>=bannerElRef.current.scrollWidth){
      setScrollerY(bannerElRef.current.scrollWidth-908)
    } else {
      setScrollerY(scrollerY+908)
    }
  }
  const scrollLeft = () => {
    
    if(scrollerY-908<=0){
      setScrollerY(0)
    } else {
      setScrollerY(scrollerY-908)
    }
  }
  useEffect(()=>{
    bannerElRef.current.scrollTo({left:scrollerY, behavior: 'smooth'})

  },[scrollerY])
  
  
  const bannerImages = ImportImage(require.context('./BannerImage', false, /-enable\.(png|jpe?g|svg)$/));
  
  const bannerImageList = bannerImages.map((bannerImage)=>{
      return <Paper elevation={3} sx={{backgroundImage:`url(${bannerImage})`, backgroundSize: '438px 137px', backgroundRepeat:'no-repeat'}}/>
  })

  const bannerNavigator = () =>{
    const icon = []
    const totalPage = bannerImages.length/2
    for(var i = 0 ; i < totalPage ; i++){
      if(scrollerY/908 === i){
        icon.push(<CircleIcon  color="primary" sx={{fontSize: 15 }}/>)
      } else {
        icon.push(<CircleIcon  color="disable" sx={{fontSize: 15 }}/>)
      }
    }
    return (
      <Box sx={{display: 'flex',mx: "auto", width: totalPage*15 }}>
        {icon}
      </Box>
    );
  }
  return (
  <>
  <Box sx={{mx: "auto", width: 910, pt:13}}>
    <IconButton onClick={scrollLeft} sx={{position:'absolute',ml:1,mt:'60px'}} color="primary" aria-label="upload picture" component="span">
      <ArrowCircleLeftIcon/> 
    </IconButton>
    <IconButton onClick={scrollRight} sx={{position:'absolute',ml:'860px',mt:'60px'}} color="primary" aria-label="upload picture" component="span">
        <ArrowCircleRightIcon/> 
      </IconButton>
    <Box
      className='Banner'
      sx={{
        display: 'flex',
        overflowX: 'scroll',
        paddingBottom: '15px',
        '& > :not(style)': {
          m: 1,
          width: '438px',
          height: '137px',
          flex: '0 0 438px'
        }
      }}
      ref={bannerElRef}
    >        
      {bannerImageList}
    </Box>
    {bannerNavigator()}
  </Box>      

  </>
  );
}

export default BannerBar;