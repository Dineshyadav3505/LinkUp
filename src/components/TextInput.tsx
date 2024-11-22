import React, { useState, useEffect } from 'react';
import { View, TextInput as RNTextInput, TextInputProps as RNTextInputProps, Text } from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon';

interface TextInputProps extends Omit<RNTextInputProps, 'onChangeText'> {
    placeholder: string;
    className?: string;
    value?: string;
    icon?: React.ReactElement<IconProps>;
    required?: boolean;
    onChangeText: (text: string) => void;
    errorMessage?: string | null;
}

const TextInput: React.FC<TextInputProps> = ({
    placeholder,
    value,
    onChangeText,
    icon,
    className = '',
    required = false,
    errorMessage,
    ...rest
}) => {
    const handleChangeText = (text: string) => {
        onChangeText(text);
    };

    return (
        <View>
            <View className={`flex-row items-center border my-3 border-zinc-400 drop-shadow-sm rounded-3xl p-1 ${errorMessage ? 'border-red-500' : ''}`}>
                {icon && (
                    <View className="p-2">
                        {icon}
                    </View>
                )}
                <RNTextInput
                    placeholder={`${placeholder}${required ? ' *' : ''}`}
                    value={value}
                    onChangeText={handleChangeText}
                    className={`flex-1 px-2 py-2 text-base text-textLight ${className}`}
                    {...rest}
                />
            </View>
            {errorMessage && (
                <Text className="text-red-500 text-sm ml-4">
                    {errorMessage}
                </Text>
            )}
        </View>
    );
};

export default TextInput;