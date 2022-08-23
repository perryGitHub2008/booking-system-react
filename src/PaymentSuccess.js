import { Box, Button } from '@mui/material'
import { grey } from '@mui/material/colors'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function PaymentSuccess(props) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <Box sx={{width:'100%', 
                    height:'100%', 
                    backgroundColor:grey[500], 
                    opacity:0.9, 
                    position:'absolute', 
                    top:0, 
                    left:0, 
                    zIndex:999999}}>
            <Dialog
                open={true}
                onClose={()=>setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Paypal Payment"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.message}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>navigate(`/`)} autoFocus>
                    OK
                </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default PaymentSuccess