import React, { Component } from 'react';
import MainScanner from './screens/MainScanner';
import InfoEntry from './screens/InfoEntry';
import {
  Scene,
  Router,
  Stack,
} from 'react-native-router-flux';

export default class App extends Component {
  render () {
    return (
      <Router>
        <Stack key="root">
          <Scene key="InfoEntry" component={InfoEntry} hideNavBar="true"/>
          <Scene key="mainScanner" component={MainScanner} hideNavBar="true"/>
        </Stack>
      </Router>
    );
  }
}