// Components
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';

// Firebase
import firebase from "./firebase"

// Routes
import Login from "./routes/Login";
import Room from "./routes/Room";


const auth = firebase.auth();

const App = () => {

  const [user] = useAuthState(auth);

  return (
    <Router>
      {/* <PrivateRoute path="/" exact component={Room}/> */}
      <Route path="/" exact component={Room}/>
      <Route path="/login" component={Login}/>
    </Router>
  )
}

export default App;
