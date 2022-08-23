import api from "./api";
import moment from 'moment';

const getProperties = () => {
    return api
      .get('/property/getProperties');
    };
  
const getProperty = (id) =>{
    return api
      .get(`/property/getProperty/${id}`);
}
const searchHotelByCity = (guest, quantity, city, checkin, checkout) => {
    const checkIn = moment(checkin).format('DD-MM-YYYY');
    const checkOut = moment(checkout).format('DD-MM-YYYY');
    return api
      .get(`/property/searchHotelByCity/${guest}/${quantity}/${city}/${checkIn}/${checkOut}`);
}
const PropertyService = {
    getProperties,
    getProperty,
    searchHotelByCity
};

export default PropertyService;