import { View, Text, TouchableOpacity, GestureResponderEvent, Pressable } from 'react-native'
import React from 'react'

interface LinkButtonProps {
    title: string;
    buttonStyle?: string;
    textStyle?: string;
    onPress: (event: GestureResponderEvent) => void;
}

const LinkButton = ({ title, buttonStyle, textStyle, onPress }: LinkButtonProps) => {
  return (
    <Pressable 
      className={`mx-auto bg-primary w-full rounded-2xl  ${buttonStyle}`} 
      onPress={onPress}
    >
      <Text className={`text-center py-3 font-bold text-xl text-white drop-shadow-lg  ${textStyle}`}>{title}</Text>
    </Pressable>
  )
}

export default LinkButton