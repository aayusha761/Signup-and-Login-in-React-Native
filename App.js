import React, {Component} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import Routes from './Routes/Routes';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import store from './reducers/roorReducers';

export default class App extends Component<{}> {
  render() {
    const storeRedux = createStore(store);
    return (
      <Provider store={storeRedux}>
        <View style={styles.container}>
          <StatusBar backgroundColor="#1c313a" barStyle="light-content" />
          <Routes />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
