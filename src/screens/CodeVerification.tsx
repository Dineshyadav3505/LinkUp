import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SvgXml } from 'react-native-svg';

import { RootStackParamList } from '../App';
import LinkButton from '../components/LinkButton';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'codeVerification'>;
type CodeVerificationRouteProp = RouteProp<RootStackParamList, 'codeVerification'>;

const CodeIcon = () => (
    <SvgXml
        xml={`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`}
    />
);

const CodeVerification = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<CodeVerificationRouteProp>();
    const { email, phone, name, password } = route.params;
    const [error, setError] = useState('');
    const [responseCode, setResponseCode] = useState('');

    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [countdown, setCountdown] = useState(30);
    const inputRefs = useRef<Array<TextInput | null>>([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();

        handleLogin();

        // Start the countdown
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(timer);
    }, []);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:1234/api/v1/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const data = await response.json();

            setResponseCode(data.data)

            console.log(responseCode)


            // if (response.ok) {
            //     navigation.navigate('home');
            // } else {
            //     setError(data.message || 'Login failed');
            // }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleCodeChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text.length === 1 && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (index: number) => {
        if (index > 0 && code[index] === '') {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const verifyCode = () => {
        const enteredCode = code.join('');
        console.log('Verifying code:', enteredCode);

        if (enteredCode === responseCode) {
            Alert.alert('Success', 'Code verified successfully!');
        } else {
            Alert.alert('Error', 'Invalid code. Please try again.');
        }
    };

    const resendCode = () => {
        // Implement resend code functionality here
        Alert.alert('Resend Code', 'A new code has been sent.');
        setCountdown(30); // Reset the countdown
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <SafeAreaView className='mx-5 flex-1 justify-start mt-[35%]'>
            <View>
                <Text className='text-4xl font-bold text-text'>Hey, {name}</Text>
            </View>
            <View className='py-2'>
                <Text className='text-base text-textLight'>We've sent a verification code to {email}</Text>

                <View className='flex-row justify-between mb-8 mt-[15%]'>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            value={digit}
                            onChangeText={(text) => handleCodeChange(text, index)}
                            onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key === 'Backspace') {
                                    handleBackspace(index);
                                }
                            }}
                            keyboardType="numeric"
                            maxLength={1}
                            className='w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-xl'
                        />
                    ))}
                </View>

                <LinkButton
                    title='Verify Code'
                    buttonStyle="mt-4"
                    onPress={verifyCode}
                />

                <TouchableOpacity
                    className='mt-6'
                    onPress={resendCode}
                    disabled={countdown > 0}
                >
                    <Text className={`text-center ${countdown > 0 ? 'text-gray-400' : 'text-primary'}`}>
                        {countdown > 0 ? `Resend Code in ${formatTime(countdown)}` : 'Resend Code'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CodeVerification;