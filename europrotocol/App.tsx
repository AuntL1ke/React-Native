import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ParticipantAScreen from './screens/ParticipantAScreen';
import ParticipantBScreen from './screens/ParticipantBScreen';
import DamageScreen from './screens/DamageScreen';
import { View, Text, Button, StyleSheet } from 'react-native';

const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Європротокол'}}/>
        <Stack.Screen name="ParticipantA" component={ParticipantAScreen} options={{title: 'Учасник А'}}/>
        <Stack.Screen name="ParticipantB" component={ParticipantBScreen} options={{title: 'Учасник Б'}}/>
        <Stack.Screen name="Damage" component={DamageScreen} options={{title: 'Походження'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
