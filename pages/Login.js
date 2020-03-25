import React, {useState} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import Logo from '../components/Logo';
import {Actions} from 'react-native-router-flux';
import axios, {AxiosRequestConfig} from 'axios';
import {styles} from '../styles/styles';

function Login() {
  const [email1, setEmail] = useState('');
  const [password1, setPassword] = useState('');

  function signup() {
    Actions.signup();
  }

  const handleSubmit = async () => {
    var postData = {
      userName: email1,
      password: password1,
    };
    let axiosConfig: AxiosRequestConfig = {
      headers: {},
      params: postData,
    };
    axios
      .post('http://localhost:3000/user/login', postData, axiosConfig)
      .then(res => {
        // console.log('RESPONSE RECEIVED: ', res);
        alert(res.data.message);
      })
      .catch(err => {
        // console.log('AXIOS ERROR: ', err.response);
        alert('Enter all details');
      });
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.container1}>
        <TextInput
          style={styles.inputBox}
          placeholder="Username/Email (Required)"
          value={email1}
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onChangeText={email1 => setEmail(email1)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Password (Required)"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          value={password1}
          onChangeText={password1 => setPassword(password1)}
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
export default Login;
