import { Link } from "expo-router";
import React from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuthStore } from "../../store/useAuthStore";

export default function RegisterPage() {
  const login = useAuthStore((state) => state.login);

  const handleRegister = () => {
    // In a real app, you would validate inputs and call your API here
    // For now, we simulate a successful registration by setting the auth state
    login();
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-zinc-950">
      <View className="flex-1 p-6 justify-center">
        {/* Header */}
        <View className="mb-10">
          <Text className="text-white text-3xl font-bold">Create Account</Text>
          <Text className="text-zinc-400 mt-2 text-base">
            Join the FlowState community today.
          </Text>
        </View>

        {/* Form Fields */}
        <View className="space-y-4">
          <View>
            <Text className="text-zinc-400 mb-2 ml-1">Full Name</Text>
            <TextInput
              placeholder="John Doe"
              placeholderTextColor="#71717a"
              className="bg-zinc-900 text-white p-4 rounded-2xl border border-zinc-800 focus:border-cyan-400"
            />
          </View>

          <View>
            <Text className="text-zinc-400 mb-2 ml-1">Email Address</Text>
            <TextInput
              placeholder="email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#71717a"
              className="bg-zinc-900 text-white p-4 rounded-2xl border border-zinc-800 focus:border-cyan-400"
            />
          </View>

          <View>
            <Text className="text-zinc-400 mb-2 ml-1">Password</Text>
            <TextInput
              placeholder="••••••••"
              secureTextEntry
              placeholderTextColor="#71717a"
              className="bg-zinc-900 text-white p-4 rounded-2xl border border-zinc-800 focus:border-cyan-400"
            />
          </View>
        </View>

        {/* Register Button */}
        <TouchableOpacity
          className="bg-cyan-400 py-4 rounded-full items-center mt-10 shadow-lg shadow-cyan-400/20"
          onPress={handleRegister}
        >
          <Text className="text-black font-bold text-lg">Create Account</Text>
        </TouchableOpacity>

        {/* Footer Link */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-zinc-400">Already have an account? </Text>
          <Link href="./login">
            <Text className="text-cyan-400 font-bold">Sign In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
