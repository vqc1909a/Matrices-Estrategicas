import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from './components/layouts/Sidebar';
import Navbar from './components/layouts/Navbar';
import Mpc from './Views/Home/Mpc';
import Mefi from './Views/Home/Mefi';
import Mefe from './Views/Home/Mefe';
import Foda from './Views/Home/Foda';
import Peyea from './Views/Home/Peyea';
import Home from './Views/Home/Home';
import Mpec from './Views/Home/Mpec';

//! Context
function App() {
  return (
      <div className="wrapper">
      <Router>
          <Navbar />
          <Sidebar />
          <div className="content-wrapper">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/mpc" component={Mpc} />
              <Route exact path="/mefi" component={Mefi} />
              <Route exact path="/mefe" component={Mefe} />
              <Route exact path="/foda" component={Foda} />
              <Route exact path="/peyea" component={Peyea} />
              <Route exact path="/mpec" component={Mpec} />

            </Switch>
          </div>
        </Router>
      </div>
  );
}

export default App;
