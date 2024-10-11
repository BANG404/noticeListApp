import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Box, Text, VStack, HStack, Spacer, IconButton, AddIcon, DeleteIcon, Pressable } from 'native-base';

const initialNotifications = [
  { id: '1', name: 'John Doe', title: 'Mr.', content: 'Meeting at 2 PM', domain: 'Work', time: '2023-05-20 10:00', deadline: '2023-05-20 14:00', tag: 'Important' },
  { id: '2', name: 'Jane Smith', title: 'Ms.', content: 'Project deadline', domain: 'Work', time: '2023-05-21 09:00', deadline: '2023-05-25 18:00', tag: 'Urgent' },
];

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(item => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate('NotificationDetail', { notification: item })}>
      <Box borderBottomWidth="1" borderColor="primary.100" pl={["0", "4"]} pr={["0", "5"]} py="2">
        <HStack space={[2, 3]} justifyContent="space-between">
          <VStack>
            <Text color="primary.500" bold>
              {item.name} ({item.title})
            </Text>
            <Text color="primary.900">{item.content}</Text>
            <Text fontSize="xs" color="primary.500">
              {item.time} - {item.domain}
            </Text>
          </VStack>
          <Spacer />
          <IconButton
            icon={<DeleteIcon size="sm" />}
            onPress={() => deleteNotification(item.id)}
          />
        </HStack>
      </Box>
    </Pressable>
  );

  return (
    <Box bg="primary.50" flex={1}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <IconButton
        icon={<AddIcon />}
        onPress={() => navigation.navigate('NotificationDetail')}
        position="absolute"
        bottom={4}
        right={4}
        bg="primary.500"
        rounded="full"
      />
    </Box>
  );
}