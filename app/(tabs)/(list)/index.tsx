import { Link } from "expo-router";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListHeader from "../../../components/list_header";
import ListStatusTable from "../../../components/list_status_table";
import List from "../../../components/list";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function ListScreen() {
  return (
    <GestureHandlerRootView>
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        {/* 列表头部 */}
        <ListHeader />
        <View style={{ marginTop: 0, width: 300, alignSelf: "center" }}>
          <ListStatusTable />
        </View>

        <View style={styles.content}>
          <List />
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
