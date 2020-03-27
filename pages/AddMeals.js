import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import Logo from '../components/Logo';
import {Actions} from 'react-native-router-flux';
import axios, {AxiosRequestConfig} from 'axios';
import {styles} from '../styles/styles';
import {connect} from 'react-redux';
import SyncStorage from 'sync-storage';

function AddMeals(props) {
  useEffect(() => {
    (async () => {
      await SyncStorage.init();
    })();
  });
  function logout() {
    alert('Logout successful');
    Actions.login();
  }
  function setData() {
    props.title = '';
    props.calorie = 0;
  }
  function userHome() {
    Actions.userHome();
  }

  const handleSubmit = async () => {
    const postData = {
      title: props.title ? props.title : '',
      calorie: props.calorie ? props.calorie : 0,
    };
    let axiosConfig: AxiosRequestConfig = {
      headers: {
        jwttoken: await SyncStorage.data.get('jwttoken'),
      },
      params: postData,
    };
    axios
      .post('http://localhost:3000/meal/new', postData, axiosConfig)
      .then(async res => {
        if (res.status === 201) {
          alert(res.data.message);
          setData();
        } else {
          alert('Meal not created');
        }
      })
      .catch(() => {
        alert('Validation failed!!!');
      });
    console.log(SyncStorage.get('jwttoken'));
  };
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <TextInput
          style={styles.inputBox}
          placeholder="Title (Required)"
          value={props.title}
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          onChangeText={data => props.changeTitle(data)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Calorie (Required)"
          placeholderTextColor="#ffffff"
          value={props.calorie}
          onChangeText={data => props.changeCalorie(data)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Meals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={userHome}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupTextCont}>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.signupButton}> Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  changeTitle: payload => dispatch({type: 'CHANGE_TITLE', payload: payload}),
  changeCalorie: payload =>
    dispatch({type: 'CHANGE_CALORIE', payload: payload}),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMeals);
