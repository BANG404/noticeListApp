import React, { useState, useEffect } from "react";
import { Box, VStack, FormControl, Input, TextArea, Button } from "native-base";

export default function DomainDetail({ route, navigation }) {
  const [domain, setDomain] = useState({
    name: "",
    url: "",
    notes: "",
  });

  useEffect(() => {
    if (route.params?.domain) {
      setDomain(route.params.domain);
    }
  }, [route.params?.domain]);

  const handleSave = () => {
    // Here you would typically save the domain to your backend or local storage
    console.log("Saving domain:", domain);
    navigation.goBack();
  };

  return (
    <Box bg="primary.50" flex={1} p={4}>
      <VStack space={4}>
        <FormControl>
          <FormControl.Label>Domain Name</FormControl.Label>
          <Input
            bg="white"
            value={domain.name}
            onChangeText={(value) => setDomain({ ...domain, name: value })}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Domain URL</FormControl.Label>
          <Input
            bg="white"
            value={domain.url}
            onChangeText={(value) => setDomain({ ...domain, url: value })}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Notes</FormControl.Label>
          <TextArea
            bg="white"
            value={domain.notes}
            onChangeText={(value) => setDomain({ ...domain, notes: value })}
            h={20}
            autoCompleteType="off" // 添加此行
          />
        </FormControl>
        <Button onPress={handleSave} bg="primary.500">
          Save
        </Button>
      </VStack>
    </Box>
  );
}
