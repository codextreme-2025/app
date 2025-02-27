import React from 'react'
import { View, Text } from 'react-native'
import { Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Link } from 'expo-router'

type Props = {}

function AppBar({}: Props) {
  return (
    <View  className='bg-black font-bold display-none' >
      <Text className='font-bold display-none' >My App</Text>
      <View >
        
      </View>
    </View>
  )
}

export default AppBar