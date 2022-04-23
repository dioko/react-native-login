import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { AuthContext } from '../util/util';
import { Button } from 'react-native-paper';


export function LoginScreen({navigation}) {
  const {signOut} = React.useContext(AuthContext);
  const onSubmit = ()=>{
    // Guarda los datos que querias aqui en un async storage o algo
    signOut('TOKEN');
  };
  return (
    <SafeAreaView>
      <Button onPress={onSubmit}>Login</Button>
    </SafeAreaView>
  );
}
