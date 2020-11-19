import React, { Component } from '../../node_modules/react';
import App from './DistanceCal';
// import './style.css';
import Closest from './Close';
import Search from './Search';
import TimeZone from '../components/Timezone';

import { Provider } from '../../node_modules/react-redux';
import store from "../store";

class Common extends Component {

      constructor(props) {
        super(props);
        this.state = {
              fullDataResponse: [],
              location : true,
              Country : false,
              hasMounted: 'distanceApp'
        };
      }



    componentDidMount() {
    }

    dataResponseHandle = (dataRes) => {
        this.setState({fullDataResponse : dataRes})
    }

    appSelection = (add) => {
        this.setState({ hasMounted : add })
    }

    turn() {

        switch(this.state.hasMounted) {
            case 'distanceApp':
                return <App fullDataResponse={this.state.fullDataResponse} dataResponseHandle={this.dataResponseHandle}/>;
          case 'countryZones':
            return <Closest fullDataResponse={this.state.fullDataResponse} dataResponseHandle={this.dataResponseHandle} />;
          case 'SearchCountry':
            return <Search fullDataResponse={this.state.fullDataResponse} dataResponseHandle={this.dataResponseHandle} />;
          case 'BetweenTimeZones':
            return <TimeZone fullDataResponse={this.state.fullDataResponse} dataResponseHandle={this.dataResponseHandle} />;
             default:
                return <App fullDataResponse={this.state.fullDataResponse} dataResponseHandle={this.dataResponseHandle}/>;
          }

      }

  render() {

    return (
        <Provider store={store}>
        <React.StrictMode>

          

    <nav class="navbar navbar-expand-lg navbar-light bg-light " style={{
                    backgroundColor: "#ddeeff",
                    align: "center"
                }}>
    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav">
        <button type="button" onClick={() => this.appSelection('distanceApp')} className="nav-item nav-link active">Location Distances</button>
        <button type="button" onClick={() => this.appSelection('countryZones')} className="nav-item nav-link">Closest Countries</button>
        <button type="button" onClick={() => this.appSelection('SearchCountry')} className="nav-item nav-link">Search Country</button>
        <button type="button" onClick={() => this.appSelection('BetweenTimeZones')} className="nav-item nav-link">TimeZone</button>
        </div>

        <br>
        </br>
       
    </div>
    
</nav>
{this.turn()}

          </React.StrictMode>
      </Provider>
          
    );
  }
}

export default Common;