import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import NotFound from '../layout/NotFound';

function Routes() {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles'>
          <Profiles />
        </Route>
        <Route exact path='/profile/:id'>
          <Profile />
        </Route>
        <PrivateRoute exact path='/dashboard'>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path='/create-profile'>
          <CreateProfile />
        </PrivateRoute>
        <PrivateRoute exact path='/edit-profile'>
          <EditProfile />
        </PrivateRoute>
        <PrivateRoute exact path='/add-experience'>
          <AddExperience />
        </PrivateRoute>
        <PrivateRoute exact path='/add-education'>
          <AddEducation />
        </PrivateRoute>
        <PrivateRoute exact path='/posts'>
          <Posts />
        </PrivateRoute>
        <Route component={NotFound} />
      </Switch>
    </section>
  );
}

export default Routes;
