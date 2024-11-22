import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInput from '../components/TextInput';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { RootStackParamList } from '../App'
import LinkButton from '../components/LinkButton';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'signUp'>

interface FormErrors {
  name: string | null;
  email: string | null;
  phone: string | null;
  password: string | null;
}

const SignUp = () => {
  const navigation = useNavigation<NavigationProp>()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({
    name: null,
    email: null,
    phone: null,
    password: null,
  });

  const validateName = (text: string) => {
    return text.length >= 3 ? null : 'Name must be at least 3 characters long';
  }

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text) ? null : 'Invalid email address';
  };

  const validatePassword = (text: string) => {
    return text.length >= 8 ? null : 'Password must be at least 8 characters long';
  };

  const validatePhone = (text: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(text) ? null : 'Invalid phone number';
  }

  const handleSubmit = () => {
    const newErrors: FormErrors = {
      name: !name ? 'Name is required' : validateName(name),
      email: !email ? 'Email is required' : validateEmail(email),
      phone: !phone ? 'Phone is required' : validatePhone(phone),
      password: !password ? 'Password is required' : validatePassword(password),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => error === null)) {
      navigation.push('codeVerification', {
        email,
        phone,
        name,
        password
      });
    }
  };

  return (
    <SafeAreaView className='px-5 flex-1 justify-start mt-[30%]'>
      <View>
        <Text className='text-4xl font-bold text-text'>Hey, </Text>
        <Text className='text-4xl font-bold text-text'>Welcome To LinkUp!</Text>
      </View>

      <View className='mt-6'>
        <Text className='text-base text-textLight mb-2'>Please sign-up to continue</Text>
        <TextInput
          icon={<NameIcon />}
          placeholder='Enter your full name'
          value={name}
          onChangeText={(text) => {
            setName(text);
            setErrors(prev => ({ ...prev, name: null }));
          }}
          keyboardType="default"
          errorMessage={errors.name}
        />
        <TextInput
          icon={<EmailIcon />}
          placeholder='Enter your email'
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors(prev => ({ ...prev, email: null }));
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          errorMessage={errors.email}
        />
        <TextInput
          icon={<PhoneIcon />}
          placeholder='Enter your phone'
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            setErrors(prev => ({ ...prev, phone: null }));
          }}
          keyboardType='phone-pad'
          errorMessage={errors.phone}
        />
        <TextInput
          icon={<PasswordIcon />}
          placeholder='Enter your password'
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors(prev => ({ ...prev, password: null }));
          }}
          secureTextEntry={true}
          errorMessage={errors.password}
        />
      </View>

      <LinkButton
        title='Sign Up'
        buttonStyle="mt-10 drop-shadow-sm"
        onPress={handleSubmit}
      />
      <View className='mt-6'>
        <Text className='text-base font-medium text-textLight text-center'>
          Already have an account? <Text className='text-primary underline' onPress={() => navigation.push('login')}>Log In</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const EmailIcon = () => (
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

const PasswordIcon = () => (
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

const NameIcon = () => (
  <SvgXml
    xml={`
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#494949" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    `}
    width={24}
    height={24}
  />
);

const PhoneIcon = () => (
  <SvgXml
    xml={`
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#494949" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    `}
    width={24}
    height={24}
  />
);

export default SignUp;