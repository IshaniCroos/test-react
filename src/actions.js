//function to store data and access variables
export const REQUEST_API_DATA = "REQUEST_API_DATA";
export const RECEIVE_API_DATA = "RECEIVE_API_DATA";

//actual functions
export const requestApiData = () => ({ type: REQUEST_API_DATA });
export const receiveApiData = data => ({ type: RECEIVE_API_DATA, data });


//functions to store data and access the variables
export const REQUEST_LOCATION_DATA = "REQUEST_LOCATION_DATA";
export const RECEIVE_LOCATION_DATA = "RECEIVE_LOCATION_DATA";

//receive location data 
export const locationData = () => ({ type: REQUEST_LOCATION_DATA})

//data locations
export const receiveLocationData = data => ({ type: RECEIVE_LOCATION_DATA, data })
