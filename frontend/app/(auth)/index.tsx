import { Link, useRouter } from "expo-router";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

export default function StartupPage() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-end">
      <ImageBackground
        source={require("../../assets/backgrounds/cnad-app-background-startup.jpg")}
        className="flex-1"
        resizeMode="cover"
      >
        <View className="px-6 flex-1  justify-end pb-12">
          <View className="items-center mb-auto pt-20">
            <Text className="text-white text-3xl font-extrabold tracking-widest">
              TRACKTAIL
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-white text-3xl font-extrabold uppercase text-center">
              Organize with <Text className="text-green-600">Intent</Text>,{"\n"}
              Achieve with <Text className="text-green-600">Focus</Text>
            </Text>
            <Text className="text-zinc-400 text-md text-center mt-4">
              Sync, complete, and level up with TrackTrail, your AI-powered task tracker designed for you to succeed.
            </Text>
          </View>

          <TouchableOpacity
            className="bg-green-600 py-4 rounded-full items-center mb-12"
            onPress={() => router.push("./login")}
          >
            <Text className="text-white font-bold text-lg">Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
