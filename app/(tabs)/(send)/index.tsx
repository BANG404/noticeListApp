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

export default function NotificationPublisherScreen() {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const handleSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(
      "通知已发布",
      `通知已成功发送到 ${selectedDomains.join(", ")} 域。`
    );
    setContent("");
    setTags([]);
    setSelectedDomains([]);
  };

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <NativeBaseProvider theme={customTheme}>
      <Box flex={1} bg="primary.50" safeArea>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} p={6}>
            <Heading size="xl" fontWeight="bold" color="primary.600">
              发布新通知
            </Heading>

            <FormControl>
              <FormControl.Label
                _text={{ fontWeight: "bold", color: "primary.600" }}
              >
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
              <FormControl.Label
                _text={{ fontWeight: "bold", color: "primary.600" }}
              >
                标签
              </FormControl.Label>
              <HStack flexWrap="wrap" space={2} mb={2}>
                {tags.map((tag) => (
                  <Pressable
                    key={tag}
                    onPress={() => removeTag(tag)}
                    // 移除无效的 onHoverIn 属性
                  >
                    <Box
                      bg="primary.100"
                      px={3}
                      py={1}
                      borderRadius="full"
                      mb={2}
                    >
                      <Text color="primary.600">{tag} ✕</Text>
                    </Box>
                  </Pressable>
                ))}
              </HStack>
              <HStack space={2}>
                <Input
                  flex={1}
                  placeholder="添加标签"
                  value={currentTag}
                  onChangeText={setCurrentTag}
                  onSubmitEditing={addTag}
                  bg="white"
                  borderColor="primary.100"
                  _focus={{ borderColor: "primary.500" }}
                />
                <Button
                  onPress={addTag}
                  bg="primary.600"
                  _pressed={{ bg: "primary.500" }}
                >
                  <Text>添加</Text>
                </Button>
              </HStack>
            </FormControl>

            <FormControl>
              <FormControl.Label
                _text={{ fontWeight: "bold", color: "primary.600" }}
              >
                发送域
              </FormControl.Label>
              <Select
                selectedValue={
                  selectedDomains[selectedDomains.length - 1] || ""
                }
                minWidth="200"
                accessibilityLabel="选择发送域"
                placeholder="选择发送域"
                bg="white"
                borderColor="primary.100"
                _selectedItem={{
                  bg: "primary.100",
                  endIcon: <CheckIcon size="5" color="primary.600" />,
                }}
                onValueChange={(itemValue) => {
                  if (!selectedDomains.includes(itemValue)) {
                    setSelectedDomains([...selectedDomains, itemValue]);
                  }
                }}
              >
                {domains.map((domain) => (
                  <Select.Item
                    key={domain.value}
                    label={domain.label}
                    value={domain.value}
                  />
                ))}
              </Select>
              <HStack flexWrap="wrap" space={2} mt={2}>
                {selectedDomains.map((domain) => (
                  <Pressable
                    key={domain}
                    onPress={() =>
                      setSelectedDomains(
                        selectedDomains.filter((d) => d !== domain)
                      )
                    }
                    // 移除无效的 onHoverIn 属性
                  >
                    <Box
                      bg="primary.100"
                      px={3}
                      py={1}
                      borderRadius="full"
                      mb={2}
                    >
                      <Text color="primary.600">
                        {domains.find((d) => d.value === domain)?.label} ✕
                      </Text>
                    </Box>
                  </Pressable>
                ))}
              </HStack>
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