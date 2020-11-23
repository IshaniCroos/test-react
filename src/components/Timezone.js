import React, { Component } from '../../node_modules/react';
import {bindActionCreators} from 'redux';
import {requestApiData} from '../actions';
import {connect} from 'react-redux';
import {findTimezones} from '../Helpers/helperFunctions';
import "./style.css"
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';



class TimeZone extends Component {

      constructor(props) {
        super(props);
        this.props.requestApiData();
         
        this.state = {
              
              country1Input: 0,
              country2Input: 0,
              filteredCountries : 0

        };
      };

    



    findTimezoneOnClick(timeZone1, timeZone2){

      if((timeZone1-timeZone2)==0){
        return alert ("Please Enter Valid Timezones!");
      }

      const result = findTimezones(timeZone1, timeZone2);

      this.setState({
        filteredCountries: result
      });

    }


  render() {
    return (
      <div className='container-fluid big-bg transbox'  style={{
                    
        textAlign: "center",
        color : "darkblue"
    }}>

        <Formik
                    initialValues={{
                        timeZone1: '',
                        timeZone2: ''
                    }}
                    validationSchema={Yup.object().shape({
                        timeZone1: Yup.number()
                            .moreThan(-14, 'Timezone must be -13 or more')
                            .lessThan(14, 'Timezone must be 13 or less')
                            .required('Start Timezone is required'),
                        timeZone2: Yup.number()
                            .moreThan(-14, 'Timezone must be -13 or more')
                            .lessThan(14, 'Timezone must be 13 or less')
                            .notOneOf([Yup.ref('timeZone1'), null], 'Timezones must different')
                            .required('End Timezone is required')
                    })}
                    onSubmit={fields => {
                        try {
                            this.findTimezoneOnClick(parseFloat(fields.timeZone1),parseFloat(fields.timeZone2));
                        } catch (e) {
                            alert("Invalid Timezone");
                            this.setState({
                                distance: "",
                                timeZone1Name:"",
                                timeZone2Name:""
                            });
                        }
                    }}
                >

        <h3 style = {{textAlign: "center", color: "lightskyblue"}}><span className="badge badge-primary">Countries between Time Zones</span></h3>


        {({ errors, touched }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="country1">First TimeZone</label>            
            <div className="input-group input-group-lg fontSize" style={{margin:'0px 0px 10px 0px'}}>
                <span className="input-group-addon fontSize" id="sizing-addon1" >UTC</span>
                <Field name="timeZone1" type="number" className={'form-control' + (errors.timeZone1 && touched.timeZone1 ? ' is-invalid' : '')} />
                <ErrorMessage name="timeZone1" component="div" className="invalid-feedback" />
                {/* <input type="number" onChange={(e) => {this.countryZone1Change(e)}} value= {this.state.country1Input} className="form-control " placeholder="Timezone 1" aria-describedby="sizing-addon1"/> */}
            </div>

            <small id="emailHelp" className="form-text text-muted">Put 2 Country Zone Ranges where you want to find the existing countries between the given ranges.</small>
          </div>
          <label htmlFor="basic-url">Second TimeZone</label>
            <div className="input-group input-group-lg fontSize" style={{margin:'0px 0px 5px 0px'}}>
                <span className="input-group-addon fontSize" id="sizing-addon1">UTC</span>

                <Field name="timeZone2" type="number" className={'form-control' + (errors.timeZone2 && touched.timeZone2 ? ' is-invalid' : '')} />
                <ErrorMessage name="timeZone2" component="div" className="invalid-feedback" />
                {/* <input type="number" onChange={(e) => {this.countryZone2Change(e)}} value= {this.state.country2Input} className="form-control " placeholder="Timezone 2" aria-describedby="sizing-addon1"/> */}
            </div>

            
          <button type="submit" className="btn btn-primary">Search</button>
          </Form>

)}

</Formik>

<div className="container" style={{maxWidth: "500px", minWidth: "350px"}}>
        <div className= "col text-center">
          {this.state.filteredCountries ? (
            <ul className= "list-group">
              {this.state.filteredCountries.map(country=>{
                return(
                  <li key = {country.name}
                  className= "list-group-item list-group-item-success"> {country.name} - {country.timeZone}

                  </li>
                );
              })}

            </ul>
          ): (
            <br/>
          )}

         </div>
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

export default connect(null,matchDispatchToProps)(TimeZone);
//export default TimeZone;