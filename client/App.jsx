import React from 'react';
import {BrowserRouter, Link, Redirect, Route, Switch} from 'react-router-dom';
import {routes} from "./src/config/routes";

const List = () => (
        <div>
            <div>
                <Link to={'/home'}>首页1112312</Link>
            </div>
            <div>
                <Link to={'/todo'}>todo</Link>
            </div>
        </div>
);
export default props => (
    <BrowserRouter>
        <List />
        <Switch>
            <Route exact path={'/'} render={() => <Redirect to={"/home"}/>}/>
            {
                routes.map(route => <Route key={route.path} exact={true} path={route.path} component={route.component}/>)
            }
        </Switch>
    </BrowserRouter>
)