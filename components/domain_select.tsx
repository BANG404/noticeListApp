import {
  Box,
  FlatList,
  FormControl,
  HStack,
  Input,
  Pressable,
  Text,
} from "native-base";
import React from "react";
export default function DomainSelect({
  domainQuery,
  setDomainQuery,
  availableDomains,
  selectedDomains,
  toggleDomain,
}) {
  return (
    <>
      <FormControl>
        <FormControl.Label _text={{ fontWeight: "bold", color: "primary.600" }}>
          发送域
        </FormControl.Label>
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
              bg={
                selectedDomains.includes(item.value) ? "primary.100" : "white"
              }
              p={2}
              mb={1}
              borderRadius="md"
            >
              <Text color="primary.600">{item.label}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.value}
          maxH={150}
          nestedScrollEnabled // 启用嵌套滚动
          scrollEnabled={true} // 确保滚动已启用
        />
        <HStack flexWrap="wrap" space={2} mt={2}>
          {selectedDomains.map((domain) => (
            <Pressable
              key={domain}
              onPress={() => toggleDomain(domain)}
              _pressed={{ opacity: 0.5 }}
            >
              <Box bg="primary.100" px={3} py={1} borderRadius="full" mb={2}>
                <Text color="primary.600">
                  {availableDomains.find((d) => d.value === domain)?.label ||
                    domain}{" "}
                  ✕
                </Text>
              </Box>
            </Pressable>
          ))}
        </HStack>
      </FormControl>
    </>
  );
}
