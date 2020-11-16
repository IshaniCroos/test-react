import React, {Component} from "react";
import { Provider } from "react-redux";
import {BrowserRouter, Router, Switch, Route, Redirect} from 'react-router-dom';
import store from "./store";
import Common from './components/Common';
import DistanceCal from "./components/DistanceCal";
import Login from './components/LoginAuth/Login';




class App extends Component {

  render() {
    return (

      <div>


        <BrowserRouter>
        <div className="container" style={{ maxWidth: "50%", marginTop: 20}}>
          <Switch>
            <Route path="/" exact name="Distance" render={props => <Login {...props} />} />
           <Route path="/app" exact name="App" render={props => <Common {...props} />} /> 
           
          </Switch>
          </div>
        </BrowserRouter>




</div>


);



  }


}


// export default () =>
//   <Provider store={store}>
//     <div className="container">
//       <DistanceCal/>
      
//       {/* <Home /> */}
//     </div>
    
//   </Provider>;

export default App;