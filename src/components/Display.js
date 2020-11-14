import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {requestApiData, receiveApiData} from '../actions';
import CountryDistance from "./DistanceCal";

class Display extends Component {

    componentDidMount() {
        this.props.requestApiData();
    };

    createListItems() {
        return this.props.allCountries.map((country)=>{
            return(
            <li key={country.name} onClick={()=>this.props.receiveApiData(country)}>{country.name} - {country.alpha3Code}</li>
            )
        })
    };

    render() {
        if(!this.props.allCountries){
            return(
                <button onClick={ () => this.props.requestApiData() } >Fetch Countries </button>
            )
        }
        return (
            <div>
                <CountryDistance allCountries={this.props.allCountries} /> 
                <h2>Countries List</h2>
                {this.createListItems()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        allCountries:state.allCountries
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            receiveApiData: receiveApiData,
            requestApiData: requestApiData
        },
        dispatch
    )
}

export default connect(mapStateToProps,matchDispatchToProps)(Display);