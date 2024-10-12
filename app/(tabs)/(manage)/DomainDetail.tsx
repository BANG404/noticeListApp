import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  FormControl,
  Input,
  TextArea,
  Button,
  Heading,
  HStack,
  Text,
  IconButton,
  FlatList,
  Divider,
  useClipboard,
  useToast,
} from "native-base";
import { Feather } from "@expo/vector-icons";

type Member = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

export default function DomainDetailScreen({ route, navigation }) {
  const [domain, setDomain] = useState({
    name: "",
    notes: "",
    adminTitle: "",
    shareCode: "",
    members: [] as Member[],
  });
  const [newMember, setNewMember] = useState({ name: "", email: "" });
  const { value, onCopy, hasCopied } = useClipboard();
  const toast = useToast();

  useEffect(() => {
    if (route.params?.domain) {
      setDomain(route.params.domain);
    } else {
      // Generate a random share code for new domains
      setDomain(prev => ({ ...prev, shareCode: Math.random().toString(36).substring(2, 10) }));
    }
  }, [route.params?.domain]);

  const handleSave = () => {
    console.log("Saving domain:", domain);
    navigation.goBack();
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      setDomain(prev => ({
        ...prev,
        members: Array.isArray(prev.members) ? [...prev.members, { ...newMember, id: Date.now().toString(), isAdmin: false }] : [{ ...newMember, id: Date.now().toString(), isAdmin: false }],
      }));
      setNewMember({ name: "", email: "" });
    }
  };

  const handleRemoveMember = (id: string) => {
    setDomain(prev => ({
      ...prev,
      members: prev.members.filter(member => member.id !== id),
    }));
  };

  const handleToggleAdmin = (id: string) => {
    setDomain(prev => ({
      ...prev,
      members: prev.members.map(member =>
        member.id === id ? { ...member, isAdmin: !member.isAdmin } : member
      ),
    }));
  };

  const handleCopyShareCode = () => {
    onCopy(domain.shareCode);
    toast.show({
      description: "Share code copied to clipboard",
      placement: "top",
    });
  };

  return (
    <Box bg="coolGray.50" flex={1} safeArea>
      <VStack space={4} p={4}>
        <Heading size="xl" color="coolGray.800">
          {route.params?.domain ? "Edit Domain" : "New Domain"}
        </Heading>
        
        <FormControl>
          <FormControl.Label>Domain Name</FormControl.Label>
          <Input
            bg="white"
            value={domain.name || ""}  // 确保有默认值
            onChangeText={(value) => setDomain(prev => ({ ...prev, name: value }))}
          />
        </FormControl>
        
        <FormControl>
          <FormControl.Label>Notes</FormControl.Label>
          <TextArea
            bg="white"
            value={domain.notes || ""}  // 确保有默认值
            onChangeText={(value) => setDomain(prev => ({ ...prev, notes: value }))}
            h={20}
            autoCompleteType={undefined}
          />
        </FormControl>
        
        <FormControl>
          <FormControl.Label>Administrator Title</FormControl.Label>
          <Input
            bg="white"
            value={domain.adminTitle || ""}  // 确保有默认值
            onChangeText={(value) => setDomain(prev => ({ ...prev, adminTitle: value }))}
            placeholder="e.g., Domain Manager"
          />
        </FormControl>
        
        <FormControl>
          <FormControl.Label>Share Code</FormControl.Label>
          <HStack space={2} alignItems="center">
            <Input
              bg="white"
              value={domain.shareCode}
              isReadOnly
              flex={1}
            />
            <IconButton
              icon={<Feather name="copy" size={24} color="white" />}
              onPress={handleCopyShareCode}
              bg="primary.500"
            />
          </HStack>
        </FormControl>
        
        <Divider my={2} />
        
        <Heading size="md" color="coolGray.800">Members</Heading>
        
        <VStack space={2}>
          <HStack space={2}>
            <Input
              bg="white"
              placeholder="Name"
              value={newMember.name}
              onChangeText={(value) => setNewMember(prev => ({ ...prev, name: value }))}
              flex={1}
            />
            <Input
              bg="white"
              placeholder="Email"
              value={newMember.email}
              onChangeText={(value) => setNewMember(prev => ({ ...prev, email: value }))}
              flex={1}
            />
            <IconButton
              icon={<Feather name="plus" size={24} color="white" />}
              onPress={handleAddMember}
              bg="primary.500"
            />
          </HStack>
          
          <FlatList
            data={domain.members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <HStack space={2} justifyContent="space-between" alignItems="center" bg="white" p={2} rounded="md">
                <VStack>
                  <Text fontWeight="bold">{item.name}</Text>
                  <Text fontSize="sm" color="coolGray.600">{item.email}</Text>
                </VStack>
                <HStack space={2}>
                  <IconButton
                    icon={<Feather name={item.isAdmin ? "star" : "star"} size={20} color={item.isAdmin ? "orange" : "gray"} />}
                    onPress={() => handleToggleAdmin(item.id)}
                    variant="ghost"
                  />
                  <IconButton
                    icon={<Feather name="trash-2" size={20} color="red" />}
                    onPress={() => handleRemoveMember(item.id)}
                    variant="ghost"
                  />
                </HStack>
              </HStack>
            )}
            ItemSeparatorComponent={() => <Divider my={1} />}
          />
        </VStack>
        
        <Button onPress={handleSave} bg="primary.500" mt={4}>
          Save Domain
        </Button>
      </VStack>
    </Box>
  );
}
