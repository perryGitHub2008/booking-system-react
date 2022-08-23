import api from "./api";

const getReviews = (propertyid,page) =>{
    return api
      .get(`/review/getReviews/${propertyid}?page=${page}`);
    };

const reviewService = {
    getReviews
};

export default reviewService;