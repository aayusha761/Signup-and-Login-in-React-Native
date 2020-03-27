import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import UserHome from '../pages/userHome';
import AddMeals from '../pages/AddMeals';

export default class Routes extends Component<{}> {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="login" component={Login} title="Login" initial={true} />
          <Scene key="signup" component={Signup} title="Register" />
          <Scene key="userHome" component={UserHome} title="UserHome" />
          <Scene key="addMeals" component={AddMeals} title="UserHome" />
        </Stack>
      </Router>
    );
  }
}
