import React from "react";
import { Redirect, Route } from "react-router-dom";

import firebase from "../firebase";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = firebase.auth();

export default function PrivateRoute({ component: Component, ...rest }) {

  const [user] = useAuthState(auth);

  return (
    <Route
      {...rest}
      render={props => {
        return user ? <Component {...props} /> : <Redirect to="/login"/>
      }}
    />
  )
}