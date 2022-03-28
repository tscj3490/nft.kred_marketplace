import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AllCollectionsPage } from "../pages/all-collections";
import { HiddenCollectionsPage } from "../pages/hidden-collections";
import { connect } from "react-redux";

export const MyRouts = ({
  ...props
}) => {
  
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={AllCollectionsPage} />
          <Route exact path="/hidden" component={HiddenCollectionsPage} />
        </Switch>
      </Router>
    </div>
  );
}
