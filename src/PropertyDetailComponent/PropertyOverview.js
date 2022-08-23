import React from 'react';
import Box from '@mui/material/Box';

import OverviewHighlights from './OverviewHighlights';
import OverviewShortDesc from './OverviewShortDesc';
import OverviewReviews from './OverviewReviews';
import OverviewFacilities from './OverviewFacilities';

function PropertyOverview(props){

    return (
        <Box sx={{ display: 'flex' , mt:2}} ref={props.refProp}>
            <Box sx={{width: '72%'}}>
                <OverviewHighlights />
                <OverviewShortDesc property={props.property}/>
                <OverviewFacilities />
            </Box>
            <Box sx={{width:'28%', ml:1}}>
                <OverviewReviews property={props.property}/>
            </Box>
        </Box>
    )
}
export default PropertyOverview
