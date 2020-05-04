import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage'
import withAuth from '../components/withAuth'
import ProtectedData from '../pages/ProtectedData';
import AccessForms from '../layouts/AccessForms'
import ExplorePage from '../pages/ExplorePage'
import ThingToDoPage from '../pages/ThingsToDoPage'

const Page = (props) => {

    return (
        <div>
            <Switch>
                <Route path="/" exact component={() => < HomePage />} />
                <Route path="/home" component={HomePage} />
                <Route path="/protecteddata" component={withAuth(ProtectedData)} />
                <Route path="/explore" component={() => < ExplorePage />} />
                <Route path="/things" component={() => < ThingToDoPage />} />
                <Route path="/login" component={() => < AccessForms handleLogged={props.handleLogged} />} />
            </Switch>
        </div >

    );
}

export default Page;