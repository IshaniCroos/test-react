import React, {Component} from "react";
import { Provider } from "react-redux";
import {BrowserRouter, Router, Switch, Route, Redirect} from 'react-router-dom';
import store from "./store";
import Common from './components/Common';
import DistanceCal from "./components/DistanceCal";
import Login from './components/LoginAuth/Login';
import Close from './components/Close'
import Search from './components/Search';
import Timezone from './components/Timezone';
import Display from './components/Display';



class App extends Component {

  render() {
    return (

      <div>

  <React.Fragment>

        <BrowserRouter>
        <div className="container" style={{ maxWidth: "50%", marginTop: 20}}>
        
          <Switch>
          
           <Route path="/" exact name="Login" render={props => <Login {...props} />} />
           <Route path="/app" exact name="App" render={props => <Common {...props} />} /> 
           <Route path="/distance" exact name= "Distance" render={props => <DistanceCal {...props} />}/>
           <Route path="/closest" exact name= "Close" render={props => <Close {...props} />}/>
           <Route path="/search" exact name= "Search" render={props => <Search {...props} />}/>
           <Route path="/timezone" exact name= "Timezone" render={props => <Timezone {...props} />}/>
           <Route path="/countryList" exact name= "Display" render={props => <Display {...props} />}/>

           
          </Switch>

         
          </div>
        </BrowserRouter>

        </React.Fragment>




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