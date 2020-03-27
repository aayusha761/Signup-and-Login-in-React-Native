const initState = {
  userName: '',
  password: '',
  name: '',
  calorie: '',
  userName1: '',
  password1: '',
  jwttoken: '',
  userId: '',
  id: '',
  fromDate: '',
  toDate: '',
  fromTime: '',
  toTime: '',
  fromCalorie: '',
  toCalorie: '',
  title: '',
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_EMAIL':
      let userName = action.payload;
      return {
        ...state,
        userName: userName,
      };
    case 'CHANGE_USERID':
      let userId = action.payload;
      return {
        ...state,
        userId: userId,
      };

    case 'CHANGE_PASSWORD':
      let password = action.payload;
      return {
        ...state,
        password: password,
      };
    case 'CHANGE_EMAIL_SIGNUP':
      let userName1 = action.payload;
      return {
        ...state,
        userName1: userName1,
      };
    case 'CHANGE_PASSWORD_SIGNUP':
      let password1 = action.payload;
      return {
        ...state,
        password1: password1,
      };
    case 'CHANGE_USERNAME':
      let name = action.payload;
      return {
        ...state,
        name: name,
      };
    case 'CHANGE_FROMCALORIE':
      let fromCalorie = action.payload;
      return {
        ...state,
        fromCalorie: fromCalorie,
      };
    case 'CHANGE_CALORIE':
      let calorie = action.payload;
      return {
        ...state,
        calorie: calorie,
      };
    case 'CHANGE_FROMDATE':
      let fromDate = action.payload;
      return {
        ...state,
        fromDate: fromDate,
      };
    case 'CHANGE_TODATE':
      let toDate = action.payload;
      return {
        ...state,
        toDate: toDate,
      };
    case 'CHANGE_FROMTIME':
      let fromTime = action.payload;
      return {
        ...state,
        fromTime: fromTime,
      };
    case 'CHANGE_TOTIME':
      let toTime = action.payload;
      return {
        ...state,
        toTime: toTime,
      };
    case 'CHANGE_TOCALORIE':
      let toCalorie = action.payload;
      return {
        ...state,
        toCalorie: toCalorie,
      };
    case 'CHANGE_TITLE':
      let title = action.payload;
      return {
        ...state,
        title: title,
      };
    default:
      return state;
  }
};

export default rootReducer;
