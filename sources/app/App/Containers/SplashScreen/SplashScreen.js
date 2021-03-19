import React from 'react'
import {Image, View} from 'react-native'
import styles from './SplashScreenStyle'
import {Images, Metrics} from 'App/Theme'

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={Images.logoGrey}
          style={{
            height: Metrics.applyRatio(96),
            width: Metrics.applyRatio(60),
          }}
          resizeMode="contain"
        />
      </View>
    )
  }
}
