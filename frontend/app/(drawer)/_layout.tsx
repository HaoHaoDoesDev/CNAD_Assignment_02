import { Drawer } from "expo-router/drawer";
import { View, Text } from "react-native";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { Home, Settings, LogOut } from "lucide-react-native";
import { useAuthStore } from "../../store/useAuthStore";

function CustomDrawerContent(props: any) {
  const logout = useAuthStore((state) => state.logout);
  return (
    <DrawerContentScrollView {...props}>
      <View className="bg-lavender p-6 -mt-1 mb-4 h-44 justify-end">
        <View className="h-16 bg-white rounded-full mb-2 items-left justify-left">
           <Text className="text-black text-3xl font-extrabold">TRACKTAIL</Text>
        </View>
        <Text className="text-black font-bold text-lg">Welcome T1234567B</Text>
        <Text className="text-black text-sm opacity-80">pewpew@gmail.com</Text>
      </View>

      <DrawerItemList {...props} />
      
      <DrawerItem
        label="Logout"
        icon={({ color, size }) => <LogOut color={color} size={size} />}
        onPress={logout}
        labelStyle={{ color: '#43A047' }}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTintColor: '#fff',
        drawerActiveTintColor: '#43A047',
        drawerLabelStyle: { marginLeft: 0 }
      }}
    >
      <Drawer.Screen 
        name="(tabs)" 
        options={{ 
          title: "Home",
          drawerIcon: ({color, size}) => <Home color={color} size={size} />,
          headerStyle: {
            backgroundColor: '#ffffff',
            },
                headerTintColor: '#000000',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        }} 
      />
      <Drawer.Screen 
        name="settings" 
        options={{ 
          title: "Settings",
          drawerIcon: ({color, size}) => <Settings color={color} size={size} />
        }} 
      />
    </Drawer>
  );
}