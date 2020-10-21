import React from "react";
import { Route, Switch } from "react-router-dom";


import HomePage from "./components/HomePage";

const Routes: React.SFC = () => (
  <div>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          
            <HomePage />
         
        )}
      />
      
    </Switch>
  </div>
);

export default Routes;
