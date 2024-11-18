import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import "../global.css";

// Navigation
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"


// screens
import Welcome from './screens/Welcome'
import SignUp from './screens/SignUp'
import Forget from './screens/Forget'
import Login from './screens/Login'
import Home from './screens/Home'
import Details from './screens/Details'

export type RootStackParamList = {
  welcome: undefined;
  signUp: undefined;
  login: undefined;
  forget: undefined;
  home: undefined;
  details: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='welcome'>
        <Stack.Screen
          name="welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="forget"
          component={Forget}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="details"
          component={Details}
          options={{
            title: "Product details"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

