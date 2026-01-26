import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
//import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/useAuthStore';
import { OnboardData } from './onboard-desc';

const { width } = Dimensions.get('window');

export default function Onboarding() {
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding); 
  const [activeIndex, setActiveIndex] = useState(0);

  const handleComplete = () => {
    completeOnboarding();
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={OnboardData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({ item, index }) => (
          <View style={{ width }} className="flex-1 justify-center items-center p-10">
            <Image 
              source={item.image} 
              className="w-64 h-64 mb-10"
              resizeMode="contain"
            />
            <Text className="text-3xl font-bold text-[#43A047] mb-4">{item.title}</Text>
            <Text className="text-center text-gray-500 text-lg">{item.desc}</Text>
            
            {index === OnboardData.length - 1 && (
              <TouchableOpacity 
                onPress={handleComplete}
                className="mt-10 bg-[#43A047] px-10 py-4 rounded-full"
              >
                <Text className="text-white font-bold text-lg">Begin</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      <View className="flex-row justify-center mb-20">
        {OnboardData.map((_, i) => (
          <View 
            key={i} 
            className={`h-2 w-2 rounded-full mx-1 ${i === activeIndex ? 'bg-[#43A047] w-6' : 'bg-gray-300'}`} 
          />
        ))}
      </View>
    </View>
  );
}