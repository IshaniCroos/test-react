import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {requestApiData} from "../actions";
import {findClosest} from '../Helpers/helperFunctions';

class Close extends Component {

    constructor(props) {
        super(props);

        this.props.requestApiData();

        this.state = {
            countries:[],
            countryInput:"",
            countryInputName:"",
            countryClosestName:"",
            countryClosestDistance:0,
            distances:[],
        };

       

    };

    countryInputChange = event => {
        this.setState({ countryInput: event.target.value });
    };

    findOnClick(country1) {

        if (!this.state.countryInput) {
            return alert('Please enter country')
        }

        const result = findClosest(country1);
        
            

        this.setState({
            countryClosestName: result.countryClosestName,
            countryClosestDistance: result.countryClosestDistance,
            countryInputName: result.countryInputName
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
                            onClick={() => this.findOnClick(this.state.countryInput)}> Search
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



function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            requestApiData,
        },
        dispatch
    )
}

export default connect(null,matchDispatchToProps)(Close);
