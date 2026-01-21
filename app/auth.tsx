import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { cssInterop } from "nativewind";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

// Interop for the standard TextInput and TouchableOpacity
cssInterop(TextInput, { className: "style" });
cssInterop(TouchableOpacity, { className: "style" });

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = () => {
    if (isLogin) {
      console.log("Logging in with:", email, password);
    } else {
      console.log("Registering with:", email, password);
    }
  };

  return (
    <ThemedView className="flex-1 justify-center px-8">
      <View className="items-center mb-10">
        <ThemedText type="title" className="text-4xl">
          {isLogin ? "Welcome Back" : "Create Account"}
        </ThemedText>
        <ThemedText className="text-slate-500 mt-2">
          {isLogin ? "Sign in to continue" : "Join us to get started"}
        </ThemedText>
      </View>

      <View className="gap-4">
        <View>
          <ThemedText type="defaultSemiBold" className="mb-2 ml-1">
            Email
          </ThemedText>
          <TextInput
            placeholder="example@mail.com"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            className="h-14 border border-slate-300 rounded-2xl px-4 text-slate-900 bg-white dark:bg-slate-800 dark:text-white dark:border-slate-700"
          />
        </View>

        <View>
          <ThemedText type="defaultSemiBold" className="mb-2 ml-1">
            Password
          </ThemedText>
          <TextInput
            placeholder="********"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="h-14 border border-slate-300 rounded-2xl px-4 text-slate-900 bg-white dark:bg-slate-800 dark:text-white dark:border-slate-700"
          />
        </View>

        <TouchableOpacity
          onPress={handleAuth}
          className="bg-blue-600 h-14 rounded-2xl items-center justify-center mt-4 shadow-lg active:bg-blue-700"
        >
          <ThemedText type="defaultSemiBold" className="text-white text-lg">
            {isLogin ? "Sign In" : "Sign Up"}
          </ThemedText>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center mt-8">
        <ThemedText>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
        </ThemedText>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <ThemedText type="link" className="font-bold">
            {isLogin ? "Sign Up" : "Log In"}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
