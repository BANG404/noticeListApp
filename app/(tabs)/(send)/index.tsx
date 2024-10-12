import React, { useState, useEffect } from "react";
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
  FlatList,
  IconButton,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import TagEdit from "../../../components/tag_edit";
import DomainSelect from "../../../components/domain_select";
import CustomDateTimePicker from "../../../components/DateTimePicker";

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

// 模拟从数据库获取域的函数
const fetchDomains = async (query: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const allDomains = [
    { value: "marketing", label: "市场营销" },
    { value: "sales", label: "销售" },
    { value: "engineering", label: "工程" },
    { value: "hr", label: "人力资源" },
    { value: "finance", label: "财务" },
    { value: "customer_service", label: "客户服务" },
    { value: "product", label: "产品" },
    { value: "design", label: "设计" },
  ];
  return allDomains.filter(
    (domain) =>
      domain.label.toLowerCase().includes(query.toLowerCase()) ||
      domain.value.toLowerCase().includes(query.toLowerCase())
  );
};

const predefinedTags = ["重要", "紧急", "公告", "活动", "提醒"];

export default function NotificationPublisherScreen() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notification, setNotification] = useState({
    content: "",
    tags: [],
    domain: "",
    deadline: new Date(),
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [domainQuery, setDomainQuery] = useState("");
  const [availableDomains, setAvailableDomains] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDomains(domainQuery).then(setAvailableDomains);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [domainQuery]);

  const addNewTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };
  const handleDateChange = (newDate) => {
    setNotification((prev) => ({ ...prev, deadline: newDate }));
  };

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
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const togglePredefinedTag = (tag: string) => {
    setTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const toggleDomain = (domain: string) => {
    setSelectedDomains((prevDomains) =>
      prevDomains.includes(domain)
        ? prevDomains.filter((d) => d !== domain)
        : [...prevDomains, domain]
    );
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
                _text={{
                  color: "coolGray.800",
                  fontSize: "sm",
                  fontWeight: 600,
                }}
              >
                截止时间
              </FormControl.Label>
              <Pressable onPress={() => setShowDatePicker(true)}>
                <Input
                  value={notification.deadline.toLocaleString()}
                  isReadOnly
                  bg="white"
                  borderColor="coolGray.200"
                  _focus={{ borderColor: "primary.500", bg: "white" }}
                />
              </Pressable>
              <CustomDateTimePicker
                isOpen={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                onConfirm={handleDateChange}
                initialDate={notification.deadline}
              />
            </FormControl>
            <TagEdit
              tags={tags}
              selectedTags={selectedTags}
              newTag={newTag}
              setNewTag={setNewTag}
              addNewTag={addNewTag}
              removeTag={removeTag}
            />

            <DomainSelect
              domainQuery={domainQuery}
              setDomainQuery={setDomainQuery}
              availableDomains={availableDomains}
              selectedDomains={selectedDomains}
              toggleDomain={toggleDomain}
            />
            <Button
              onPress={handleSubmit}
              mt={4}
              bg="primary.600"
              _pressed={{ bg: "primary.500" }}
            >
              发布通知
            </Button>
          </VStack>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
}
