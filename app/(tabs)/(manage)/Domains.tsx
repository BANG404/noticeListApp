import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Box, Text, VStack, HStack, Spacer, IconButton, AddIcon, DeleteIcon, Pressable } from 'native-base';

const initialDomains = [
  { id: '1', name: 'Work', url: 'https://work.com', notes: 'Company domain' },
  { id: '2', name: 'Personal', url: 'https://personal.com', notes: 'Personal projects' },
];

export default function DomainsScreen({ navigation }) {
  const [domains, setDomains] = useState(initialDomains);

  const deleteDomain = (id) => {
    setDomains(domains.filter(item => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate('DomainDetail', { domain: item })}>
      <Box borderBottomWidth="1" borderColor="primary.100" pl={["0", "4"]} pr={["0", "5"]} py="2">
        <HStack space={[2, 3]} justifyContent="space-between">
          <VStack>
            <Text color="primary.500" bold>
              {item.name}
            </Text>
            <Text color="primary.900">{item.url}</Text>
            <Text fontSize="xs" color="primary.500">
              {item.notes}
            </Text>
          </VStack>
          <Spacer />
          <IconButton
            icon={<DeleteIcon size="sm" />}
            onPress={() => deleteDomain(item.id)}
          />
        </HStack>
      </Box>
    </Pressable>
  );

  return (
    <Box bg="primary.50" flex={1}>
      <FlatList
        data={domains}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <IconButton
        icon={<AddIcon />}
        onPress={() => navigation.navigate('DomainDetail')}
        position="absolute"
        bottom={4}
        right={4}
        bg="primary.500"
        rounded="full"
      />
    </Box>
  );
}