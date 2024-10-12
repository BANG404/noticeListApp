import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import NotificationsScreen from './Notifications';
import DomainsScreen from './Domains';
import NotificationDetailScreen from './NotificationDetail';
import DomainDetailScreen from './DomainDetail';

const Tab = createBottomTabNavigator();
const NotificationsStack = createNativeStackNavigator();
const DomainsStack = createNativeStackNavigator();

const theme = extendTheme({
  colors: {
    primary: {  
      50: '#F4F4F5',
      100: '#E0E0E0',
      200: '#BDBDBD',
      300: '#9E9E9E',
      400: '#757575',
      500: '#616161',
      600: '#424242', 
      700: '#212121',
      800: '#191919',
      900: '#000000',
    },
    secondary: {
      50: '#FFFFFF',
      100: '#F5F5F5',  
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#808080',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  config: {
    initialColorMode: 'light',
  },
});

function NotificationsStackScreen() {
  return (
    <NotificationsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary[600],
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <NotificationsStack.Screen
        name="NotificationsList"
        component={NotificationsScreen}
        options={{ title: 'Notifications' }}
      />
      <NotificationsStack.Screen
        name="NotificationDetail"
        component={NotificationDetailScreen}
        options={{ title: 'Notification Detail' }}
      />
    </NotificationsStack.Navigator>
  );
}

function DomainsStackScreen() {
  return (
    <DomainsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary[600],
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <DomainsStack.Screen
        name="DomainsList"
        component={DomainsScreen}
        options={{ title: 'Domains' }}
      />
      <DomainsStack.Screen
        name="DomainDetail"
        component={DomainDetailScreen}
        options={{ title: 'Domain Detail' }}
      />
    </DomainsStack.Navigator>
  );
}

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>

        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Notifications') {
                iconName = focused ? 'notifications' : 'notifications-outline';
              } else if (route.name === 'Domains') {
                iconName = focused ? 'globe' : 'globe-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.colors.primary[600],
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopWidth: 0,
              elevation: 8,
              shadowOpacity: 0.1,
              shadowRadius: 4,
              shadowColor: '#000',
              shadowOffset: { height: 0, width: 0 },
              
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Notifications" component={NotificationsStackScreen} />
          <Tab.Screen name="Domains" component={DomainsStackScreen} />
        </Tab.Navigator>
    </NativeBaseProvider>
  );
}