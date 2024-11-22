import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListHeader from "../../../components/list_header";
import ListStatusTable from "../../../components/list_status_table";
import List from "../../../components/list";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import colors from "../../../components/colors";
import { createStackNavigator } from "@react-navigation/stack";
import ListItemDetail from "../../../components/list_item_detail";
import { NavigationContainer } from "@react-navigation/native";

type ItemType = "task" | "notification";

interface ListItem {
  id: string;
  title: string;
  description: string;
  date: string;
  type: ItemType;
  status: "待完成" | "过期" | "已完成";
  senderName: string;
  senderTitle: string;
  domain: string;
  publishTime: string;
  deadline?: string;
  tags?: string[];
}

const INITIAL_DATA: ListItem[] = [
  {
    id: "1",
    title: "完成项目报告",
    description: "为团队会议完成季度报告，包括所有项目进度和关键指标。",
    date: "2024/10/5",
    type: "task",
    status: "待完成",
    senderName: "张经理",
    senderTitle: "项目经理",
    domain: "项目管理",
    publishTime: "2024/10/1 09:00",
    deadline: "2024/10/5 18:00",
    tags: ["重要", "季度报告"],
  },
  {
    id: "2",
    title: "团队会议",
    description: "讨论项目进展和下一步计划，准备好所有相关文档和演示材料。",
    date: "2024/10/5",
    type: "notification",
    status: "待完成",
    senderName: "李助理",
    senderTitle: "行政助理",
    domain: "会议安排",
    publishTime: "2024/10/3 14:00",
    tags: ["团队会议", "项目讨论"],
  },
  {
    id: "3",
    title: "代码审查",
    description: "审查新功能的拉取请求，确保代码质量和一致性。",
    date: "2024/10/5",
    type: "task",
    status: "过期",
    senderName: "王工程师",
    senderTitle: "高级开发工程师",
    domain: "代码审查",
    publishTime: "2024/10/2 10:00",
    deadline: "2024/10/4 18:00",
    tags: ["代码审查", "质量控制"],
  },
  {
    id: "4",
    title: "新消息",
    description: "John 发送了关于客户演示的消息，请及时查看并回复。",
    date: "2024/10/5",
    type: "notification",
    status: "已完成",
    senderName: "John",
    senderTitle: "客户经理",
    domain: "客户关系",
    publishTime: "2024/10/4 16:30",
    tags: ["客户演示", "重要"],
  },
];

const Stack = createStackNavigator();

function ListScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("待完成");
  const [listData, setListData] = useState<ListItem[]>(INITIAL_DATA);
  const [filteredData, setFilteredData] = useState<ListItem[]>([]);

  const handleTabChange = useCallback((tabKey) => {
    setActiveTab(tabKey);
  }, []);

  useEffect(() => {
    setFilteredData(listData.filter((item) => item.status === activeTab));
  }, [activeTab, listData]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <NativeBaseProvider>
        <SafeAreaView style={styles.container}>
          <ListHeader />
          <View style={{ marginTop: 10, width: 300, alignSelf: "center" }}>
            <ListStatusTable onTabChange={handleTabChange} />
          </View>
          <View style={styles.content}>
            <List listData={filteredData} setListData={setListData} />
          </View>
        </SafeAreaView>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="List"
            component={ListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ListItemDetail"
            component={ListItemDetail}
            options={{ title: "详情" }}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
