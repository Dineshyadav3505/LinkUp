import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../App'; // Ensure this is correctly imported
import { supabase } from '../lib/supabase'; // Ensure this is correctly imported

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'login'>;

const LogoutButton: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      Alert.alert('Logged Out', 'You have been logged out successfully.');
      navigation.navigate('login'); // Navigate to the login screen
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutButton;