import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
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
  }

  const getMeals = async () => {
    var postData = {
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
        <View
          style={{
            justifyContent: 'space-between',
            width: 350,
            backgroundColor: 'rgba(255, 255,255,0.2)',
            borderRadius: 25,
            paddingHorizontal: 16,
            marginVertical: 5,
          }}>
          <View
            style={{
              marginTop: 10,
              alignItems: 'center',
              width: 325,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: '#ffffff',
              }}>
              Calorie
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                width: 150,
                backgroundColor: 'rgba(255, 255,255,0.2)',
                borderRadius: 25,
                paddingHorizontal: 16,
                marginVertical: 10,
                marginTop: 20,
              }}>
              <Dropdown
                style={{
                  height: 50,
                }}
                value={props.fromCalorie}
                onChangeText={itemValue => props.changefromCalorie(itemValue)}
                data={[
                  {
                    value: '0',
                    label: '0',
                  },
                  {
                    value: '50',
                    label: '50',
                  },
                  {
                    value: '100',
                    label: '100',
                  },
                  {
                    value: '150',
                    label: '150',
                  },
                  {
                    value: '200',
                    label: '200',
                  },
                  {
                    value: '250',
                    label: '250',
                  },
                  {
                    value: '300',
                    label: '300',
                  },
                  {
                    value: '350',
                    label: '350',
                  },
                  {
                    value: '450',
                    label: '450',
                  },
                  {
                    value: '500',
                    label: '500',
                  },
                ]}
                dropdownOffset={{top: 0}}
                pickerStyle={{borderBottomColor: 'transparent', borderWidth: 0}}
                label="From Calorie"
              />
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                width: 150,
                backgroundColor: 'rgba(255, 255,255,0.2)',
                borderRadius: 25,
                paddingHorizontal: 16,
                marginVertical: 10,
                marginTop: 20,
              }}>
              <Dropdown
                style={{
                  height: 50,
                }}
                value={props.toCalorie}
                onChangeText={itemValue => props.changetoCalorie(itemValue)}
                data={[
                  {
                    value: '10000',
                    label: 'Null',
                  },
                  {
                    value: '50',
                    label: '50',
                  },
                  {
                    value: '100',
                    label: '100',
                  },
                  {
                    value: '150',
                    label: '150',
                  },
                  {
                    value: '200',
                    label: '200',
                  },
                  {
                    value: '250',
                    label: '250',
                  },
                  {
                    value: '300',
                    label: '300',
                  },
                  {
                    value: '350',
                    label: '350',
                  },
                  {
                    value: '450',
                    label: '450',
                  },
                  {
                    value: '500',
                    label: '500',
                  },
                ]}
                dropdownOffset={{top: 0}}
                pickerStyle={{borderBottomColor: 'transparent', borderWidth: 0}}
                label="To Calorie"
              />
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            width: 350,
            backgroundColor: 'rgba(255, 255,255,0.2)',
            borderRadius: 25,
            paddingHorizontal: 16,
            marginVertical: 5,
          }}>
          <View
            style={{
              marginTop: 10,
              alignItems: 'center',
              width: 325,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: '#ffffff',
              }}>
              Time (HH:MM)
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                width: 150,
                backgroundColor: 'rgba(255, 255,255,0.2)',
                borderRadius: 25,
                paddingHorizontal: 16,
                marginVertical: 10,
                marginTop: 20,
              }}>
              <Dropdown
                style={{
                  height: 50,
                }}
                value={props.fromTime}
                onChangeText={itemValue => props.changefromTime(itemValue)}
                data={[
                  {
                    value: '12:00',
                    label: '00:00',
                  },
                  {
                    value: '12:30',
                    label: '00:30',
                  },
                  {
                    value: '01:00',
                    label: '01:00',
                  },
                  {
                    value: '01:30',
                    label: '01:30',
                  },
                  {
                    value: '02:00',
                    label: '02:00',
                  },
                  {
                    value: '02:30',
                    label: '02:30',
                  },
                  {
                    value: '03:00',
                    label: '03:00',
                  },
                  {
                    value: '03:30',
                    label: '03:30',
                  },
                  {
                    value: '04:00',
                    label: '04:00',
                  },
                  {
                    value: '04:30',
                    label: '04:30',
                  },
                  {
                    value: '05:00',
                    label: '05:00',
                  },
                  {
                    value: '05:30',
                    label: '05:30',
                  },
                  {
                    value: '06:00',
                    label: '06:00',
                  },
                  {
                    value: '06:30',
                    label: '06:30',
                  },
                  {
                    value: '07:00',
                    label: '07:00',
                  },
                  {
                    value: '07:30',
                    label: '07:30',
                  },
                  {
                    value: '08:00',
                    label: '08:00',
                  },
                  {
                    value: '08:30',
                    label: '08:30',
                  },
                  {
                    value: '09:00',
                    label: '09:00',
                  },
                  {
                    value: '09:30',
                    label: '09:30',
                  },
                  {
                    value: '10:00',
                    label: '10:00',
                  },
                  {
                    value: '10:30',
                    label: '10:30',
                  },
                  {
                    value: '11:00',
                    label: '11:00',
                  },
                  {
                    value: '11:30',
                    label: '11:30',
                  },
                ]}
                dropdownOffset={{top: 0}}
                pickerStyle={{borderBottomColor: 'transparent', borderWidth: 0}}
                label="From Time"
              />
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                width: 150,
                backgroundColor: 'rgba(255, 255,255,0.2)',
                borderRadius: 25,
                paddingHorizontal: 16,
                marginVertical: 10,
                marginTop: 20,
              }}>
              <Dropdown
                style={{
                  height: 50,
                }}
                value={props.toTime}
                onChangeText={itemValue => props.changetoTime(itemValue)}
                data={[
                  {
                    value: '12:00',
                    label: '00:00',
                  },
                  {
                    value: '12:30',
                    label: '00:30',
                  },
                  {
                    value: '01:00',
                    label: '01:00',
                  },
                  {
                    value: '01:30',
                    label: '01:30',
                  },
                  {
                    value: '02:00',
                    label: '02:00',
                  },
                  {
                    value: '02:30',
                    label: '02:30',
                  },
                  {
                    value: '03:00',
                    label: '03:00',
                  },
                  {
                    value: '03:30',
                    label: '03:30',
                  },
                  {
                    value: '04:00',
                    label: '04:00',
                  },
                  {
                    value: '04:30',
                    label: '04:30',
                  },
                  {
                    value: '05:00',
                    label: '05:00',
                  },
                  {
                    value: '05:30',
                    label: '05:30',
                  },
                  {
                    value: '06:00',
                    label: '06:00',
                  },
                  {
                    value: '06:30',
                    label: '06:30',
                  },
                  {
                    value: '07:00',
                    label: '07:00',
                  },
                  {
                    value: '07:30',
                    label: '07:30',
                  },
                  {
                    value: '08:00',
                    label: '08:00',
                  },
                  {
                    value: '08:30',
                    label: '08:30',
                  },
                  {
                    value: '09:00',
                    label: '09:00',
                  },
                  {
                    value: '09:30',
                    label: '09:30',
                  },
                  {
                    value: '10:00',
                    label: '10:00',
                  },
                  {
                    value: '10:30',
                    label: '10:30',
                  },
                  {
                    value: '11:00',
                    label: '11:00',
                  },
                  {
                    value: '11:30',
                    label: '11:30',
                  },
                ]}
                dropdownOffset={{top: 0}}
                pickerStyle={{borderBottomColor: 'transparent', borderWidth: 0}}
                label="To Time"
              />
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            width: 350,
            backgroundColor: 'rgba(255, 255,255,0.2)',
            borderRadius: 25,
            paddingHorizontal: 16,
            marginVertical: 5,
          }}>
          <View
            style={{
              marginTop: 10,
              alignItems: 'center',
              width: 325,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: '#ffffff',
              }}>
              Date (YYYY/MM/DD)
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TextInput
              style={{
                justifyContent: 'space-between',
                width: 150,
                backgroundColor: 'rgba(255, 255,255,0.2)',
                borderRadius: 25,
                paddingHorizontal: 16,
                marginVertical: 10,
                marginTop: 20,
                fontSize: 25,
              }}
              placeholder="From Date"
              value={props.fromDate}
              placeholderTextColor="#ffffff"
              selectionColor="#fff"
              onChangeText={userId => props.changefromDate(userId)}
            />
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <TextInput
                style={{
                  justifyContent: 'space-between',
                  width: 150,
                  backgroundColor: 'rgba(255, 255,255,0.2)',
                  borderRadius: 25,
                  paddingHorizontal: 16,
                  marginVertical: 10,
                  fontSize: 25,
                  marginTop: 20,
                }}
                placeholder="To Date"
                value={props.toDate}
                placeholderTextColor="#ffffff"
                selectionColor="#fff"
                onChangeText={toDate => props.changetoDate(toDate)}
              />
            </View>
          </View>
        </View>
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
