import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, extendTheme, Box, ScrollView, VStack, Heading, FormControl, TextArea, Input, Button, HStack, Text, Pressable, FlatList, IconButton } from 'native-base';
import { Ionicons } from '@expo/vector-icons';


const customTheme = extendTheme({
  colors: {
    primary: {
      50: '#f4f4f5',
      100: '#e4e4e7',
      500: '#71717a',
      600: '#52525b',
    },
  },
});

// 模拟从数据库获取域的函数
const fetchDomains = async (query: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
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
  return allDomains.filter(domain => 
    domain.label.toLowerCase().includes(query.toLowerCase()) ||
    domain.value.toLowerCase().includes(query.toLowerCase())
  );
};

const predefinedTags = ["重要", "紧急", "公告", "活动", "提醒"];

export default function NotificationPublisherScreen() {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [domainQuery, setDomainQuery] = useState('');
  const [availableDomains, setAvailableDomains] = useState<{value: string, label: string}[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDomains(domainQuery).then(setAvailableDomains);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [domainQuery]);

  const handleSubmit = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("通知已发布", `通知已成功发送到 ${selectedDomains.join(', ')} 域。`);
    setContent('');
    setTags([]);
    setSelectedDomains([]);
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const togglePredefinedTag = (tag: string) => {
    setTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  const toggleDomain = (domain: string) => {
    setSelectedDomains(prevDomains => 
      prevDomains.includes(domain)
        ? prevDomains.filter(d => d !== domain)
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
              <FormControl.Label _text={{ fontWeight: "bold", color: "primary.600" }}>通知内容</FormControl.Label>
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
              <FormControl.Label _text={{ fontWeight: "bold", color: "primary.600" }}>标签</FormControl.Label>
              <HStack flexWrap="wrap" space={2} mb={2}>
                {predefinedTags.map(tag => (
                  <Pressable
                    key={tag}
                    onPress={() => togglePredefinedTag(tag)}
                    bg={tags.includes(tag) ? "primary.500" : "primary.100"}
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    <Text color={tags.includes(tag) ? "white" : "primary.600"}>{tag}</Text>
                  </Pressable>
                ))}
              </HStack>
              <HStack space={2} mb={2}>
                <Input
                  flex={1}
                  placeholder="添加自定义标签"
                  value={newTag}
                  onChangeText={setNewTag}
                  bg="white"
                  borderColor="primary.100"
                  _focus={{ borderColor: "primary.500" }}
                />
                <IconButton
                  icon={<Ionicons name="add" size={24} color="white" />}
                  onPress={addTag}
                  bg="primary.600"
                  _pressed={{ bg: "primary.500" }}
                  borderRadius="full"
                />
              </HStack>
              <HStack flexWrap="wrap" space={2}>
                {tags.map(tag => (
                  <Pressable
                    key={tag}
                    onPress={() => removeTag(tag)}
                    bg="primary.500"
                    px={3}
                    py={1}
                    borderRadius="full"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Text color="white" mr={1}>{tag}</Text>
                    <Ionicons name="close" size={16} color="white" />
                  </Pressable>
                ))}
              </HStack>
            </FormControl>

            <FormControl>
              <FormControl.Label _text={{ fontWeight: "bold", color: "primary.600" }}>发送域</FormControl.Label>
              <Input
                placeholder="搜索发送域"
                value={domainQuery}
                onChangeText={setDomainQuery}
                bg="white"
                borderColor="primary.100"
                _focus={{ borderColor: "primary.500" }}
                mb={2}
              />
              <FlatList
                data={availableDomains}
                renderItem={({ item }) => (
                  <Pressable 
                    onPress={() => toggleDomain(item.value)}
                    bg={selectedDomains.includes(item.value) ? "primary.100" : "white"}
                    p={2}
                    mb={1}
                    borderRadius="md"
                  >
                    <Text color="primary.600">{item.label}</Text>
                  </Pressable>
                )}
                keyExtractor={item => item.value}
                maxH={150}
              />
              <HStack flexWrap="wrap" space={2} mt={2}>
                {selectedDomains.map(domain => (
                  <Pressable 
                    key={domain} 
                    onPress={() => toggleDomain(domain)}
                    _pressed={{ opacity: 0.5 }}
                  >
                    <Box bg="primary.100" px={3} py={1} borderRadius="full" mb={2}>
                      <Text color="primary.600">
                        {availableDomains.find(d => d.value === domain)?.label || domain} ✕
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
              发布通知
            </Button>
          </VStack>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
}