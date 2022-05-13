import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';
function TravelerComment (){
    const commentRef = useRef([]);
    const [commentHeight, setCommentHeight] = useState(140)
    const [extraInfo, setExtraInfo] = useState(false);
    const comments = [
        { hotel: 'Meeru Island Resort & Spa', place: 'Maldives' ,comment:'Our experience was truely memorable and hastle free. All thanks to Agoda and Meeru :) ',traveler:'Kewal from India'},
        { hotel: 'Hotel Granvia Kyoto', place: 'Japan' ,comment:'Our family was traveling via bullet train between cities in Japan with our luggage - the location for this hotel made that so easy. Agoda price was fantastic.',traveler:'Diane from the United States'},
        { hotel: 'Heritage Hotel', place: 'Philippines' ,comment:'We got a great last minute rate with Agoda and this room was spacious with a comfortable and warm bed.',traveler:'Henry from Australia'}]

    const limitChar = (str, limit) => {
        const comment = str.length > limit ? `${str.slice(0, limit)}...` : str;
        const moreButton =  
                            <>
                            {comment}
                            <Button onClick={(e) => {
                            e.preventDefault()
                            setExtraInfo(true)
                            }}>More</Button>
                            </>
        return str.length > limit ? moreButton : str;
    }

    useEffect(()=>{
        var heightest = commentRef.current[0]?.offsetHeight;
        for(var i = 0 ; i < commentRef.current?.length ; i++){
            if(heightest < commentRef.current[i]?.offsetHeight){
                heightest = commentRef.current[i]?.offsetHeight
                
            }
        }
        setCommentHeight(heightest)                
    },[extraInfo])
    const limitCharLength = 100;
    useEffect(()=>{
        
    }, [commentHeight])
    const commentComponent = comments.map((comment)=>{
        return(

            <Grid item>
                <Paper elevation={3} sx={{textAlign: 'center',width:'300px',pt:2}}>
                    <Typography gutterBottom variant="h6" component={Link} to={'/'}sx={{color:"#1976d2", textDecoration: "none" }} >
                    {comment.hotel}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="div" sx={{color:"gray"}}>
                    in {comment.place}
                    </Typography>

                    <Typography py={1} ref={el => (commentRef.current?.push(el))} gutterBottom variant="h6" component="div" sx={{display: 'table-cell', verticalAlign: 'middle', height:commentHeight}}>
                    "{extraInfo ? comment.comment : limitChar(comment.comment,limitCharLength)}"
                    <br/>
                    
                    </Typography>
                    <Typography gutterBottom variant="h6" pb={2} component="div">
                    -{comment.traveler}
                    </Typography>
                </Paper>
            </Grid>
   
        );
    })
    return(
        <>
            <Typography gutterBottom align="center" variant="h4" component="div" mt={10}>
                Overheard from travelers

            </Typography>
            
            <Grid
                container
                justifyContent="center"
                sx={{ flexGrow: 1 }} 
                mt={2}
                spacing={8}

            >
                {commentComponent}

            </Grid>
            </>
    );
}

export default TravelerComment;

