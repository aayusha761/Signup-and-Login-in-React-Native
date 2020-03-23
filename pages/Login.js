import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Form, TextValidator} from 'react-native-validator-form';
import Logo from '../components/Logo';
import {Actions} from 'react-native-router-flux';

export default class Login extends Component {
  state = {
    email1: '',
    password1: '',
  };

  handleChangeEmail = email1 => {
    this.setState({email1});
  };
  handleChangePassword = password1 => {
    this.setState({password1});
  };

  signup() {
    Actions.signup();
  }

  handleSubmit = () => {
    console.log(this.state);
  };

  render() {
    const {email1, password1} = this.state;
    return (
      <View style={styles.container}>
        <Logo />
        <View style={styles.container1}>
          <Form ref="form" onSubmit={this.handleSubmit}>
            <TextValidator
              style={styles.inputBox}
              name="email1"
              label="email1"
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Username/Email"
              validators={['required', 'isEmail']}
              errorMessages={['This field is required', 'Email invalid']}
              value={email1}
              placeholderTextColor="#ffffff"
              selectionColor="#fff"
              keyboardType="email-address"
              onChangeText={this.handleChangeEmail}
            />
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#ffffff"
              value={password1}
              ref={input => (this.password1 = input)}
              onChangeText={this.handleChangePassword}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleSubmit()}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </Form>
        </View>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={this.signup}>
            <Text style={styles.signupButton}> Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
