import React, { useState } from "react";
import { FlatList } from "react-native";
import {
  Box,
  Text,
  VStack,
  HStack,
  Spacer,
  IconButton,
  AddIcon,
  DeleteIcon,
  Pressable,
} from "native-base";

const initialDomains = [
  { id: "1", name: "Work", notes: "Company domain" ,shareCode:'112'},
  { id: "2", name: "Personal", notes: "Personal projects" },
];

export default function DomainsScreen({ navigation }) {
  const [domains, setDomains] = useState(initialDomains);

  const deleteDomain = (id) => {
    setDomains(domains.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate("DomainDetail", { domain: item })}
    >
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
              {item.name}
            </Text>
            <Text fontSize="xs" color="coolGray.500" mt={1}>
              {item.notes}
            </Text>
          </VStack>
          <Spacer />
          <IconButton
            icon={<DeleteIcon size="sm" color="coolGray.500" />}
            onPress={() => deleteDomain(item.id)}
          />
        </HStack>
      </Box>
    </Pressable>
  );

  return (
    <Box bg="coolGray.100" flex={1}>
      <FlatList
        data={domains}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
      <IconButton
        icon={<AddIcon />}
        onPress={() => navigation.navigate("DomainDetail")}
        position="absolute"
        bottom={8}
        right={8}
        bg="white"
        rounded="full"
        shadow={2}
        size="lg"
      />
    </Box>
  );
}
