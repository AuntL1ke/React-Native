import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import AddTask from '../screens/AddTask';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tasks" component={Home} />
      <Tab.Screen name="Add Task" component={AddTask} />
    </Tab.Navigator>
  );
}