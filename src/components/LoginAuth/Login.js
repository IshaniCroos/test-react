import React, { Component } from 'react';
import '../LoginAuth/style.css';
import {Formik} from 'formik';
import * as Yup from 'yup';


let login = "";
let password = "";


let errors = {};
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const handleChangeEmailField = (e) => {
    e.preventDefault();
    //console.log(e.target.value.trim())
    password = e.target.value.trim()
    console.log(password)

    if(password == null){
        errors.password = "Password is Required";

    }else if(password.length <4){
        errors.password = "Too short Password";
    } else{

    
   
    return (new Promise(async (resolve, reject) => {
        await resolve(e.target.value.trim());
    

    }))
}

}

const handleNameChangeField = (e) => {
    e.preventDefault();
    //console.log(e.target.value.trim())
    login = e.target.value.trim()
    console.log(login)

    if(!login){
        errors.login = "Email is Required";
    }else if(!regex.test(login)){
        errors.login = "Invalid Email";

    } else{

    return (new Promise(async (resolve, reject) => {
        await resolve(e.target.value.trim());
    }))
}

}

const submitCredentials = (e) => {

    
    e.preventDefault();
    //callback function would be to call toggleAuth
    return (new Promise(async (resolve, reject) => {
        console.log(e.target.value.trim());

        if ((login.trim() === 'ishanicroos@gmail.com') && (password.trim() === '@pass1234')) {
            console.log("good")
            window.location = "/app"
        }else{
            alert("Incorrect Password or Email! Please Try Again");
        }


    }))
}

// const {submitCredentials, handleChangeEmailField, handleNameChangeField, errors} = useFormik ({
//     initialValues: {
//         login: '',
//         password: ''
//     },
//     onSubmit(values){
//         console.log(values)
//     }
// })



 class Login extends Component {

   
     render() {
         return (
             <Formik
             initialValues = {{
                 login: '',
                  password: ''}}
            
                //   validationSchema = {Yup.object().shape ({
                //       login : Yup.string()
                //       .required('Email is Required'),
                //       password: Yup.string()
                //       .required("Password is Required")
                //   })}

                //   onSubmit={fields=> {
                //       alert('Success!!')
                //   }}

                validate = {handleChangeEmailField, handleNameChangeField}
                onSubmit = {submitCredentials}
             
             >


                 {(formik)=> {
                     const{
                        values,
                        handleChange,
                        handleSubmit,
                        errors,
                        touched,
                        handleBlur,
                        isValid,
                        dirty
                     } = formik;
                

            <form class= "container p-3 my-3 bg-light text-dark" >
                <h3 style= {{textAlign: "center", color: "darkblue"}}> Login</h3>
                

                <div className="form-group">
                    <label>Email address/ User Name</label>
                    <input type="email"
                     onChange={(e) => handleNameChangeField(e)}
                     onBlur = {handleBlur}
                      className={errors.login && touched.login? "input-error" :null  }
                      placeholder="Enter email/ User Name" />
                      {errors.login && touched.login && (
                          <span className = "error"> {errors.login} </span>
                      )}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password"
                     onChange={(e) => handleChangeEmailField(e)}
                     onBlur={handleBlur}
                      className= {errors.password && touched.password? "input-error" : null}
                       placeholder="Enter password" />
                       {errors.password && touched.password && (
                           <span className="error"> {errors.password} </span>
                       )}
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit"
                 onClick={(e) => submitCredentials(e)}
                  className="btn btn-primary btn-block">Login</button>

                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>

            </form>
        
}

                       }
                    
                    

            </Formik>
     
        );

                }

    }
//} 


export default Login ;  
    
// export default Login;