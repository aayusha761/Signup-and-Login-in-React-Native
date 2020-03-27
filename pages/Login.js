import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import Logo from '../components/Logo';
import {Actions} from 'react-native-router-flux';
import axios, {AxiosRequestConfig} from 'axios';
import {styles} from '../styles/styles';
import {connect} from 'react-redux';
import SyncStorage from 'sync-storage';

function Login(props) {
  useEffect(() => {
    (async () => {
      await SyncStorage.init();
    })();
  });
  function signup() {
    Actions.signup();
  }

  const handleSubmit = async () => {
    var postData = {
      userName: props.userName,
      password: props.password,
    };
    let axiosConfig: AxiosRequestConfig = {
      headers: {},
      params: postData,
    };
    let token;
    axios
      .post('http://localhost:3000/user/login', postData, axiosConfig)
      .then(async res => {
        if (res.data.message === 'SUCCESS') {
          token = res.data.data.jwttoken;
          await SyncStorage.set('jwttoken', token);
          // console.log(token);
          alert(res.data.message);
          Actions.userHome();
        } else {
          alert('Invalid username/password');
        }
      })
      .catch(err => {
        // console.log('AXIOS ERROR: ', err.response);
        alert('Validation failed!!!');
      });
    console.log(SyncStorage.get('jwttoken'));
  };
  // console.log(SyncStorage.get('jwttoken'));
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.container1}>
        <TextInput
          style={styles.inputBox}
          placeholder="Username/Email (Required)"
          value={props.userName}
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onChangeText={email => props.changeEmail(email)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Password (Required)"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          value={props.password}
          onChangeText={password => props.changePassword(password)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}>Don't have an account yet?</Text>
        <TouchableOpacity onPress={signup}>
          <Text style={styles.signupButton}> Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  changeEmail: payload => dispatch({type: 'CHANGE_EMAIL', payload: payload}),
  changePassword: payload =>
    dispatch({type: 'CHANGE_PASSWORD', payload: payload}),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
