import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Summary from './screens/Summary';
import {Route} from './constants/RouteConstants';
import {Icons} from './components';
import {createStackNavigator} from '@react-navigation/stack';
import NewNote from './screens/NewNote';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native';
import Empty from './screens/Empty';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const _getIcon = (
  focused: boolean,
  route: string,
  color: string,
  size: number,
) => {
  switch (route) {
    case Route.HOME:
      return <Icons.Ionicons name={'home'} color={color} size={size} />;
    case Route.NEW_NOTE:
      return <Icons.AntDesign name={'plussquareo'} color={color} size={size} />;
    case Route.SUMMARY:
      return (
        <Icons.Feather name={'more-horizontal'} color={color} size={size} />
      );
  }
  return;
};

const _customTabButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -10,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'tomato',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const TabNavigator = ({navigation}) => (
  <Tab.Navigator
    initialRouteName={Route.HOME}
    safeAreaInsets={{bottom: 0, top: 0}}
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) =>
        _getIcon(focused, route.name, color, size),
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
    <Tab.Screen name={Route.HOME} component={Home} />
    <Tab.Screen
      name={Route.NEW_NOTE}
      component={NewNote}
      listeners={{
        focus: () => {
          navigation.navigate(Route.NEW_NOTE);
        },
      }}
    />
    <Tab.Screen name={Route.SUMMARY} component={Summary} />
  </Tab.Navigator>
);

const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName={Route.MAIN}
    screenOptions={{headerShown: false}}>
    <Stack.Screen name={Route.MAIN} component={TabNavigator} />
  </Stack.Navigator>
);

export default StackNavigator;
