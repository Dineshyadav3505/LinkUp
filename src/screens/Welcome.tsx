import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from '../../assets/favicon.png'
import LinkButton from '../components/LinkButton'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { RootStackParamList } from '../App'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>

const Welcome = () => {
  const navigation = useNavigation<NavigationProp>()

  return (
    <SafeAreaView className='flex-1 py-10'>
      {/* Image */}
      <Image source={logo} className='h-96 w-full px-4 mt-20 flex justify-center' />

      {/* Text Content */}
      <View className='flex-1 justify-end'>
        {/* Main Text & TagLine */}
        <View>
          <Text className='mt-10 text-dark font-extrabold text-center text-3xl'>LinkUp!</Text>
          <Text className='mt-4 mb-12 text-sm px-24 text-dark text-center'>Where every thought finds a home and every image tells a story.</Text>
        </View>
          
        {/* Button */}
        <View className='px-10 w-full mx-auto'>
          <LinkButton 
            title="Getting Started" 
            onPress={() => navigation.replace('Home')}
            buttonStyle="bg-blue-500 p-2 rounded" // Add appropriate styles
            textStyle="text-white font-bold" // Add appropriate styles
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Welcome