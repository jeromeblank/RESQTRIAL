import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Wallpaper from "@/assets/images/Wallpaper pc.jpg"

const app = () => {
  return (
    <View style = {styles.container}>
      <ImageBackground source = {Wallpaper} resizeMode="cover" style = {styles.background}>
      <Text style = {styles.text}>ResQ</Text>
      </ImageBackground>
    </View>
  )
}

export default app

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})