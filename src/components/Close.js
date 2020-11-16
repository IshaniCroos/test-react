import React, {Component} from 'react';
import _find from 'lodash.find';
import getDistance from 'geolib/es/getDistance';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {requestApiData} from "../actions";

class Close extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countries:[],
            countryInput:"",
            countryInputName:"",
            countryClosestName:"",
            countryClosestDistance:0,
            distances:[],
        };

        this.props.requestApiData();

    };

    countryInputChange = event => {
        this.setState({ countryInput: event.target.value });
    };

    findClosest(country1) {

        if (!this.state.countryInput) {
            return alert('Please enter country')
        }

        let min = 1000000000000000;
        let minCountry = "";
        let countryInputName = "";

        this.props.data.map((country) => {

            const country1Result = _find(this.props.data, ['alpha3Code', country1]);
            countryInputName = country1Result.name;

            const country1lat = country1Result.latlng[0];
            const country1lng = country1Result.latlng[1];
            const country2lat = country.latlng[0];
            const country2lng = country.latlng[1];

            if(country2lat) {
                let temp = getDistance(
                    { latitude: country1lat, longitude: country1lng },
                    { latitude: country2lat, longitude: country2lng }
                );

                if(temp>0) {
                    if(temp<min) {
                        min = temp;
                        minCountry = country.name;
                    }
                }
            }
        });

        this.setState({
            countryClosestName: minCountry,
            countryClosestDistance:(min/1000).toFixed(1),
            countryInputName:countryInputName
        });
    };

    render() {

        return (
            <div className="container transbox" style={{
                    
                textAlign: "center",
                color : "darkblue"
            }}>
                <h3 style = {{textAlign: "center", color: "lightskyblue"}}><span className="badge badge-primary">Find Closest Country</span></h3>
                <div className="container" style={{
                    width: "50%",
                    textAlign: "center"
                }}>
                    <div className="form-group">
                        <label style = {{textAlign : "center"}}>Enter Country </label>
                        <input type="text" style = {{textAlign : "center" , width: "100%"}} className="form-control" placeholder="Enter Country Code (3 Letters)"
                               value={this.state.countryInput}
                               onChange={this.countryInputChange}/>
                               <small id="emailHelp" className="form-text text-muted">Put the country name as 3 Letter Code. E.g:- China = CHN</small>
                    </div>
                </div>
                <div style = {{textAlign : "center"}}>
                    <button type="submit" className="btn btn-primary" style = {{ top: "50%"}}
                            onClick={() => this.findClosest(this.state.countryInput)}> Search
                    </button>
                </div>
                <br/>
                <div className="col text-center">
                    {this.state.countryClosestDistance ? (
                        
                        <h4 style = {{textAlign :"center"}}>
                            <span
                    className="badge badge-success">Closest Country For {this.state.countryInputName} is {this.state.countryClosestName} : {
                            this.state.countryClosestDistance} KM's away </span></h4>
                    ) : (
                        <br/>
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        data: state.data
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            requestApiData,
        },
        dispatch
    )
}

export default connect(mapStateToProps,matchDispatchToProps)(Close);
