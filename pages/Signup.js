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

export default class Signup extends Component {
  state = {
    email: '',
    password: '',
    userName: '',
  };

  handleChangeEmail = email => {
    this.setState({email});
  };
  handleChangePassword = password => {
    this.setState({password});
  };
  handleChangeName = userName => {
    this.setState({userName});
  };

  goBack() {
    Actions.pop();
  }

  handleSubmit = () => {
    console.log(this.state);
  };

  render() {
    const {email, password, userName} = this.state;
    return (
      <View style={styles.container}>
        <Logo />
        <View style={styles.container1}>
          <Form ref="form" onSubmit={this.handleSubmit}>
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Name"
              value={userName}
              placeholderTextColor="#ffffff"
              selectionColor="#fff"
              keyboardType="default"
              onChangeText={this.handleChangeName}
            />
            <TextValidator
              style={styles.inputBox}
              name="email"
              label="email"
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Username/Email"
              validators={['required', 'isEmail']}
              errorMessages={['This field is required', 'Email invalid']}
              value={email}
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
              value={password}
              placeholderTextColor="#ffffff"
              ref={input => (input = this.state.password)}
              onChangeText={this.handleChangePassword}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleSubmit()}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </Form>
        </View>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <TouchableOpacity onPress={this.goBack}>
            <Text style={styles.signupButton}> Sign in</Text>
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
