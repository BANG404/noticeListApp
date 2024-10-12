import React, { useState, useCallback } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListHeader from "../../../components/list_header";
import ListStatusTable from "../../../components/list_status_table";
import List from "../../../components/list";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import colors from "../../../components/colors";


export default function ListScreen() {
  const [activeTab, setActiveTab] = useState('待完成');

  const handleTabChange = useCallback((tabKey) => {
    setActiveTab(tabKey);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <NativeBaseProvider>
        <SafeAreaView style={styles.container}>
          <ListHeader />
          <View style={{ marginTop: 10, width: 300, alignSelf: "center" }}>
            <ListStatusTable onTabChange={handleTabChange} />
          </View>

          <View style={styles.content}>
            <List activeTab={activeTab} />
          </View>
        </SafeAreaView>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});