import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from '../../assets/WelcomeScreen.jpg'
import LinkButton from '../components/LinkButton'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { RootStackParamList } from '../App'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'welcome'>

const Welcome = () => {
  const navigation = useNavigation<NavigationProp>()

  return (
    <SafeAreaView className='flex-1 py-[30%]'>
      {/* Image */}
      <Image source={logo} className='h-96 w-full px-4 mt-[10%] flex justify-center' />

      {/* Text Content */}
      <View className='flex-1 justify-end'>
        {/* Main Text & TagLine */}
        <View>
          <Text className='mt-10 text-text font-extrabold text-center text-3xl'>LinkUp!</Text>
          <Text className='mt-4 mb-12 text-sm px-24 text-textLight text-center'>Where every thought finds a home and every image tells a story.</Text>
        </View>
          
        {/* Footer */}
        <View className='px-10 w-full mx-auto mb-1'>
          {/* Button */}
          <LinkButton 
            title="Getting Started" 
            onPress={() => navigation.replace('login')}
          />
          {/* LogIn Button */}
          <Text className='mt-4 text-center text-text'> 
            Don't have an account?   
            <Text 
              className=' text-primary font-bold' 
              onPress={() => navigation.replace('signUp')}
            >  Sign Up</Text>        
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Welcome