import React, {Component} from "react";
import { Provider } from "react-redux";
import {BrowserRouter, Router, Switch, Route, Redirect} from 'react-router-dom';
import store from "./store";
import Display from "./components/Display";
import DistanceCal from "./components/DistanceCal";
// import Login from './components/Login';
//import Main from './components/distance';



class App extends Component {

  render() {
    return (

      <div>


        <BrowserRouter>
        <div className="container" style={{ maxWidth: "60%", marginTop: 30}}>
          <Switch>
            <Route path="/distance" exact name="Distance" render={props => <DistanceCal {...props} />} />
           <Route path="/display" exact name="Home" render={props => <Display {...props} />} /> 
          </Switch>
          </div>
        </BrowserRouter>




</div>


);



  }


}


export default () =>
  <Provider store={store}>
    <div className="container">
      <DistanceCal/>
      {/* <Home /> */}
    </div>
    
  </Provider>;