import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Box, Text, VStack, HStack, Tag, Icon } from 'native-base';
import { Feather } from '@expo/vector-icons';

interface ListItemDetailProps {
  item: {
    id: string;
    title: string;
    description: string;
    date: string;
    type: 'task' | 'notification';
    status: '待完成' | '过期' | '已完成';
    senderName: string;
    senderTitle: string;
    domain: string;
    publishTime: string;
    deadline?: string;
    tags?: string[];
  };
}

export default function ListItemDetail({ item }: ListItemDetailProps) {
  return (
    <ScrollView style={styles.container}>
      <Box bg="white" p={4} rounded="lg" shadow={3}>
        <VStack space={4}>
          <HStack space={4} alignItems="center">
            <Icon
              as={Feather}
              name={item.type === 'task' ? 'check-square' : 'bell'}
              size={6}
              color={item.type === 'task' ? 'gray.600' : 'gray.400'}
            />
            <VStack>
              <Text fontSize="xl" fontWeight="bold">
                {item.title}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {item.type === 'task' ? '任务' : '通知'}
              </Text>
            </VStack>
          </HStack>

          <VStack space={2}>
            <HStack space={2} alignItems="center">
              <Icon as={Feather} name="user" size={4} color="gray.500" />
              <Text fontSize="md">{item.senderName}</Text>
              <Text fontSize="sm" color="gray.500">
                ({item.senderTitle})
              </Text>
            </HStack>
            <HStack space={2} alignItems="center">
              <Icon as={Feather} name="globe" size={4} color="gray.500" />
              <Text fontSize="md">{item.domain}</Text>
            </HStack>
          </VStack>

          <VStack space={2}>
            <Text fontSize="md" fontWeight="bold">
              内容
            </Text>
            <Text fontSize="md">{item.description}</Text>
          </VStack>

          <VStack space={2}>
            <HStack space={2} alignItems="center">
              <Icon as={Feather} name="clock" size={4} color="gray.500" />
              <Text fontSize="sm">发布时间: {item.publishTime}</Text>
            </HStack>
            {item.type === 'task' && item.deadline && (
              <HStack space={2} alignItems="center">
                <Icon as={Feather} name="calendar" size={4} color="gray.500" />
                <Text fontSize="sm">截止时间: {item.deadline}</Text>
              </HStack>
            )}
            <HStack space={2} alignItems="center">
              <Icon as={Feather} name="activity" size={4} color="gray.500" />
              <Text fontSize="sm">
                状态: <Text fontWeight="bold">{item.status}</Text>
              </Text>
            </HStack>
          </VStack>

          {item.tags && item.tags.length > 0 && (
            <VStack space={2}>
              <Text fontSize="md" fontWeight="bold">
                标签
              </Text>
              <HStack flexWrap="wrap" space={2}>
                {item.tags.map((tag, index) => (
                  <Tag key={index} colorScheme="blue" size="sm">
                    {tag}
                  </Tag>
                ))}
              </HStack>
            </VStack>
          )}
        </VStack>
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
});