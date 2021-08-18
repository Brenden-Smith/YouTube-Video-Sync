// Components
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';

// Routes
import Login from "./routes/Login";
import Room from "./routes/Room";

const App = () => {

  return (
    <Router>
      <PrivateRoute path="/" exact component={Room}/>
      <Route path="/login" component={Login}/>
    </Router>
  )
}

export default App;
