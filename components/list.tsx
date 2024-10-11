import React, { useCallback, useState } from "react";
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
}

const INITIAL_DATA: ListItem[] = [
  {
    id: "1",
    title: "Complete project report",
    description: "Finish the quarterly report for the team meeting",
    date: "2024/10/5",
    type: "task",
  },
  {
    id: "2",
    title: "Team meeting",
    description: "Discuss project progress and next steps",
    date: "2024/10/5",
    type: "notification",
  },
  {
    id: "3",
    title: "Code review",
    description: "Review pull requests for the new feature",
    date: "2024/10/5",
    type: "task",
  },
  {
    id: "4",
    title: "New message",
    description: "John sent you a message about the client presentation",
    date: "2024/10/5",
    type: "notification",
  },
];

const SWIPE_THRESHOLD = -100;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_HEIGHT = 100;

export default function TaskNotificationList() {
  const [listData, setListData] = useState<ListItem[]>(INITIAL_DATA);
  const { colors } = useTheme();

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
              bg={item.type === "task" ? colors.gray[800] : colors.gray[100]}
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
                  color={item.type === "task" ? colors.white : colors.gray[800]}
                />
                <VStack flex={1} justifyContent="space-between">
                  <Text
                    color={
                      item.type === "task" ? colors.white : colors.gray[800]
                    }
                    fontWeight="bold"
                    fontSize="md"
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text
                    color={
                      item.type === "task" ? colors.gray[300] : colors.gray[600]
                    }
                    fontSize="sm"
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                  <Text
                    color={
                      item.type === "task" ? colors.gray[400] : colors.gray[500]
                    }
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
      data={listData}
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
