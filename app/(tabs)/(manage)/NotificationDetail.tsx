import React, { useState, useEffect } from 'react';
import { Box, VStack, FormControl, Input, TextArea, Select, Button } from 'native-base';

export default function NotificationDetailScreen({ route, navigation }) {
  const [notification, setNotification] = useState({
    name: '',
    title: '',
    content: '',
    domain: '',
    time: '',
    deadline: '',
    tag: '',
  });

  useEffect(() => {
    if (route.params?.notification) {
      setNotification(route.params.notification);
    }
  }, [route.params?.notification]);

  const handleSave = () => {
    // Here you would typically save the notification to your backend or local storage
    console.log('Saving notification:', notification);
    navigation.goBack();
  };

  return (
    <Box bg="primary.50" flex={1} p={4}>
      <VStack space={4}>
        <FormControl>
          <FormControl.Label>Name</FormControl.Label>
          <Input
            bg="white"
            value={notification.name}
            onChangeText={(value) => setNotification({ ...notification, name: value })}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Title</FormControl.Label>
          <Input
            bg="white"
            value={notification.title}
            onChangeText={(value) => setNotification({ ...notification, title: value })}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Content</FormControl.Label>
          <TextArea
            bg="white"
            value={notification.content}
            onChangeText={(value) => setNotification({ ...notification, content: value })}
            h={20}
            autoCompleteType="off" // 添加此行
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Domain</FormControl.Label>
          <Input
            bg="white"
            value={notification.domain}
            onChangeText={(value) => setNotification({ ...notification, domain: value })}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Time</FormControl.Label>
          <Input
            bg="white"
            value={notification.time}
            onChangeText={(value) => setNotification({ ...notification, time: value })}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Deadline (Optional)</FormControl.Label>
          <Input
            bg="white"
            value={notification.deadline}
            onChangeText={(value) => setNotification({ ...notification, deadline: value })}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Tag</FormControl.Label>
          <Select
            bg="white"
            selectedValue={notification.tag}
            onValueChange={(value) => setNotification({ ...notification, tag: value })}
          >
            <Select.Item label="Important" value="Important" />
            <Select.Item label="Urgent" value="Urgent" />
            <Select.Item label="Normal" value="Normal" />
          </Select>
        </FormControl>
        <Button onPress={handleSave} bg="primary.500">
          Save
        </Button>
      </VStack>
    </Box>
  );
}