import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  Box,
  FlatList,
  Text,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Pressable,
  useToast,
  Center
} from "native-base";
import { Animated, StyleSheet, Dimensions, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";

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

interface DeletedItem {
  item: ListItem;
  index: number;
  toastId: any;
  countdownTimer: number;
}

const SWIPE_THRESHOLD = -80;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_HEIGHT = 100;
const DELETE_WIDTH = 80;
const UNDO_TIMEOUT = 5000; // 5 seconds for undo operation

export default function TaskNotificationList({
  listData,
  setListData,
}: {
  listData: ListItem[];
  setListData: React.Dispatch<React.SetStateAction<ListItem[]>>;
}) {
  const navigation = useNavigation();
  const animationRefs = useRef<{ [key: string]: Animated.Value }>({});
  const toast = useToast();
  const [deletedItems, setDeletedItems] = useState<DeletedItem[]>([]);
  const undoTimeoutRefs = useRef<{ [id: string]: NodeJS.Timeout }>({});
  const countdownIntervalRefs = useRef<{ [id: string]: NodeJS.Timeout }>({});
  //
  const isSwiping = useRef(false);

  // 初始化动画值
  useEffect(() => {
    listData.forEach((item) => {
      if (!animationRefs.current[item.id]) {
        animationRefs.current[item.id] = new Animated.Value(0);
      }
    });
  }, [listData]);

  useEffect(() => {
    Object.keys(animationRefs.current).forEach((id) => {
      if (!listData.some((item) => item.id === id)) {
        delete animationRefs.current[id];
      }
    });
  }, [listData]);

  const handleDelete = useCallback(
    (item: ListItem, index: number) => {
      setListData((prevData) => prevData.filter((i) => i.id !== item.id));

      const deletedItem: DeletedItem = {
        item,
        index,
        toastId: null,
        countdownTimer: UNDO_TIMEOUT / 1000,
      };

      const toastId = toast.show({
        render: () => (
          <Box bg="gray.700" px="2" py="1" rounded="sm">
            <HStack alignItems="center" space={2}>
              <Text color="white">已删除 {item.title}</Text>
              <Pressable onPress={() => handleUndo(deletedItem)}>
                <Text color="blue.300" fontWeight="bold">
                  撤销 ({deletedItem.countdownTimer}s)
                </Text>
              </Pressable>
            </HStack>
          </Box>
        ),
        placement: "top",
        duration: UNDO_TIMEOUT,
      });

      deletedItem.toastId = toastId;
      setDeletedItems((prev) => [...prev, deletedItem]);

      undoTimeoutRefs.current[item.id] = setTimeout(() => {
        handleUndoTimeout(item.id);
      }, UNDO_TIMEOUT);

      countdownIntervalRefs.current[item.id] = setInterval(() => {
        setDeletedItems((prev) =>
          prev.map((i) =>
            i.item.id === item.id
              ? { ...i, countdownTimer: i.countdownTimer - 1 }
              : i
          )
        );
      }, 1000);
    },
    [setListData, toast]
  );

  const handleUndoTimeout = useCallback(
    (itemId: string) => {
      setDeletedItems((prev) => prev.filter((i) => i.item.id !== itemId));
      toast.close(deletedItems.find((i) => i.item.id === itemId)?.toastId);
      clearInterval(countdownIntervalRefs.current[itemId]);
      delete countdownIntervalRefs.current[itemId];
    },
    [deletedItems, toast]
  );

  const handleUndo = useCallback(
    (deletedItem: DeletedItem) => {
      if (deletedItem) {
        setListData((prevData) => {
          const newData = [...prevData];
          newData.splice(deletedItem.index, 0, deletedItem.item);
          return newData;
        });
        setDeletedItems((prev) =>
          prev.filter((i) => i.item.id !== deletedItem.item.id)
        );
        toast.close(deletedItem.toastId);

        if (undoTimeoutRefs.current[deletedItem.item.id]) {
          clearTimeout(undoTimeoutRefs.current[deletedItem.item.id]);
          delete undoTimeoutRefs.current[deletedItem.item.id];
        }
        if (countdownIntervalRefs.current[deletedItem.item.id]) {
          clearInterval(countdownIntervalRefs.current[deletedItem.item.id]);
          delete countdownIntervalRefs.current[deletedItem.item.id];
        }
        toast.show({
          description: "已撤销删除操作",
          placement: "top",
          duration: 2000,
        });
      }
    },
    [setListData, toast]
  );

  const handleItemPress = useCallback(
    (item: ListItem) => {
      navigation.navigate("ListItemDetail" as never, { item } as never);
    },
    [navigation]
  );

  const taskBgColor = useColorModeValue("gray.100", "gray.800");
  const taskTextColor = useColorModeValue("gray.800", "gray.100");
  const notificationBgColor = useColorModeValue("white", "gray.700");
  const notificationTextColor = useColorModeValue("gray.800", "gray.100");
  const deleteButtonColor = useColorModeValue("red.500", "red.400");

  // 添加新的状态跟踪变量
  const pressStartTime = useRef(0);
  const pressPosition = useRef({ x: 0, y: 0 });

  const renderItem = useCallback(
    ({ item, index }: { item: ListItem; index: number }) => {
      if (!item) return null;

      // 确保该项的动画值存在
      if (!animationRefs.current[item.id]) {
        animationRefs.current[item.id] = new Animated.Value(0);
      }

      const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,

        onPanResponderGrant: () => {
          pressStartTime.current = Date.now();
        },

        onPanResponderMove: (_, gestureState: PanResponderGestureState) => {
          // 处理滑动
          const { dx } = gestureState;
          animationRefs.current[item.id].setValue(dx);
        },

        onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
          const moveDistance = Math.abs(gestureState.dx);
          const moveTime = Date.now() - pressStartTime.current;

          if (moveDistance < 5 && moveTime < 200) {
            // 点击事件
            handleItemPress(item);
          } else if (gestureState.dx < SWIPE_THRESHOLD) {
            // 滑动删除
            Animated.timing(animationRefs.current[item.id], {
              toValue: -SCREEN_WIDTH,
              duration: 250,
              useNativeDriver: true,
            }).start(() => handleDelete(item, index));
          } else {
            // 回弹
            Animated.spring(animationRefs.current[item.id], {
              toValue: 0,
              useNativeDriver: true,
              bounciness: 0,
              speed: 20,
            }).start();
          }
        },
      });

      return (
        <View style={styles.itemWrapper}>
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.deleteButtonContainer,
              {
                opacity: 1,
                backgroundColor: "red",
              },
            ]}
          >
            <Icon as={Feather} name="trash-2" size={6} color="white" />
            <Text style={styles.deleteButtonText}>删除</Text>
          </Animated.View>
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.itemContainer,
              {
                transform: [{ translateX: animationRefs.current[item.id] }],
              },
            ]}
          >
            <Box
              bg={item.type === "task" ? taskBgColor : notificationBgColor}
              p={3.5}
              rounded="xl"
              shadow={3}
              height={ITEM_HEIGHT}
              borderColor={item.type === "task" ? "gray.200" : "transparent"}
              borderWidth={0.5}
            >
              <HStack space={3} height="100%">
                <Center>
                  <Icon
                    as={Feather}
                    name={item.type === "task" ? "check-square" : "bell"}
                    size={5}
                    color={
                      item.type === "task"
                        ? taskTextColor
                        : notificationTextColor
                    }
                  />
                </Center>
                <VStack flex={1} space={1}>
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text
                      flex={1}
                      color={
                        item.type === "task"
                          ? taskTextColor
                          : notificationTextColor
                      }
                      fontWeight="600"
                      fontSize="15"
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    <Text color="gray.500" fontSize="12">
                      {item.date}
                    </Text>
                  </HStack>
                  <Text
                    color={item.type === "task" ? "gray.600" : "gray.500"}
                    fontSize="13"
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Animated.View>
        </View>
      );
    },
    [
      handleDelete,
      handleItemPress,
      taskBgColor,
      taskTextColor,
      notificationBgColor,
      notificationTextColor,
      deleteButtonColor,
    ]
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
    padding: 12, // 减小外边距
  },
  itemWrapper: {
    position: "relative",
    marginBottom: 12, // 增加卡片间距
  },
  itemContainer: {
    width: SCREEN_WIDTH - 24, // 调整宽度以匹配新的 padding
  },
  deleteButtonContainer: {
    position: "absolute",
    top: 0,
    bottom: 12, // 匹配新的 marginBottom
    right: 0,
    width: DELETE_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 12, // 增加圆角
    borderBottomRightRadius: 12,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
    marginTop: 4,
  },
});
