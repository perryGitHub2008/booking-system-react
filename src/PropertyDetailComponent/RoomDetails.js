import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { grey, green, red} from '@mui/material/colors';
import { Button, Typography } from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import BoyOutlinedIcon from '@mui/icons-material/BoyOutlined';
import NumberFormat from 'react-number-format';
import{Link} from 'react-router-dom'

function RoomDetails(props){
    const offerList = (array) =>{
        return array.map((item)=>{
            return item.id;
        })
    }
    const includeList = props.room.offer.map((offer,index)=>{
        const benefitList = {includeList:[], optionalList:[]}
        const includeList = []
        const optionalList = []
        offer.benefit.map((benefit,sIndex)=>{
            if(benefit.type==='include')
            {   
                includeList.push(
                <Box key={sIndex} sx={{display:'flex'}}>
                    <CheckCircleOutlinedIcon sx={{fontSize:'13px', mt:'3px', color:green[500]}}/>
                    <Typography variant="caption"  component="p" sx={{ml:2}}>
                    {benefit.name}
                    </Typography>
                </Box>
                )
            } else if(benefit.type==='optional'){
                optionalList.push(
                <Box  key={sIndex} sx={{display:'flex'}}>
                    <CheckCircleOutlinedIcon sx={{fontSize:'13px', mt:'3px', color:green[500]}}/>
                    <Typography variant="caption"  component="p" sx={{ml:2}}>
                    {benefit.name} HKD {benefit.price}
                    </Typography>
                </Box>
                )
            }
        })
        benefitList.includeList = includeList;
        benefitList.optionalList = optionalList;
        return benefitList;
    })

    return (
        props.room.offer.map((offer,index)=>{
            return(
                <TableContainer key={index} component={Paper}>
                    <Table sx={{ width: 840 }} aria-label="simple table">
                        <TableHead>
                        <TableRow sx={{backgroundColor:grey[200]}}>
                            <TableCell>Benefits</TableCell>
                            <TableCell align="right">Sleeps</TableCell>
                            <TableCell align="right">Price per night</TableCell>
                            <TableCell colSpan={2} align="right">Most booked</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                            key={1}
                            sx={{ '&:last-child td': { borderLeft: `1px solid ${grey[300]}` } }}
                            >
                            <TableCell sx={{width:'40%'}} component="th" scope="row">
                            {includeList[index].includeList.length > 0 &&
                            <Typography sx={{fontSize:'13px'}}>Your price includes:</Typography>
                            }
                            {includeList[index].includeList}
                            {includeList[index].optionalList.length > 0 &&
                                <><Typography sx={{fontSize:'13px'}}>Optional benefit:</Typography>
                                {includeList[index].optionalList}</>
                            }
                            </TableCell>
                            <TableCell align='center' sx={{width:'10%'}}>
                                <Box sx={{display:'flex'}}>
                                    <BoyOutlinedIcon fontSize='large'/>
                                    <BoyOutlinedIcon fontSize='large' sx={{ml:-2.5}}/>
                                    <BoyOutlinedIcon fontSize='small' sx={{ml:-2 ,mt:1.5}} />
                                </Box>
                                <Typography variant="caption"  component="p">
                                {offer.kid} kid under {offer.kidage+1} years stays FREE!
                                </Typography>
                            </TableCell>
                            <TableCell sx={{width:'20%'}} align="right">
                                <Typography sx={{color: red[500], fontSize:24}}>
                                <NumberFormat value={offer.price} displayType={'text'} thousandSeparator={true} prefix={'HKD '} />
                                </Typography>
                            </TableCell>
                            <TableCell sx={{width:'10%'}} align="right">
                                <Typography align='center' sx={{backgroundColor:grey[200], border:`1px solid ${grey[300]}`,width:'100%',py:1}} variant="caption"  component="div">
                                1
                                </Typography>
                            </TableCell>
                            <TableCell align='justify' sx={{width:'20%',verticalAlign:'top'}} >
                                {offerList(props.offer).includes(offer.id) ?
                                (<Button 
                                    sx={{width:'100%',py:3}} 
                                    variant="contained"
                                    component={Link}
                                    to={{
                                        pathname: `/book?offerID=${offer.id}&room=${props.roomSelect.Room}&adult=${props.roomSelect.Adults}&checkin=${props.checkInOut[0]}&checkout=${props.checkInOut[1]}`,
                                        state: 123
                                    }}
                                    >
                                    Reserve
                                </Button>) : <div style={{textAlign:'center'}}>Booking Full</div>
                                }
                            </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        })
    )
}
export default RoomDetails
