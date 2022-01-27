import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUsers} from '../redux/Action';
import Header from './Header';

const Users = () => {
  const dispatch = useDispatch();
  const {users, userData} = useSelector(state => state.reducer);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getUsers());

    return () => {
      console.log('clean');
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getUsers());
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Header name="Weather App Users" />

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item, index) => index.toString()}
        data={users}
        renderItem={({item, index}) => {
          return (
            <>
              {userData.email === item.email ? null : (
                <View style={styles.items}>
                  <View style={styles.userNameContainer}>
                    <Text style={styles.userName}>
                      Name :- {item.userName} 👨‍💼
                    </Text>
                  </View>
                  <View style={styles.emailContainer}>
                    <Text style={styles.email}>Email :- {item.email} ☑️</Text>
                  </View>
                </View>
              )}
            </>
          );
        }}
      />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  items: {
    width: '90%',
    height: Dimensions.get('window').height / 10,
    justifyContent: 'center',
    elevation: 5,
    paddingHorizontal: 8,
    marginVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  userNameContainer: {
    marginVertical: 5,
  },
  emailContainer: {
    marginVertical: 5,
  },
  userName: {
    fontSize: 20,
    fontStyle: 'italic',
  },
  email: {
    fontSize: 20,
  },
});
