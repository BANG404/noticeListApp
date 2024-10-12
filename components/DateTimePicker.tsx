import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modal } from 'native-base';

interface DateTimePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
  initialDate?: Date;
}

export default function DateTimePicker({
  isOpen,
  onClose,
  onConfirm,
  initialDate = new Date(),
}: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [longPressInterval, setLongPressInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedDate(initialDate);
    }
  }, [isOpen, initialDate]);

  useEffect(() => {
    return () => {
      if (longPressInterval) {
        clearInterval(longPressInterval);
      }
    };
  }, [longPressInterval]);

  const updateDate = (
    type: 'year' | 'month' | 'day' | 'hour' | 'minute',
    increment: number
  ) => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      switch (type) {
        case 'year':
          newDate.setFullYear(newDate.getFullYear() + increment);
          break;
        case 'month':
          newDate.setMonth(newDate.getMonth() + increment);
          break;
        case 'day':
          newDate.setDate(newDate.getDate() + increment);
          break;
        case 'hour':
          newDate.setHours(newDate.getHours() + increment);
          break;
        case 'minute':
          newDate.setMinutes(newDate.getMinutes() + increment);
          break;
      }
      return newDate;
    });
  };

  const handleLongPressStart = (type: 'year' | 'month' | 'day' | 'hour' | 'minute', increment: number) => {
    updateDate(type, increment);
    const interval = setInterval(() => {
      updateDate(type, increment);
    }, 50);
    setLongPressInterval(interval);
  };

  const handleLongPressEnd = () => {
    setIsLongPressing(false);
    if (longPressInterval) {
      clearInterval(longPressInterval);
    }
    setLongPressInterval(null);
  };

  const handleConfirm = () => {
    onConfirm(selectedDate);
    onClose();
  };

  const renderPicker = (
    type: 'year' | 'month' | 'day' | 'hour' | 'minute',
    label: string
  ) => {
    let value: number;
    switch (type) {
      case 'year':
        value = selectedDate.getFullYear();
        break;
      case 'month':
        value = selectedDate.getMonth() + 1;
        break;
      case 'day':
        value = selectedDate.getDate();
        break;
      case 'hour':
        value = selectedDate.getHours();
        break;
      case 'minute':
        value = selectedDate.getMinutes();
        break;
    }

    return (
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.pickerControls}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => updateDate(type, 1)}
            onLongPress={() => handleLongPressStart(type, 1)}
            onPressOut={handleLongPressEnd}
          >
            <Text style={styles.buttonText}>▲</Text>
          </TouchableOpacity>
          <Text style={styles.value}>{value.toString().padStart(2, '0')}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => updateDate(type, -1)}
            onLongPress={() => handleLongPressStart(type, -1)}
            onPressOut={handleLongPressEnd}
          >
            <Text style={styles.buttonText}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>选择日期和时间</Text>
        <View style={styles.pickerGrid}>
          {renderPicker('year', '年')}
          {renderPicker('month', '月')}
          {renderPicker('day', '日')}
          {renderPicker('hour', '时')}
          {renderPicker('minute', '分')}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>确认</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  pickerGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  pickerControls: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 5,
  },
  button: {
    padding: 5,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    padding: 10,
    marginRight: 10,
  },
  cancelButtonText: {
    color: 'gray',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
  },
});