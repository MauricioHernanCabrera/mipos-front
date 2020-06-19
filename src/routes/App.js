import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import SiteLayout from "./../components/SiteLayout";

const App = () => {
  return (
    <BrowserRouter>
      <SiteLayout>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </SiteLayout>
    </BrowserRouter>
  );
};
export default App;
