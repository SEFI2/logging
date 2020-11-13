import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LogListPage from "./containers/LogListPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={LogListPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
