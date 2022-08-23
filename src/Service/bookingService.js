import api from "./api";

const getBookingView = (offerID) => {
    return api
      .get(`/booking/bookingPreview/${offerID}`);
};

const bookingService = {
    getBookingView
};

export default bookingService;