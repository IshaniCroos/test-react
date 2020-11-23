import React, {Component} from 'react';
import{bindActionCreators} from 'redux';
import {requestApiData} from '../actions';
import {connect} from 'react-redux';
import {countriesSearch} from '../Helpers/helperFunctions';
import './style.css';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";


class Search extends Component {

    constructor(props){
        super(props);
        this.props.requestApiData();

        this.state = {
            search: '',
            inputCountry: '',
            filteredCountries: [],
            
        };
    }

    

    changeOfCountry = (e) =>{
        this.setState({search: e.target.value});
    }

    searchOnClick(search){
        
        const result = countriesSearch(search);

        this.setState({filteredCountries: result});
    }

    
    render(){
        return(

    <div className='container-fluid big-bg transbox'>
         <h3 style = {{textAlign: "center"}}><span className="badge badge-primary">Search For Countries</span></h3>

        {/* <h1 className="badgeDistance">{this.state.message}</h1> */}

        <Formik
                    initialValues={{
                        country1: ''
                    }}
                    validationSchema={Yup.object().shape({
                        country1: Yup.string()
                            .required('Country is required')
                    })}
                    onSubmit={fields => {
                        try {
                            this.searchOnClick(fields.country1);
                        } catch (e) {
                            alert("Invalid Country Code");
                        }
                    }}
                >
 {({ errors, touched }) => (
        <Form>
            <div className="container" style={{
                    width: "50%",
                    textAlign: "center"
                }}>
          <div className="form-group">
            <label htmlFor="country1" style = {{textAlign : "center", color: "darkblue"}}>Country name</label>
            {/* <input type="text"
             onChange={(e) => {this.changeOfCountry(e)}}
              style = {{textAlign : "center" , width: "100%"}} 
              className="form-control "
              
               id="country" aria-describedby="country" placeholder="Enter the Country Name " /> */}

          <Field name="country1" type="text" placeholder="Enter name" className={'form-control' + (errors.country1 && touched.country1 ? ' is-invalid' : '')} />
          <ErrorMessage name="country1" component="div" className="invalid-feedback" />
            <small id="emailHelp" className="form-text text-muted">Look for the country name you want to Search </small>
          </div>
          </div>
          <div style = {{textAlign : "center"}}>
          <button type="submit" 
          className="btn btn-primary"
           style = {{ top: "50%"}}
           >Search</button>
          </div>

          </Form>

)}

</Formik>

        <div className= "col text-center">
            {this.state.filteredCountries.length >1 ? (
                <div>
                    <h2>
            <span className= "badge badge-success">Found {this.state.filteredCountries.length} countries
            </span>

                    </h2>

                    </div>
            ):(

                <div>
                    <h2>
            <span className= "badge badge-success">Found {this.state.filteredCountries.length} country
            </span>
                    </h2>

                    </div>

            )}

            <ul className= "list-group">
                {this.state.filteredCountries.map(country=>{
                    return(
                        <li key= {country.name} className= "list-group-item list-group-item-success">
                            {country.name}

                        </li>
                    );
                })}

            </ul>

        </div>

       <br/>

       

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

export default connect(null,matchDispatchToProps)(Search);

















