import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Accounts from '../screens/accounts';
import {ACCOUNTS, MOVIEDETAIL, MOVIELIST, NOTIFICATIONS, TAB} from '../utils/route';
import BottomTabNavigator from './bottomTabNavigator';
import MovieList from '../screens/movies';
import MovieDetail from '../screens/movies/movieDetail';
import Notifications from '../screens/notifications';

const RootNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Back',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'black',
        },
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name={TAB}
        component={BottomTabNavigator}
      />
      <Stack.Screen name={ACCOUNTS} component={Accounts} />
      <Stack.Screen name={MOVIELIST} component={MovieList} />
      <Stack.Screen name={MOVIEDETAIL} component={MovieDetail} />
      <Stack.Screen name={NOTIFICATIONS} component={Notifications} />
      
    </Stack.Navigator>
  );
};

export default RootNavigator;
