import { RECEIVE_LOCATION_DATA } from '../actions';

export default (state = {}, { type, data }) => {
    switch(type){
        case RECEIVE_LOCATION_DATA:
            console.log("better")
            return data;
        default:
            return state;
    }
};