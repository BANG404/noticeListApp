import React, { useState } from "react";
import {
  FormControl,
  TextArea,
  Input,
  Button,
  HStack,
  Box,
  Pressable,
  Text,
} from "native-base";
export default function TagEdit({
  tags,
  selectedTags,
  newTag,
  setNewTag,
  addNewTag,
  removeTag,
}) {
  const [content, setContent] = useState("");

  return (
    <>
      <FormControl>
        <FormControl.Label _text={{ fontWeight: "bold", color: "primary.600" }}>
          标签
        </FormControl.Label>
        <HStack flexWrap="wrap" space={2} mb={2}>
          {tags.map((tag) => (
            <Box
              bg={selectedTags.includes(tag) ? "primary.500" : "primary.100"}
              px={3}
              py={1}
              borderRadius="full"
              mb={2}
            >
              <HStack space={2} alignItems="center">
                <Text
                  color={selectedTags.includes(tag) ? "white" : "primary.600"}
                >
                  {tag}
                </Text>
                <Pressable onPress={() => removeTag(tag)}>
                  <Text
                    color={selectedTags.includes(tag) ? "white" : "primary.600"}
                  >
                    ✕
                  </Text>
                </Pressable>
              </HStack>
            </Box>
          ))}
        </HStack>
        <HStack space={2}>
          <Input
            flex={1}
            placeholder="添加新标签"
            value={newTag}
            onChangeText={setNewTag}
            bg="white"
            borderColor="primary.100"
            _focus={{ borderColor: "primary.500" }}
          />
          <Button
            onPress={addNewTag}
            bg="primary.600"
            _pressed={{ bg: "primary.500" }}
          >
            添加
          </Button>
        </HStack>
      </FormControl>
    </>
  );
}
