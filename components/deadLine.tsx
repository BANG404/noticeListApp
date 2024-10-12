import React, { useState, useRef } from "react";
import { Platform } from "react-native";
import { Input, IconButton, Pressable, Box } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

interface DeadlinePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
}

export default function DeadlinePicker({
  value,
  onChange,
  placeholder = "选择截止时间",
}: DeadlinePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value || new Date());
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handlePress = () => {
    if (Platform.OS === "web") {
      dateInputRef.current?.click();
    } else {
      setShowPicker(true);
    }
  };

  const handleChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS !== "web") {
      setShowPicker(Platform.OS === "ios");
    }
    if (selectedDate) {
      setTempDate(selectedDate);
      onChange(selectedDate);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const WebDateTimePicker = () => (
    <input
      ref={dateInputRef}
      type="datetime-local"
      value={tempDate.toISOString().slice(0, 16)}
      onChange={(e) => {
        const date = new Date(e.target.value);
        setTempDate(date);
        onChange(date);
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );

  return (
    <Box>
      <Pressable onPress={handlePress}>
        {({ isPressed }) => (
          <Box
            bg={isPressed ? "primary.100" : "white"}
            borderColor="primary.100"
            borderWidth={1}
            borderRadius="md"
            overflow="hidden"
          >
            <Input
              value={formatDate(value)}
              placeholder={placeholder}
              isReadOnly={true}
              bg="transparent"
              borderWidth={0}
              _focus={{ bg: "transparent" }}
              InputRightElement={
                <IconButton
                  icon={
                    <Ionicons
                      name="calendar-outline"
                      size={24}
                      color="#52525b"
                    />
                  }
                  onPress={handlePress}
                  bg="transparent"
                />
              }
            />
            {Platform.OS === "web" && <WebDateTimePicker />}
          </Box>
        )}
      </Pressable>
      {Platform.OS !== "web" && showPicker && (
        <DateTimePicker
          value={tempDate}
          mode="datetime"
          display="default"
          onChange={handleChange}
        />
      )}
    </Box>
  );
}
