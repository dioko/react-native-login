import * as React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { AuthContext } from '../util/util';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function HomeScreen({navigation}) {
  const {signIn} = React.useContext(AuthContext);
  const logout = async () => {
    // Limpias el async storage y la sesion del context
    await AsyncStorage.clear;
    signIn(null);
  };
  return (
    <SafeAreaView>
      <View>
        <Text>HomeScreen</Text>
        <Button  onPress={()=>{
          logout();
        }} >Cerrar sesion</Button>
      </View>
    </SafeAreaView>
  );
}
