import React, { Component } from 'react'
import { requestApiData } from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {findDistance} from '../Helpers/helperFunctions';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';


class DistanceCal extends Component {

    constructor(props) {
        super(props);
        this.props.requestApiData()

        this.state = {
            
            country1Name: "",
            country2Name: "",
            distance: 0
            
        };
    };


    country1Change = (e) => {
        this.setState({ country1Name: e.target.value });
    };

    country2Change = (e) => {
        this.setState({ country2Name: e.target.value });
    };

    calculateDistance (country1,country2)  {

        if (country1 == country2){
            return alert(" Please Enter Different Countries");

        }
        
        const result = findDistance(country1, country2);

        this.setState({

            distance: result.distance,
            country1Name: result.country1Name,
            country2Name: result.country2Name

        });
    }
  


    render() {
       
            return(
                
            <div className = "container transbox" >
                <h3 style = {{textAlign: "center"}}><span className="badge badge-primary">Calculate Distance Between Two Countries</span></h3>
                <Formik
                    initialValues={{
                        country1: '',
                        country2: ''
                    }}
                    validationSchema={Yup.object().shape({
                        country1: Yup.string()
                            .max(3, 'Must be exactly 3 characters')
                            .min(3, 'Must be exactly 3 characters')
                            .required('Country 1 is required'),
                        country2: Yup.string()
                            .max(3, 'Must be exactly 3 characters')
                            .min(3, 'Must be exactly 3 characters')
                            .notOneOf([Yup.ref('country1'), null], 'Countries must different')
                            .required('Country 2 is required')
                    })}
                    onSubmit={fields => {
                        try {
                            this.calculateDistance(fields.country1.toUpperCase(), fields.country2.toUpperCase());
                        } catch (e) {
                            alert("Invalid Country Code");
                            this.setState({
                                distance: "",
                                country1Name:"",
                                country2Name:""
                            });
                        }
                    }}
                    >

              {({ errors, touched }) => (
                      
            <Form>
                <div className="container" style={{
                    
                    textAlign: "center",
                    color : "darkblue"
                }}>
                    <div className="form-group"  >
                        <label style = {{textAlign : "center"}}>Country 1 </label>

                        <Field name="country1" type="text" placeholder="Enter 3 Letter Country Code" className={'form-control' + (errors.country1 && touched.country1 ? ' is-invalid' : '')} />
                        <ErrorMessage name="country1" component="div" className="invalid-feedback" />
                        
                        {/* <input type="text" style = {{textAlign : "center" , width: "100%"}} className="form-control " placeholder="Enter 3 Letter Country Code"
                               onChange={(e)=>this.country1Change(e)}/> */}
                               
                              
                    </div>
                    <div className="form-group">
                        <label>Country 2</label>

                        <Field name="country2" type="text" placeholder="Enter 3 Letter Country Code" className={'form-control' + (errors.country2 && touched.country2 ? ' is-invalid' : '')} />
                        <ErrorMessage name="country2" component="div" className="invalid-feedback" />
                        {/* <input type="text" style = {{textAlign : "center" , width: "100%"}} className="form-control" placeholder="Enter 3 Letter Country Code"
                                onChange={(e)=>this.country2Change(e)}/> */}
                    </div>
                </div>

                <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-lg mr-2">Calculate</button>
                                <button type="reset" className="btn btn-secondary btn-lg">Clear</button>
                            </div>
                {/* <div style = {{textAlign : "center"}}>
                    <button type= "submit" className= "btn btn-primary" style = {{ top: "50%"}} >Calculate
                    </button>
                </div> */}
                <br/>

                {/* <h1 className="badgeDistance">{this.state.betweenDistance}</h1> */}


               
                    <div className="col text-center">
                        {this.state.distance ? (
                            <h2 style = {{textAlign :"center"}}><span
                                className="badge badge-success">Distance between {this.state.country1Name} and {this.state.country2Name} : {
                                this.state.distance} KMs</span></h2>
                        ) : (
                            <br/>
                        )}
                    </div>
                


                
               
            </Form>

)}

</Formik>




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

export default connect(null,matchDispatchToProps)(DistanceCal);


