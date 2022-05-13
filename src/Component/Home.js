import BookingTab from './BookingTab.js';
import BannerBar from './BannerBar.js';
import RentalCardListing from './RentalCardListing.js';
import TravelerComment from './TravelerComment.js';
import PopularDest from './PopularDest.js';
function Home(props) {
  return (
    <>

    {props.tabIndex !== undefined ? <BookingTab tabIndex={props.tabIndex} />: <BookingTab tabIndex={'1'} />}
    

    <BannerBar/>
    <RentalCardListing/>
    <TravelerComment/>
    <PopularDest/>
    </>
  );
}

export default Home;
