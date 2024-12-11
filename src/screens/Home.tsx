import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LogoutButton from '../components/LogoutButton'

const Home = () => {
  return (
    <SafeAreaView>
        <Text className='text-blue-700'>Home</Text>
        <LogoutButton/>
    </SafeAreaView>
  )
}

export default Home