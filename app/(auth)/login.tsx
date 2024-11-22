import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  Box,
  Button,
  FormControl,
  Input,
  VStack,
  Text,
  useToast,
  Spinner,
} from "native-base";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  
  const router = useRouter();
  const toast = useToast();
  const { login } = useAuth();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // 邮箱验证
    if (!email) {
      newErrors.email = "邮箱不能为空";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "邮箱格式不正确";
      isValid = false;
    }

    // 密码验证
    if (!password) {
      newErrors.password = "密码不能为空";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "密码长度不能小于6位";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        toast.show({
          description: "登录成功",
          placement: "top",
          duration: 2000,
        });
        router.replace("/(tabs)/(list)");
      } else {
        toast.show({
          description: "邮箱或密码错误",
          placement: "top",
          duration: 2000,
        });
      }
    } catch (error) {
      toast.show({
        description: "登录失败，请稍后重试",
        placement: "top",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box flex={1} justifyContent="center" p={4} bg="white">
      <VStack space={4} alignItems="center">
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
          登录
        </Text>
        
        <FormControl isInvalid={!!errors.email}>
          <FormControl.Label>邮箱</FormControl.Label>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="请输入邮箱"
            keyboardType="email-address"
            autoCapitalize="none"
            bg="gray.100"
            size="lg"
          />
          <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormControl.Label>密码</FormControl.Label>
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="请输入密码"
            type="password"
            bg="gray.100"
            size="lg"
          />
          <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
        </FormControl>

        <Button
          w="100%"
          size="lg"
          onPress={handleLogin}
          bg="primary.600"
          isDisabled={isLoading}
          _pressed={{ bg: "primary.700" }}
        >
          {isLoading ? <Spinner color="white" /> : "登录"}
        </Button>

        <Button
          variant="link"
          onPress={() => router.push("/(auth)/Register")}
        >
          没有账号？注册
        </Button>
      </VStack>
    </Box>
  );
}
