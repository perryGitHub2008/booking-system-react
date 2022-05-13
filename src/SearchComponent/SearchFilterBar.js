import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import RatingChip from './RatingChip';
import QuarantineChip from './QuarantineChip';
import PriceChip from './PriceList';
import SearchIcon from '@mui/icons-material/Search';

function SearchFilterBar(){

    return (
        <Grid 
        container 
        justifyContent="center"
        alignItems="center"
        sx={{p:2,boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)'}}
        >
            <Grid item xs={0.5}>Filter</Grid>
            <Grid item xs={1.1}><QuarantineChip/></Grid>
            <Grid item xs={0.5}><PriceChip/></Grid>
            <Grid item xs={1}><RatingChip/></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search"
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>
                    }}/>
            </Grid>

        </Grid>
    );
}

export default SearchFilterBar;
