import React from "react";
import { Route, Redirect } from "react-router-dom";

const User_EMAIL = "ishanicroos@gmail.com";
const User_PASSWORD = "@pass1234";
const TOKEN_EMAIL = "";



const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route
            {...rest}
            render={(props) =>
                login() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/app" />
                )
            }
        />
    );
};


//Login validation
export const login = (email, password) => {
    if ((User_EMAIL===email) && (User_PASSWORD===password)) {
        try {
            localStorage.setItem(TOKEN_EMAIL, email);
            console.log("good")
           // window.location = "/app"
        } catch (e) {
            console.log("Email Not Valid");
        }
    }
    else
        alert("Please Check Email & Password");
};