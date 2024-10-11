import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import NotificationsScreen from './Notifications';
import DomainsScreen from './Domains'; // 修改为正确的导入路径
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationDetailScreen from './NotificationDetail'; // 修改为正确的导入路径
import DomainDetailScreen from './DomainDetail'; // 修改为正确的导入路径

const Tab = createBottomTabNavigator();
const NotificationsStack = createNativeStackNavigator();
const DomainsStack = createNativeStackNavigator();

const theme = extendTheme({
  colors: {
    primary: {
      50: '#f4f4f5',
      100: '#e4e4e7',
      500: '#808080',
      900: '#18181b',
    },
  },
});

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
            tabBarActiveTintColor: '#808080',
            tabBarInactiveTintColor: '#f4f4f5',
            tabBarStyle: {
              backgroundColor: '#18181b',
            },
            headerStyle: {
              backgroundColor: '#18181b',
            },
            headerTintColor: '#f4f4f5',
          })}
        >
          <Tab.Screen name="Notifications" options={{ headerShown: false }}>
            {() => (
              <NotificationsStack.Navigator>
                <NotificationsStack.Screen name="NotificationsList" component={NotificationsScreen} options={{ title: 'Notifications' }} />
                <NotificationsStack.Screen name="NotificationDetail" component={NotificationDetailScreen} options={{ title: 'Notification Detail' }} />
              </NotificationsStack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen name="Domains" options={{ headerShown: false }}>
            {() => (
              <DomainsStack.Navigator>
                <DomainsStack.Screen name="DomainsList" component={DomainsScreen} options={{ title: 'Domains' }} />
                <DomainsStack.Screen name="DomainDetail" component={DomainDetailScreen} options={{ title: 'Domain Detail' }} />
              </DomainsStack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>

    </NativeBaseProvider>
  );
}