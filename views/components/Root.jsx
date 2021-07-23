import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home.jsx';
import Movie from './Movie.jsx';
import '../../public/stylesheets/home.css';

function Container() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/:movie' component={Movie} />
            </Switch>
            <small>Philippe Allard Ouellet</small>
        </Router>
    )
};

export default ReactDOM.render(<Container />, document.getElementById("root"));
