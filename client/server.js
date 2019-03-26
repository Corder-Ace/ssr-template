import React from 'react';
import { routes } from './src/config/routes';
import { StaticRouter, Route } from 'react-router-dom';
import App from './App';

export default ({ url, routerContext }) => {
    const content = (
        <StaticRouter location={url} context={routerContext}>
            <App />
            {
                routes.map(route => <Route exact={true} path={route.path} component={route.component} />)
            }
        </StaticRouter>
    );
    return {
        routes,
        content
    }
}