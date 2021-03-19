import {StyleSheet} from 'react-native'
import Metrics from 'App/Theme/Metrics'

export default StyleSheet.create({
  noUnderLineStyle: {
    borderBottomWidth: 0,
    textDecorationLine: 'none',
  },
  padding: {
    paddingBottom: Metrics.DEVICE_HEIGHT * 0.025,
    paddingTop: Metrics.DEVICE_HEIGHT * 0.025,
  },

  underLineStyle: {
    borderBottomWidth: Metrics.DEVICE_WIDTH * 0.003,
    textDecorationLine: 'underline',
  },
})
