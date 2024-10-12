import React, { useEffect, useState } from "react";
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
import TagEdit from "../../../components/tag_edit";
import DomainSelect from "../../../components/domain_select";
import DeadlinePicker from "../../../components/deadLine";

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
const [targetDate, setTargetDate] = useState(new Date()); // 确保初始值是有效的日期对象

export default function NotificationPublisherScreen() {
  const [content, setContent] = useState("");
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
    console.log("通知已发布", `通知已成功发送到 ${selectedDomain} 域。`);
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

            <DeadlinePicker value={targetDate} onChange={setTargetDate} />
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
