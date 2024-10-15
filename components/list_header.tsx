import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Box,
  Text,
  Pressable,
  Modal,
  VStack,
  HStack,
  Avatar,
  Button,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function EnhancedListHeader() {
  const [showModal, setShowModal] = useState(false);

  // 获取当前日期
  const currentDate = new Date();
  // 格式化日期为 YYYY/MM/DD 格式
  const formattedDate = `${currentDate.getFullYear()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}`;

  const handleAvatarPress = () => {
    setShowModal(true);
  };

  const handleSwitchAccount = () => {
    // Implement account switching logic here
    console.log("Switching account");
    setShowModal(false);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out");
    setShowModal(false);
  };

  return (
    <Box style={styles.header}>
      <Pressable onPress={handleAvatarPress}>
        <Avatar
          size="sm"
          bg="gray.300"
          source={{
            uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          }}
        >
          TE
        </Avatar>
      </Pressable>
      <Box flex={1} alignItems="center">
        <Text style={styles.dateText}>{formattedDate}</Text>
      </Box>
      <Ionicons name="color-wand-outline" size={24} color="black" />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Account Options</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Switch Account</Text>
                <Button onPress={handleSwitchAccount}>Switch</Button>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Logout</Text>
                <Button onPress={handleLogout} colorScheme="danger">
                  Logout
                </Button>
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
