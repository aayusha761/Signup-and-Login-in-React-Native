import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Logo from '../components/Logo';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setuserName] = useState('');
  const url = 'http://localhost:3000/user/signUp';
  const data = {
    userName: email,
    password: password,
    name: userName,
  };
  const headers = {
    'Content-Type': 'x-www-form-urlencoded',
  };

  function goBack() {
    Actions.pop();
  }

  const handleSubmit = async () => {
    if (!email || !password || !userName) {
      alert('Enter Details...');
      return;
    }
    var postData = {
      userName: email,
      password: password,
    };
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    axios
      .post('http://ea29b3a5.ngrok.io/user/signUp', postData, axiosConfig)
      .then(res => {
        console.log('RESPONSE RECEIVED: ', res);
      })
      .catch(err => {
        console.log('AXIOS ERROR: ', err);
      });
  };
  // axios
  //   .post(url, data, headers)
  //   .then(response => {
  //     console.log(response.statusText);
  //   })
  //   .catch(function(error) {
  //     console.log(error.message);
  //   });
  // axios({
  //   method: 'post',
  //   url: 'http://localhost:3000/user/signUp',
  //   data: {
  //     userName: email,
  //     password: password,
  //     name: userName,
  //   },
  //   headers: {
  //     'content-type': 'x-www-form-urlencoded',
  //   },
  // });
  // axios
  //   .post('http://localhost:3000/user/signUp', {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       userName: email,
  //       password: password,
  //       name: userName,
  //     },
  //   })
  //   .then(response => {
  //     console.log(response.statusText);
  //   })
  //   .catch(function(error) {
  //     console.log(error.message);
  //   });

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.container1}>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Name"
          value={userName}
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="default"
          onChangeText={userName => setuserName(userName)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Username/Email"
          value={email}
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onChangeText={email1 => setEmail(email1)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          value={password}
          onChangeText={password1 => setPassword(password1)}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  container1: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBox: {
    width: 350,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 25,
    color: '#ffffff',
    marginVertical: 10,
  },
  button: {
    width: 350,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});
