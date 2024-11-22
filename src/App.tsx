import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import "../global.css";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Supabase
import { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase'; // Make sure this path is correct

// Screens
import Welcome from './screens/Welcome';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Home from './screens/Home';
import Details from './screens/Details';
import Client from './screens/Client';

export type RootStackParamList = {
  welcome: undefined;
  signUp: undefined;
  login: undefined;
  home: undefined;
  details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <View><StatusBar style="auto" /></View>; // Or a loading component
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName={session ? 'home' : 'welcome'}>
        {session ? (
          <>
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
            <Stack.Screen
              name="client"
              component={Client}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}