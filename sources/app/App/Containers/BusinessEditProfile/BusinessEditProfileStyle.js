import {StyleSheet} from 'react-native'
import Fonts from 'App/Theme/Fonts'
import Metrics from 'App/Theme/Metrics'
import Colors from 'App/Theme/Colors'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    backgroundColor: Colors.white,
  },
  tabBarStyle: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: Metrics.applyRatio(23),
    borderBottomRightRadius: Metrics.applyRatio(23),
    height: Metrics.applyRatio(60),
    overflow: 'hidden',
  },
  tabTextStyle: {
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.medium,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  underLine: {
    backgroundColor: Colors.active,
    height: Metrics.applyRatio(2),
  },
})
