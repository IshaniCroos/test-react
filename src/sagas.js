import { call, put, takeLatest, takeEvery } from "redux-saga/effects";

import { REQUEST_API_DATA, receiveApiData,  receiveLocationData } from "./actions";
import { fetchData } from './api'

const receiveandStoreData =function* getApiData() {
  try {
    // do api call
    const data = yield call(fetchData);
    //console.log(data)

    const location = yield data.map((locations)=>{
      return locations.name
    })


    yield put (receiveLocationData(location))
    yield put ({type: "NEWS_RECEIVED"})
    yield put(receiveApiData(data));

    
  } catch (e) {
    console.log(e);
  }
}

// 
const fetchSaga = function*fetchSaga(){
  yield takeEvery(REQUEST_API_DATA,receiveandStoreData)
}

export default fetchSaga