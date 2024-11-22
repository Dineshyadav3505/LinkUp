import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInput from '../components/TextInput';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../App';
import LinkButton from '../components/LinkButton';
import Loading from '../components/Loading';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'forget'>;

const validateEmail = (text: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text) ? null : 'Invalid email address';
};

const Forget: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      // Replace with your actual API call
      const response = await fetch('http://localhost:1234/api/v1/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();

      if (data.statusCode >= 200 && data.statusCode < 300) {
        // Handle successful password reset request
        navigation.navigate('login'); // Or navigate to a confirmation screen
      } else {
        setError(data.message || 'Password reset request failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className='px-5 flex-1 justify-start mt-[30%]'>
      {loading && <Loading />}
      <View>
        <Text className='text-4xl font-bold text-text'>Reset Password</Text>
      </View>

      <View className='mt-4'>
        <Text className='text-base text-textLight mb-9 pr-20'>
          Please enter your email address to request a password reset.
        </Text>
        <TextInput 
          icon={<EmailIcon />} 
          placeholder='Enter your email' 
          onChangeText={(text) => {
            setEmail(text);
            setError(null);
          }}
          value={email}
          errorMessage={error}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <LinkButton 
        title='Reset Password' 
        buttonStyle="mt-10 drop-shadow-sm" 
        onPress={handleResetPassword}
      />

      <View className='mt-6 flex-row justify-center'>
        <Text className='text-base font-medium text-textLight'>
          Remember your password?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Text className='text-base font-medium text-primary underline'>Log In</Text>
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

export default Forget;