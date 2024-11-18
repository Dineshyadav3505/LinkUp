import React, { useState } from 'react';
import { View, TextInput as RNTextInput, TextInputProps as RNTextInputProps, Text } from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon';

interface TextInputProps extends RNTextInputProps {
    placeholder: string;
    className?: string;
    value?: string;
    icon?: React.ReactElement<IconProps>;
    onChangeText?: (text: string) => void;
    validate?: (text: string) => string | null; // Validation function
    errorMessage?: string; // Custom error message
}

const TextInput: React.FC<TextInputProps> = ({
    placeholder,
    value,
    onChangeText,
    icon,
    className = '',
    validate,
    errorMessage,
    ...rest
}) => {
    const [error, setError] = useState<string | null>(null);

    const handleChangeText = (text: string) => {
        if (onChangeText) {
            onChangeText(text);
        }

        if (validate) {
            const validationError = validate(text);
            setError(validationError);
        } else {
            setError(null);
        }
    };

    return (
        <View>
            <View className={`flex-row items-center border my-3 border-zinc-400 drop-shadow-sm rounded-3xl p-1 ${error ? 'border-red-500' : ''}`}>
                {icon && (
                    <View className="p-2">
                        {icon}
                    </View>
                )}
                <RNTextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={handleChangeText}
                    className={`flex-1 px-2 py-2 text-base text-textLight ${className}`}
                    {...rest}
                />
            </View>
            {error && (
                <Text className="text-red-500 text-sm ml-4">
                    {errorMessage || error}
                </Text>
            )}
        </View>
    );
};

export default TextInput;