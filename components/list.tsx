import React, { useCallback, useState, useEffect } from "react";
import {
  Box,
  FlatList,
  Text,
  HStack,
  VStack,
  useTheme,
  Icon,
} from "native-base";
import { Animated, StyleSheet, Dimensions } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

type ItemType = "task" | "notification";

interface ListItem {
  id: string;
  title: string;
  description: string;
  date: string;
  type: ItemType;
  status: "待完成" | "过期" | "已完成";
}

const INITIAL_DATA: ListItem[] = [
  {
    id: "1",
    title: "完成项目报告",
    description: "为团队会议完成季度报告，包括所有项目进度和关键指标。",
    date: "2024/10/5",
    type: "task",
    status: "待完成",
  },
  {
    id: "2",
    title: "团队会议",
    description: "讨论项目进展和下一步计划，准备好所有相关文档和演示材料。",
    date: "2024/10/5",
    type: "notification",
    status: "待完成",
  },
  {
    id: "3",
    title: "代码审查",
    description: "审查新功能的拉取请求，确保代码质量和一致性。",
    date: "2024/10/5",
    type: "task",
    status: "过期",
  },
  {
    id: "4",
    title: "新消息",
    description: "John 发送了关于客户演示的消息，请及时查看并回复。",
    date: "2024/10/5",
    type: "notification",
    status: "已完成",
  },
];

const SWIPE_THRESHOLD = -100;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_HEIGHT = 100;

export default function TaskNotificationList({ activeTab }) {
  const [listData, setListData] = useState<ListItem[]>(INITIAL_DATA);
  const [filteredData, setFilteredData] = useState<ListItem[]>([]);
  const { colors } = useTheme();

  useEffect(() => {
    setFilteredData(listData.filter(item => item.status === activeTab));
  }, [activeTab, listData]);

  const handleDelete = useCallback((id: string) => {
    setListData((prevData) => prevData.filter((item) => item.id !== id));
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => {
      const translateX = new Animated.Value(0);

      const panGestureEvent = Animated.event<PanGestureHandlerGestureEvent>(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: true }
      );

      const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
        if (event.nativeEvent.state === State.END) {
          if (event.nativeEvent.translationX < SWIPE_THRESHOLD) {
            Animated.timing(translateX, {
              toValue: -SCREEN_WIDTH,
              duration: 250,
              useNativeDriver: true,
            }).start(() => handleDelete(item.id));
          } else {
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        }
      };

      return (
        <PanGestureHandler
          onGestureEvent={panGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View
            style={[styles.itemContainer, { transform: [{ translateX }] }]}
          >
            <Box
              bg={item.type === "task" ? "#808080" : "white"}
              p={4}
              mb={2}
              rounded="lg"
              shadow={3}
              height={ITEM_HEIGHT}
            >
              <HStack space={4} alignItems="center">
                <Icon
                  as={Feather}
                  name={item.type === "task" ? "check-square" : "bell"}
                  size={6}
                  color={item.type === "task" ? "white" : "#808080"}
                />
                <VStack flex={1} justifyContent="space-between">
                  <Text
                    color={item.type === "task" ? "white" : "#808080"}
                    fontWeight="bold"
                    fontSize="md"
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text
                    color={item.type === "task" ? "white" : "#808080"}
                    fontSize="sm"
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                  <Text
                    color={item.type === "task" ? "white" : "#808080"}
                    fontSize="xs"
                  >
                    {item.date}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Animated.View>
        </PanGestureHandler>
      );
    },
    [colors, handleDelete]
  );

  return (
    <FlatList
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    width: SCREEN_WIDTH - 32,
  },
});