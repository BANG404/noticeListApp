import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ListHeader() {
  // 获取当前日期
  const currentDate = new Date();
  // 格式化日期为 YYYY/MM/DD 格式
  const formattedDate = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`;

  return (
    <View style={styles.header}>
      <Ionicons name="person-outline" size={24} color="black" />
      {/* 使用格式化后的日期 */}
      <Text style={styles.dateText}>{formattedDate}</Text>
      <Ionicons name="color-wand-outline" size={24} color="black" />
    </View>
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
