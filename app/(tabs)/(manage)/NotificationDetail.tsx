import React, { useState } from "react";
import {
  NativeBaseProvider,
  extendTheme,
  Box,
  ScrollView,
  VStack,
  Heading,
  FormControl,
  TextArea,
  Input,
  Button,
  HStack,
  Text,
  Pressable,
  Select,
  CheckIcon,
} from "native-base";

const customTheme = extendTheme({
  colors: {
    primary: {
      50: "#f4f4f5",
      100: "#e4e4e7",
      500: "#71717a",
      600: "#52525b",
    },
  },
});

const domains = [
  { value: "marketing", label: "市场营销" },
  { value: "sales", label: "销售" },
  { value: "engineering", label: "工程" },
  { value: "hr", label: "人力资源" },
  { value: "finance", label: "财务" },
];

const deadlines = ["1天", "3天", "1周", "2周", "1个月"];

export default function NotificationPublisherScreen() {
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedDeadline, setSelectedDeadline] = useState("");
  const [tags, setTags] = useState<string[]>(["重要", "紧急", "常规"]);
  const [newTag, setNewTag] = useState("");

  const handleSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(
      "通知已发布",
      `通知已成功发送到 ${selectedDomain} 域。`
    );
    setContent("");
    setSelectedTags([]);
    setSelectedDomain("");
    setSelectedDeadline("");
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const addNewTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <NativeBaseProvider theme={customTheme}>
      <Box flex={1} bg="primary.50" safeArea>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} p={6}>
            <Heading size="xl" fontWeight="bold" color="primary.600">
              修改通知
            </Heading>

            <FormControl>
              <FormControl.Label _text={{ fontWeight: "bold", color: "primary.600" }}>
                通知内容
              </FormControl.Label>
              <TextArea
                h={32}
                placeholder="输入通知内容"
                value={content}
                onChangeText={setContent}
                bg="white"
                borderColor="primary.100"
                _focus={{ borderColor: "primary.500" }}
                autoCompleteType={undefined}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label _text={{ fontWeight: "bold", color: "primary.600" }}>
                标签
              </FormControl.Label>
              <HStack flexWrap="wrap" space={2} mb={2}>
                {tags.map((tag) => (
                  <Pressable key={tag} onPress={() => toggleTag(tag)}>
                    <Box
                      bg={selectedTags.includes(tag) ? "primary.500" : "primary.100"}
                      px={3}
                      py={1}
                      borderRadius="full"
                      mb={2}
                    >
                      <HStack space={2} alignItems="center">
                        <Text color={selectedTags.includes(tag) ? "white" : "primary.600"}>
                          {tag}
                        </Text>
                        <Pressable onPress={() => removeTag(tag)}>
                          <Text color={selectedTags.includes(tag) ? "white" : "primary.600"}>✕</Text>
                        </Pressable>
                      </HStack>
                    </Box>
                  </Pressable>
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

            <FormControl>
              <FormControl.Label _text={{ fontWeight: "bold", color: "primary.600" }}>
                发送域
              </FormControl.Label>
              <Select
                selectedValue={selectedDomain}
                minWidth="200"
                accessibilityLabel="选择发送域"
                placeholder="选择发送域"
                bg="white"
                borderColor="primary.100"
                _selectedItem={{
                  bg: "primary.100",
                  endIcon: <CheckIcon size="5" color="primary.600" />,
                }}
                onValueChange={setSelectedDomain}
              >
                {domains.map((domain) => (
                  <Select.Item
                    key={domain.value}
                    label={domain.label}
                    value={domain.value}
                  />
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormControl.Label _text={{ fontWeight: "bold", color: "primary.600" }}>
                截止时间
              </FormControl.Label>
              <Select
                selectedValue={selectedDeadline}
                minWidth="200"
                accessibilityLabel="选择截止时间"
                placeholder="选择截止时间"
                bg="white"
                borderColor="primary.100"
                _selectedItem={{
                  bg: "primary.100",
                  endIcon: <CheckIcon size="5" color="primary.600" />,
                }}
                onValueChange={setSelectedDeadline}
              >
                {deadlines.map((deadline) => (
                  <Select.Item
                    key={deadline}
                    label={deadline}
                    value={deadline}
                  />
                ))}
              </Select>
            </FormControl>


            <Button
              onPress={handleSubmit}
              mt={4}
              bg="primary.600"
              _pressed={{ bg: "primary.500" }}
            >
              <Text>发布通知</Text>
            </Button>
          </VStack>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
}