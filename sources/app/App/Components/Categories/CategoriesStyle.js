import {StyleSheet} from 'react-native'
import {Colors, Metrics} from 'App/Theme'

export default StyleSheet.create({
  containerWrapper: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: Metrics.applyRatio(15),
    borderBottomRightRadius: Metrics.applyRatio(15),
    height: Metrics.applyRatio(50),
    position: 'relative',
    zIndex: 22,
  },
})
