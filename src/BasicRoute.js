import React from "react";
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Search from './Search';

const BasicRoute = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path="/search" component={Search} />
        </Switch>
    </Router>
)
export default BasicRoute;