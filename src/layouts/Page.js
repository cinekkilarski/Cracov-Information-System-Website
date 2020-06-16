import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "../pages/HomePage";
import withAuth from "../components/withAuth";
import AccessForms from "../layouts/AccessForms";
import ExplorePage from "../pages/ExplorePage";
import ThingToDoPage from "../pages/ThingsToDoPage";
import SinglePlacePage from "../pages/SinglePlacePage";
import FindUserPage from "../pages/FindUserPage";
import AccountSettingsPage from "../pages/AccountSettingsPage";
import ErrorPage from "../pages/ErrorPage";
import "../styles/App.css";
const Page = () => (
  <Switch>
    <Route path="/" exact component={() => <HomePage />} />
    <Route path="/home" component={HomePage} />
    <Route path="/find-user" component={withAuth(FindUserPage)} />
    <Route path="/account-settings" component={withAuth(AccountSettingsPage)} />
    <Route exact path="/explore" component={() => <ExplorePage />} />
    <Route
      exact
      path="/explore/:id"
      render={(props) => <SinglePlacePage {...props} />}
    />
    <Route path="/things" component={() => <ThingToDoPage />} />
    <Route path="/login" render={() => <AccessForms />} />
    <Route path="/register" render={() => <AccessForms value={true} />} />
    <Route path="/404" component={() => <ErrorPage />} />
    <Redirect to="/404" />
  </Switch>
);

export default Page;
