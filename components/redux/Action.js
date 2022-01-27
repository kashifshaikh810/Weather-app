import {Auth, Database} from '../FirebaseConfig';
import {GET_USERS, GET_USER_DATA, POST_SEARCH} from './ActionTypes';

export const getUsers = () => dispatch => {
  Database()
    .ref('newUser')
    .on('value', snapshot => {
      let usersData = snapshot.val() ? Object.values(snapshot.val()) : [];
      dispatch({
        type: GET_USERS,
        payload: usersData,
      });
    });
};

export const searchPost = city => dispatch => {
  let uid = Auth().currentUser.uid;
  Database()
    .ref(`/search/${uid}`)
    .set({city: city})
    .then(res => {
      dispatch({
        type: POST_SEARCH,
        payload: city,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getSearch = () => dispatch => {
  let uid = Auth().currentUser.uid;
  Database()
    .ref(`/search/${uid}`)
    .on('value', snapshot => {
      let fetchCity = snapshot.val() ? snapshot.val().city : 'london';
      dispatch({
        type: POST_SEARCH,
        payload: fetchCity,
      });
    });
};

export const getUserData = () => dispatch => {
  let uid = Auth().currentUser.uid;
  Database()
    .ref(`/newUser/${uid}`)
    .on('value', snapshot => {
      let fetchUserData = snapshot.val() ? snapshot.val() : {};
      dispatch({
        type: GET_USER_DATA,
        payload: fetchUserData,
      });
    });
};
