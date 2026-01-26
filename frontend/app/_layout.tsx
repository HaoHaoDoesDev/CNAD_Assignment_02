import { Stack, useRouter, useSegments, useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";
import "../global.css";
import { useAuthStore } from "../store/useAuthStore";

export default function RootLayout() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const hasFinishedOnboarding = useAuthStore((state) => state.hasFinishedOnboarding);
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!navigationState?.key) return;
    setIsReady(true);
  }, [navigationState?.key]);

  useEffect(() => {
    if (!isReady) return;

    const segmentArray = segments as string[];
    const inAuthGroup = segmentArray[0] === "(auth)";
    const inOnboardingGroup = segmentArray[0] === "(onboarding)";

    if (!isLoggedIn) {
      if (!inAuthGroup) router.replace("/(auth)" as any);
    } else if (!hasFinishedOnboarding) {
      if (!inOnboardingGroup) router.replace("/(onboarding)/" as any);
    } else {
      if (inAuthGroup || inOnboardingGroup || segmentArray.length === 0) {
        router.replace("/(drawer)/" as any);
      }
    }
  }, [isLoggedIn, router, hasFinishedOnboarding, isReady, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(drawer)" />
    </Stack>
  );
}