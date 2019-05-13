import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import asyncComponent from './Utilities/asyncComponent';
import some from 'lodash/some';

/**
 * Aysnc imports of components
 *
 * https://webpack.js.org/guides/code-splitting/
 * https://reactjs.org/docs/code-splitting.html
 *
 * pros:
 *      1) code splitting
 *      2) can be used in server-side rendering
 * cons:
 *      1) nameing chunk names adds unnecessary docs to code,
 *         see the difference with DashboardMap and InventoryDeployments.
 *
 */
const Dashboard = asyncComponent(() => import(/* webpackChunkName: "SamplePage" */ './pages/dashboard/dashboard'));
const ListReports = asyncComponent(() => import(/* webpackChunkName: "Rules" */ './pages/report/list/listReports'));
const ViewReport = asyncComponent(() => import(/* webpackChunkName: "Rules" */ './pages/report/view/viewReport'));
const Upload = asyncComponent(() => import(/* webpackChunkName: "SamplePage" */ './pages/upload/upload'));
const paths = {
    dashboard: '/dashboard',
    upload: '/upload',
    reports: '/reports',
    viewReport: '/reports/:id'
};

type Props = {
    childProps: any
};

const InsightsRoute = ({ component: Component, rootClass, ...rest }) => {
    const root = document.getElementById('root');
    root.removeAttribute('class');
    root.classList.add(`page__${rootClass}`, 'pf-c-page__main');
    root.setAttribute('role', 'main');

    return (<Route { ...rest } component={ Component } />);
};

InsightsRoute.propTypes = {
    component: PropTypes.func,
    rootClass: PropTypes.string
};

/**
 * the Switch component changes routes depending on the path.
 *
 * Route properties:
 *      exact - path must match exactly,
 *      path - https://prod.foo.redhat.com:1337/insights/advisor/rules
 *      component - component to be rendered when a route has been chosen.
 */
export const Routes = (props: Props) => {
    const path = props.childProps.location.pathname;

    return (
        <Switch>
            <InsightsRoute path={ paths.dashboard } component={ Dashboard } rootClass='dashboard'/>
            <InsightsRoute path={ paths.upload } component={ Upload } rootClass='upload'/>
            <InsightsRoute path={ paths.reports } component={ ListReports } rootClass='reports' exact/>
            <InsightsRoute path={ paths.viewReport } component={ ViewReport } rootClass='view'/>

            { /* Finally, catch all unmatched routes */ }
            <Route render={ () => some(paths, p => p === path) ? null : (<Redirect to={ paths.dashboard }/>) }/>
        </Switch>
    );
};
