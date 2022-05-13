import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CheckInCheckOutPicker from '../Component/CheckInCheckOutPicker';
import DestinationAutoComplete from '../Component/DestinationAutoComplete';
import RoomSelector from '../Component/RoomSelector';
import SearchFilterBar from './SearchFilterBar';
import PropertyList from './PropertyList';
import{Link} from 'react-router-dom'
import { useState } from 'react';

function SearchView(props){
    const [destination, setDestination] = useState({ code: 'HK', label: 'Hong Kong', phone: '852' })
    const setDestinationCallback = (country) =>{
        setDestination(country)
    }
    return (
        <Grid container sx={{width:'1900px'}}>
            <Grid item xs={12}>
                <Grid 
                container 
                justifyContent="center"
                alignItems="center"
                sx={{py:1, background:'rgb(158, 158, 158,.3)'}}
                >
                    <Grid item xs={2}>
                        <DestinationAutoComplete setDestinationCallback={setDestinationCallback}/>
                    </Grid>
                    <Grid item xs={2} sx={{ml:1}}>
                        <CheckInCheckOutPicker/>
                    </Grid>
                    <Grid item xs={2}sx={{ml:1}}>
                        <RoomSelector/>
                    </Grid>
                    <Grid item xs={1} >
                        <Button 
                        variant="contained" 
                        sx={{ml:3,height:'56px', width:'100%'}}
                        component={Link} 
                        to={{
                            pathname: `/search?country=${destination['code']}`,
                            state:123 
                            }}
                        >Search</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <SearchFilterBar/>
            </Grid>
            <Grid item xs={12} sx={{py:2}}>
                <PropertyList/>
            </Grid>
        </Grid>
    );
}

export default SearchView;
