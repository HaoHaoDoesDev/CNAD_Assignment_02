import {
  Stack,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import { useEffect, useState } from "react";
import "../global.css";
import { useAuthStore } from "../store/useAuthStore";

export default function RootLayout() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!navigationState?.key) return;

    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 1);

    return () => clearTimeout(timeout);
  }, [navigationState?.key]);

  useEffect(() => {
    if (!isReady || !navigationState?.key) return;

    const inAuthGroup = (segments as string[]).includes("(auth)");

    if (!isLoggedIn && !inAuthGroup) {
      router.replace("/");
    } else if (isLoggedIn && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [isLoggedIn, segments, isReady, router, navigationState?.key]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
