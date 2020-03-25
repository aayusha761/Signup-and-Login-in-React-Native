import React, {useState} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import Logo from '../components/Logo';
import {Actions} from 'react-native-router-flux';
import axios, {AxiosRequestConfig} from 'axios';
import {styles} from '../styles/styles';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setuserName] = useState('');
  const [calorie, setCalorie] = useState('');

  function goBack() {
    Actions.pop();
  }

  const handleSubmit = async () => {
    var postData = {
      userName: email,
      password: password,
      name: userName,
      calorie: calorie,
    };
    let axiosConfig: AxiosRequestConfig = {
      headers: {},
      params: postData,
    };
    axios
      .post('http://localhost:3000/user/signUp', postData, axiosConfig)
      .then(res => {
        // console.log('RESPONSE RECEIVED: ', res.data);
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
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Name (Required)"
          value={userName}
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="default"
          onChangeText={userName => setuserName(userName)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Username/Email (Required)"
          value={email}
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
          value={password}
          onChangeText={password1 => setPassword(password1)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Calorie (Optional)"
          placeholderTextColor="#ffffff"
          value={calorie}
          onChangeText={calorie => setCalorie(calorie)}
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
