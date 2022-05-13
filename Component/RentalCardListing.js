import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ImportImage from './importImage.js'

function RentalCardListing (){
    const rentalCardImages = ImportImage(require.context('./RentalSliderImage', false, /-enable\.(png|jpe?g|svg)$/));
    return (
        <Box sx={{mx: "auto", width: 910, mt:10 }}>
            <Typography gutterBottom align="center" variant="h4" component="div">
                Explore more travel vacation rentals
            </Typography>
            
            <Grid
                container
                direction="row"
                justifyContent="center"
                spacing={5}
            >
                <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={rentalCardImages[0]}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Apartments
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                156,786 properties
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={rentalCardImages[1]}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Vacation Rentals
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                517,703 properties
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={rentalCardImages[2]}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Private Villas
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                181,167 properties
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={rentalCardImages[3]}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Bungalows
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                8,801 properties
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
    
}
export default RentalCardListing;