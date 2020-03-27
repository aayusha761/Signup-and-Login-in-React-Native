import React from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import Logo from '../components/Logo';
import {Actions} from 'react-native-router-flux';
import axios, {AxiosRequestConfig} from 'axios';
import {styles} from '../styles/styles';
import {connect} from 'react-redux';

function Signup(props) {
  function goBack() {
    Actions.pop();
  }

  const handleSubmit = async () => {
    var postData = {
      userName: props.userName1,
      password: props.password1,
      name: props.name,
      calorie: props.calorie,
    };
    let axiosConfig: AxiosRequestConfig = {
      headers: {},
      params: postData,
    };
    axios
      .post('http://localhost:3000/user/signUp', postData, axiosConfig)
      .then(res => {
        alert(res.data.message) ? Actions.login() : null;
      })
      .catch(() => {
        alert('Enter all details');
      });
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.container1}>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Name (Required)"
          value={props.name}
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="default"
          onChangeText={name => props.changeusername(name)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Username/Email (Required)"
          value={props.userName1}
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onChangeText={email => props.changeEmail1(email)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Password (Required)"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          value={props.password1}
          onChangeText={password => props.changePassword1(password)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Calorie (Optional)"
          placeholderTextColor="#ffffff"
          value={props.calorie}
          onChangeText={calorie => props.changeCalorie(calorie)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}>Already have an account?</Text>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.signupButton}> Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  changeEmail1: payload =>
    dispatch({type: 'CHANGE_EMAIL_SIGNUP', payload: payload}),
  changePassword1: payload =>
    dispatch({type: 'CHANGE_PASSWORD_SIGNUP', payload: payload}),
  changeusername: payload =>
    dispatch({type: 'CHANGE_USERNAME', payload: payload}),
  changeCalorie: payload =>
    dispatch({type: 'CHANGE_CALORIE', payload: payload}),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
