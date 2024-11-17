import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import "../global.css";

// Navigation
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"


// screens
import Welcome from './screens/Welcome'
import Home from './screens/Home'
import Details from './screens/Details'

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Details: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: "Product details"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

