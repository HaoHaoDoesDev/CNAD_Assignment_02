import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  hasFinishedOnboarding: boolean;
  login: () => void;
  logout: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      hasFinishedOnboarding: false,

      login: () => set({ isLoggedIn: true }),
      
      logout: () => set({ 
        isLoggedIn: false, 
        hasFinishedOnboarding: false
      }),

      completeOnboarding: () => set({ hasFinishedOnboarding: true }),

      resetOnboarding: () => set({ hasFinishedOnboarding: false }),

      resetAppState: () => set({ 
        isLoggedIn: false, 
        hasFinishedOnboarding: false 
      }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);