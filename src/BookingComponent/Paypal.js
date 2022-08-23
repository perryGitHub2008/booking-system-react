import React, { useEffect, useRef, useState } from 'react'
import { Box, Typography, Button, Paper, Divider } from "@mui/material";
import Alert from '@mui/material/Alert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Countdown from "react-countdown";
import SecurityIcon from '@mui/icons-material/Security';
import { blue } from '@mui/material/colors';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
import Modal from '@mui/material/Modal';
import moment from 'moment';
import SessionFailed from '../SessionFailed';
import PaymentSuccess from '../PaymentSuccess';

function Paypal(props) {
    const paypal = useRef()
    const axiosPrivate = useAxiosPrivate();
    const [dialog, setDialog] = useState(false);
    const [status, setStatus] = useState();
    const [message, setMessage] = useState();
    useEffect(()=>{
        window.paypal.Buttons({
            createOrder: async (data, actions, err)=>{
                try{
                    const rs = await axiosPrivate.post(`/paypal/orders/${props.offerId}/${props.room}/${props.night}`,"", {withCredentials:true})
                    return rs.data
                } catch (err){
                    console.log(err)
                    if(err.response.status===403){
                        console.log("login")
                    } else{
                        console.log("please try again later")
                    }
                }
            },
            onApprove: async (data, actions) => {
                try{ 
                           
                    const paynow = 0
                    const quantity = props.room;
                    const guest = props.adult;
                    const checkin = props.checkin;
                    const checkout = props.checkout;
                    const formatCheckIn = moment(checkin).format('DD-MM-YYYY');
                    const formatCheckOut = moment(checkout).format('DD-MM-YYYY');
                    const postData = {offerid: props.offerId,
                                        orderid:data.orderID, 
                                        paynow:paynow,
                                        quantity:quantity,
                                        guest:guest,
                                        checkin:formatCheckIn,
                                        checkout:formatCheckOut};

                    const rs = await axiosPrivate.post("/paypal/capturePayment",postData, {withCredentials:true})
                    console.log(rs)
                    
                    //const purchase_units = rs.data.purchase_units[0].payments.captures[0];
                    
                    setStatus("success")
                    setDialog(true)
                    setMessage(rs.data)
                } catch(err){
                    setStatus("fail")
                    setDialog(true)
                    setMessage(err)
                }
                
            },
            onError : (err)=> {
                setStatus("fail")
                setDialog(true)
                setMessage(err)
            }
        }).render(paypal.current)
    },[])
    const addMoreTime = () =>{
        if(!props.moreTime){
            props.setTimer(props.timer+ 5000*60*3)
            props.setMoreTime(true)
        }
    }
    const renderer = ({ minutes, seconds, completed}) => {
        if (completed) {
            // Render a complete state
            return null;
        } else {
            minutes = minutes < 10  ? ("0").concat(minutes):minutes
            seconds = seconds < 10  ? ("0").concat(seconds):seconds
            return `${minutes}:${seconds}`
        }
    }
    return (
        <Box sx={{mt:1, width:'66.7%'}}>
            <Alert 
                icon={<AccessTimeIcon/>} 
                severity="info" 
                sx={{mt:1, display:'flex', justifyContent:'flex-end', boxShadow:"0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)"}}
                >
                <Typography sx={{ width:'100%'}} component="div">                    
                    Holding Booking...   <Countdown date={props.timer} onComplete={props.timerCompleted} onTick={()=>props.setTimer(props.timer-1)} renderer={renderer} />
                    {!props.moreTime && <Button onClick={addMoreTime} color="primary" variant="contained" size="small">
                        I need more time
                    </Button>}
                </Typography>
            </Alert>
            <Paper sx={{mt:1}} elevation={3}>
                <Paper sx={{p:2, display:'flex'}} square>
                    <SecurityIcon color='primary' sx={{mr:1}} /> 
                    <b style={{color:blue[600]}}>Secure payment</b>
                    <Divider sx={{mx:2}} orientation="vertical" flexItem/>
                    <Typography sx={{mt:0.5}} variant='caption'>All card information is fully encrypted, secure and protected.</Typography>
                </Paper>
                <Box sx={{p:2}} >
                    <Box sx={{py:2}} ref={paypal}/>
                    <Typography variant='caption'>By proceeding with this booking, I agree to Agoda’s Terms of Use and Privacy Policy.</Typography>
                </Box>
                <Paper sx={{p:2, display:'flex'}} square>
                    <MarkEmailReadIcon color='primary' sx={{mr:1}} /> 
                    <Typography sx={{mt:0.5}} variant='caption'>We'll send confirmation of your booking to testing20082009@gmail.com</Typography>
                </Paper>
            </Paper>
            <Modal
                open={dialog}
                onClose={()=>setDialog(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    {status==="success"?<PaymentSuccess message={message}/>:<SessionFailed/>}
                </Box>
            </Modal>
        </Box>
    )
}

export default Paypal;


/*
https://www.sandbox.paypal.com/signin

personal
sb-odldg19265348@personal.example.com
!@Ox<1Ah

business
sb-bqd4x15238759@business.example.com
7&,?Xw?c

AXZ5puGFmgKjBRrSQ8IKJyfsAwb4JTibTskC38Kx1HN8KVVP_yR-OjoPLXQ926uRPF_Va-nk08udan7f
EEPYN1YD-UgjN5yCuxeoK8jUsu2y_jts0W7AZcHwhPJWzOFgXWJpQRaZce09tkNIw1wrQdmtJtJmomnC


                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units:[{
                        description: "hotel",
                        amount:{
                            currency_code:"HKD",
                            value:1144
                        }
                    }]
                })
*/