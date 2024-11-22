import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInput from '../components/TextInput';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../App';
import LinkButton from '../components/LinkButton';
import Loading from '../components/Loading';

import { supabase } from '../lib/supabase'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'login'>;

interface FormErrors {
  email: string | null;
  password: string | null;
}

const Login: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({
    email: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);

  const validateEmail = (text: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text) ? null : 'Invalid email address';
  };

  const validatePassword = (text: string): string | null => {
    return text.length >= 8 ? null : 'Password must be at least 8 characters long';
  };

  const handleLogin = async () => {
    // Validate inputs
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      // If login is successful, navigate to the main screen or dashboard
      navigation.navigate('home'); // Adjust this to your app's main screen route
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Login Error', error.message);
      } else {
        Alert.alert('Login Error', 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className='px-5 flex-1 justify-start mt-[30%]'>
      {loading && <Loading />}
      <View>
        <Text className='text-4xl font-bold text-text'>Hey,</Text>
        <Text className='text-4xl font-bold text-text'>Welcome Back</Text>
      </View>

      <View className='mt-6'>
        <Text className='text-base text-textLight mb-2'>Please login to continue</Text>
        <TextInput 
          icon={<EmailIcon />} 
          placeholder='Enter your email' 
          onChangeText={(text) => {
            setEmail(text);
            setErrors(prev => ({ ...prev, email: null }));
          }}
          value={email}
          errorMessage={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput 
          icon={<PasswordIcon />} 
          placeholder='Enter your password' 
          onChangeText={(text) => {
            setPassword(text);
            setErrors(prev => ({ ...prev, password: null }));
          }}
          value={password}
          errorMessage={errors.password}
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('forget')}>
        <Text className='text-base font-medium text-textLight text-right mt-4'>
          Forgot your password?
        </Text>
      </TouchableOpacity>

      <LinkButton 
        title='Log In' 
        buttonStyle="mt-10 drop-shadow-sm" 
        onPress={handleLogin}
      />

      <View className='mt-6 flex-row justify-center'>
        <Text className='text-base font-medium text-textLight'>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
          <Text className='text-base font-medium text-primary underline'>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const EmailIcon: React.FC = () => (
  <SvgXml
    xml={`
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#494949" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    `}
    width={24}
    height={24}
  />
);

const PasswordIcon: React.FC = () => (
  <SvgXml
    xml={`
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#494949" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    `}
    width={24}
    height={24}
  />
);

export default Login;