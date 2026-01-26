import { Text, TextInput, TouchableOpacity, View, ImageBackground } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);

  return (
    <View className="flex-1 ">
      <ImageBackground
        source={require("../../assets/backgrounds/cnad-app-background-startup.jpg")}
        className="flex-1"
        resizeMode="cover"
      >
    <View className="px-6 flex-1 justify-center pb-12">
      <Text className="text-white text-3xl font-extrabold mb-8 text-center">
        Welcome To <Text className="text-green-600">TRACKTAIL</Text>{"\n"}
      </Text>
      <Text className="text-white text-base font-bold pb-2">
        NRIC:
      </Text>
      <TextInput
        placeholder="Enter NRIC.."
        placeholderTextColor="#71717a"
        className="bg-zinc-900 text-white p-4 rounded-xl border-2 border-white"
      />
      <Text className="text-white text-base font-bold pb-2 pt-2">
        Password:
      </Text>
      <TextInput
        placeholder="Enter password..."
        secureTextEntry
        placeholderTextColor="#71717a"
        className="bg-zinc-900 text-white p-4 rounded-xl mb-8 border-2 border-white"
      />

      <TouchableOpacity
        className="bg-green-600 py-4 rounded-xl items-center"
        onPress={login} // This triggers the redirect logic in _layout.tsx
      >
        <Text className="font-bold text-white text-lg">Sign In</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
    </View>
  );
}
