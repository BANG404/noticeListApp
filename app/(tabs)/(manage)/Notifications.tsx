import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Box, Text, VStack, HStack, Spacer, IconButton, DeleteIcon, Pressable, Badge } from 'native-base';

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
      <Box 
        borderBottomWidth="1" 
        borderColor="coolGray.200" 
        pl="4" 
        pr="5" 
        py="2"
        bg="white"
        shadow={1}
        rounded="lg"
        my={1}
        mx={2}
      >
        <HStack space={3} justifyContent="space-between">
          <VStack>
            <Text color="coolGray.800" bold>
              {item.name} ({item.title})
            </Text>
            <Text color="coolGray.600" mt={1}>
              {item.content}
            </Text>
            <HStack alignItems="center" space={2} mt={2}>
              <Badge colorScheme={item.tag === 'Important' ? 'red' : 'orange'} variant="subtle" rounded="full">
                {item.tag}
              </Badge>
              <Text fontSize="xs" color="coolGray.500">
                {item.time} - {item.domain}
              </Text>
            </HStack>
          </VStack>
          <Spacer />
          <IconButton
            icon={<DeleteIcon size="sm" color="coolGray.500" />}
            onPress={() => deleteNotification(item.id)}
          />
        </HStack>
      </Box>
    </Pressable>
  );

  return (
    <Box bg="coolGray.100" flex={1}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
      
    </Box>
  );
}