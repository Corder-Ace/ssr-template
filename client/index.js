import React from 'react';
import ReactDOM from 'react-dom';
import { routes } from './src/config/routes';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import App from './App';

ReactDOM.hydrate(
    <BrowserRouter>
        <App />
        <Switch>
            <Route exact path={'/'} render={() => <Redirect to={"/home"} />}/>
            {
                routes.map(route => <Route key={route.path} exact={true} path={route.path} component={route.component} />)
            }
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);