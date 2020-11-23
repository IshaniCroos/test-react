import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchCountries, selectCountry} from '../actions';
import DistanceCal from "../components/DistanceCal";

class Dash extends Component {

    componentDidMount() {
        this.props.fetchCountries();
    };

    createListItems() {
        return this.props.allCountries.map((country)=>{
            return(
            <li key={country.name} onClick={()=>this.props.selectCountry(country)}>{country.name} - {country.alpha3Code}</li>
            )
        })
    };

    render() {
        if(!this.props.allCountries){
            return(
                <button onClick={ () => this.props.fetchCountries() } >Fetch Countries </button>
            )
        }
        return (
            <div>
                <DistanceCal allCountries={this.props.allCountries} />
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
            selectCountry: selectCountry,
            fetchCountries: fetchCountries
        },
        dispatch
    )
}

export default connect(mapStateToProps,matchDispatchToProps)(Dash);
