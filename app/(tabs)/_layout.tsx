import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../components/colors";
import ListScreen from "./(list)/index";
import SendScreen from "./(send)/index";
import ManageScreen from "./(manage)/_layout";
import ListItemDetail from "../../components/list_item_detail";
import RequireAuth from '../../components/RequireAuth';

const Tab = createBottomTabNavigator();

const tabs = [
  { name: "(list)", title: "清单", icon: "list-outline" as const, component: ListScreen },
  { name: "(send)", title: "发布", icon: "add-circle-outline" as const, component: SendScreen },
  { name: "(manage)", title: "管理", icon: "settings-outline" as const, component: ManageScreen },
];

export default function TabLayout() {
  return (
    <RequireAuth>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const tab = tabs.find(t => t.name === route.name);
            return <Ionicons name={tab?.icon} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.black,
          tabBarInactiveTintColor: colors.gray,
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",
            height: 60,
          },
          headerShown: false,
        })}
      >
        {tabs.map((tab) => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            options={{ title: tab.title }}
            component={tab.component}
          />
        ))}
      </Tab.Navigator>
    </RequireAuth>
  );
}
