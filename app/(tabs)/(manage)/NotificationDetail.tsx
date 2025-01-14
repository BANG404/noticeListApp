import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import {
  NativeBaseProvider,
  extendTheme,
  Box,
  ScrollView,
  VStack,
  Heading,
  FormControl,
  Input,
  Button,
  Text,
  Pressable,
} from "native-base";
import TagEdit from "../../../components/tag_edit";
import DomainSelect from "../../../components/domain_select";
import CustomDateTimePicker from "../../../components/DateTimePicker";
import MarkdownEditor from "../../../components/markdownedite";

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
  const [markdownIsEdit, setMarkdownIsEdit] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notification, setNotification] = useState({
    content: "",
    tags: [],
    domain: "",
    deadline: new Date(),
  });
  const [content, setContent] = useState("# 通知内容");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedDeadline, setSelectedDeadline] = useState("");
  const [tags, setTags] = useState<string[]>(["重要", "紧急", "常规"]);
  const [domainQuery, setDomainQuery] = useState("");
  const [newTag, setNewTag] = useState("");
  const [availableDomains, setAvailableDomains] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false); // 添加状态管理
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || notification.deadline;
    setShowDatePicker(Platform.OS === "ios");
    setNotification((prev) => ({ ...prev, deadline: currentDate }));
  };
  const handleDateChange = (newDate) => {
    if (newDate) {
      // 确保 newDate 是有效的
      setNotification((prev) => ({ ...prev, deadline: newDate }));
      console.log("截止时间已更新:", newDate); // 输出用户选择的截止时间
    } else {
    }
  };
  // 模拟���数据库获取域的函数
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
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDomains(domainQuery).then(setAvailableDomains);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [domainQuery]);

  const toggleDomain = (domain: string) => {
    setSelectedDomains((prevDomains) =>
      prevDomains.includes(domain)
        ? prevDomains.filter((d) => d !== domain)
        : [...prevDomains, domain]
    );
  };

  const handleSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("��知已发布", `通知已成功发送到 ${selectedDomain} 域。`);
    setContent("");
    setSelectedTags([]);
    setSelectedDomain("");
    setSelectedDeadline("");
  };

  const addNewTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
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
              <FormControl.Label
                _text={{ fontWeight: "bold", color: "primary.600" }}
              >
                通知内容
              </FormControl.Label>
              <MarkdownEditor
                markdownText={content}
                setMarkdownText={setContent}
                isEditing={markdownIsEdit}
                setIsEditing={setMarkdownIsEdit}
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
              <Pressable
                onPress={() => {
                  setShowModal(true);
                  setShowDatePicker(true);
                }}
              >
                <Input
                  value={notification.deadline.toLocaleString()}
                  isReadOnly
                  bg="white"
                  borderColor="coolGray.200"
                  _focus={{ borderColor: "primary.500", bg: "white" }}
                />
              </Pressable>
            </FormControl>
            {/* 模型组件 */}

            <CustomDateTimePicker
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onConfirm={(date) => {
                handleDateChange(date);
                setShowModal(false);
              }}
              initialDate={notification.deadline}
            />
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
              <Text>发布通知</Text>
            </Button>
          </VStack>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
}
