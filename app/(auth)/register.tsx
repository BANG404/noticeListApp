import React, { useState } from "react";
import { Box, Button, FormControl, Input, VStack, Text } from "native-base";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // 在这里实现注册逻辑
    console.log("注册", email, password);
    router.push("/(auth)/login");
  };

  return (
    <Box flex={1} justifyContent="center" p={4} bg="white">
      <VStack space={4}>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          注册
        </Text>
        <FormControl>
          <FormControl.Label>邮箱</FormControl.Label>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="请输入邮箱"
            bg="gray.100"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>密码</FormControl.Label>
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="请输入密码"
            type="password"
            bg="gray.100"
          />
        </FormControl>
        <Button onPress={handleRegister} bg="primary.600">
          注册
        </Button>
        <Button
          variant="link"
          onPress={() => router.push("/(auth)/login")}
        >
          已有账号？登录
        </Button>
      </VStack>
    </Box>
  );
}
