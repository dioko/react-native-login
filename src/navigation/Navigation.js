import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../util/util';
import { Provider as PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {LoginScreen} from '../screens/LoginScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {HomeScreen} from '../screens/HomeScreen';
const Tab = createBottomTabNavigator();

export default function Navigation({navigation}) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          if (action.token) {
            AsyncStorage.setItem('token', action.token);
          }
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          AsyncStorage.removeItem('token');
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        console.log('SignIn Data: ', data);
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );
  return (
    <PaperProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="home" >
            {state.userToken !== null ?
              <>
                <Tab.Screen name="Login" component={LoginScreen} options={{ headerShown : false,  headerTitle: 'Login' ,tabBarLabel : 'Login', tabBarIcon: ({ color }) => (
                    <Icon name="home" size={30} color = {color}/>)}} />
              </>
              :
              <>
                <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown : false,  headerTitle: 'Home' ,tabBarLabel : 'Home', tabBarIcon: ({ color }) => (
                    <Icon name="home" size={30} color = {color}/>)}} />
                <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown : false,  headerTitle: 'Profile' ,tabBarLabel : 'Profile', tabBarIcon: ({ color }) => (
                    <Icon name="home" size={30} color = {color}/>)}} />
              </>
            }
          </Tab.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}
