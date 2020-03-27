import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {styles} from '../styles/styles';
import axios, {AxiosRequestConfig} from 'axios';
import SyncStorage from 'sync-storage';
import {connect} from 'react-redux';

function UserHome(props) {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    (async () => {
      await SyncStorage.init();
    })();
  });
  function logout() {
    alert('Logout successful');
    Actions.login();
    // props.fromCalorie = 0;
    // props.toCalorie = 10000;
    // props.fromDate = '';
    // props.toDate = '';
    // props.fromTime = '';
    // props.toTime = '';
    // props.title = '';
  }

  const getMeals = async () => {
    var postData = {
      // userId: props.userId,
      fromCalorie: props.fromCalorie ? props.fromCalorie : 0,
      toCalorie: props.toCalorie ? props.toCalorie : 10000,
      fromDate: props.fromDate ? props.fromDate : '0000/00/00',
      toDate: props.toDate ? props.toDate : '9999/12/31',
      fromTime: props.fromTime ? props.fromTime : '00:00',
      toTime: props.toTime ? props.toTime : '12:59',
      title: props.title ? props.title : '',
    };
    const axiosConfig: AxiosRequestConfig = {
      headers: {
        jwttoken: await SyncStorage.data.get('jwttoken'),
      },
    };
    console.log(postData);
    let meal = [];
    await axios
      .post('http://localhost:3000/meal/filter', postData, axiosConfig)
      .then(async res => {
        if (res.status === 201) {
          // console.log(res.status);
          meal = res.data.items;
          // setMeals(meal);
          console.log(meal);
        } else {
          meal = [];
          // setMeals(meal);
          console.log(meal);
          alert('No meals found for this user.');
        }
      })
      .catch(err => {
        meal = [];
        console.log(err);
        // setMeals([]);
        alert('No meals found for this user');
      });
    setMeals(meal);
  };
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        {/*<TextInput*/}
        {/*  style={styles.inputBox}*/}
        {/*  placeholder="userId"*/}
        {/*  value={props.userId}*/}
        {/*  placeholderTextColor="#ffffff"*/}
        {/*  selectionColor="#fff"*/}
        {/*  onChangeText={userId => props.changeuserId(userId)}*/}
        {/*/>*/}
        <TextInput
          style={styles.inputBox}
          placeholder="From Calorie"
          value={props.fromCalorie}
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          onChangeText={fromCalorie => props.changefromCalorie(fromCalorie)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="To Calorie"
          value={props.toCalorie}
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          onChangeText={toCalorie => props.changetoCalorie(toCalorie)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="From Date (YYYY/MM/DD)"
          value={props.fromDate}
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          onChangeText={userId => props.changefromDate(userId)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="To Date (YYYY/MM/DD)"
          value={props.toDate}
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          onChangeText={toDate => props.changetoDate(toDate)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="From Time (HH:MM)"
          value={props.fromTime}
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          onChangeText={fromTime => props.changefromTime(fromTime)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="To Time (HH:MM)"
          value={props.toTime}
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          onChangeText={toTime => props.changetoTime(toTime)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Title"
          value={props.title}
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          onChangeText={userId => props.changeTitle(userId)}
        />
        <TouchableOpacity style={styles.button} onPress={getMeals}>
          <Text style={styles.buttonText}>Get Meals</Text>
        </TouchableOpacity>
        {/*<View style={{flex: 1, justifyContent: 'space-between'}}>*/}
        <View style={{flexDirection: 'row', flex: 1, margin: 30, height: 60}}>
          <Text style={{width: 87.5, height: 50, backgroundColor: 'skyblue'}}>
            Date
          </Text>
          <Text
            style={{width: 87.5, height: 50, backgroundColor: 'powderblue'}}>
            Time
          </Text>
          <Text style={{width: 87.5, height: 50, backgroundColor: 'skyblue'}}>
            Items
          </Text>
          <Text
            style={{width: 87.5, height: 50, backgroundColor: 'powderblue'}}>
            Calories
          </Text>
          {/*</View>*/}
        </View>
        <View
          style={{
            width: 350,
            height: 100,
            marginTop: 20,
          }}>
          <ScrollView>
            {meals.map((lap, index) => {
              // console.log('loop');
              return (
                // <View>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}
                  key={index}>
                  <Text
                    style={{
                      width: 87.5,
                      height: 50,
                      justifyContent: 'space-between',
                      backgroundColor: 'skyblue',
                    }}>
                    {lap.date}
                  </Text>
                  <Text
                    style={{
                      width: 87.5,
                      height: 50,
                      backgroundColor: 'powderblue',
                    }}>
                    {lap.time}
                  </Text>
                  <Text
                    style={{
                      width: 87.5,
                      height: 50,
                      backgroundColor: 'skyblue',
                    }}>
                    {lap.title}
                  </Text>
                  <Text
                    style={{
                      width: 87.5,
                      height: 50,
                      backgroundColor: 'powderblue',
                    }}>
                    {lap.calorie}
                  </Text>
                </View>
                // </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
      <View style={styles.signupTextCont}>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.signupButton}> Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles1 = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoText: {
    marginVertical: 15,
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  changeuserId: val => dispatch({type: 'CHANGE_USERID', payload: val}),
  changefromDate: val => dispatch({type: 'CHANGE_FROMDATE', payload: val}),
  changetoDate: val => dispatch({type: 'CHANGE_TODATE', payload: val}),
  changefromTime: val => dispatch({type: 'CHANGE_FROMTIME', payload: val}),
  changetoTime: val => dispatch({type: 'CHANGE_TOTIME', payload: val}),
  changefromCalorie: val =>
    dispatch({type: 'CHANGE_FROMCALORIE', payload: val}),
  changetoCalorie: val => dispatch({type: 'CHANGE_TOCALORIE', payload: val}),
  changeTitle: val => dispatch({type: 'CHANGE_TITLE', payload: val}),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserHome);
