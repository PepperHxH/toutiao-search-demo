import React from "react";
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Search from './Search';
import Result from './Result';

const BasicRoute = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/result" component={Result} />
        </Switch>
    </Router>
)
export default BasicRoute;