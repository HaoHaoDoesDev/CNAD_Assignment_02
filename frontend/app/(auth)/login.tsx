import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);

  return (
    <View className="flex-1 bg-zinc-950 p-6 justify-center">
      <Text className="text-white text-3xl font-bold mb-8 text-center">
        Welcome Back
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#71717a"
        className="bg-zinc-900 text-white p-4 rounded-xl mb-4"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#71717a"
        className="bg-zinc-900 text-white p-4 rounded-xl mb-8"
      />

      <TouchableOpacity
        className="bg-cyan-400 py-4 rounded-xl items-center"
        onPress={login} // This triggers the redirect logic in _layout.tsx
      >
        <Text className="font-bold text-lg">Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
