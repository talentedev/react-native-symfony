import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics} from 'App/Theme'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  container: {...ApplicationStyles.screen.container},
  descText: {
    color: Colors.coolGrey,
    marginTop: Metrics.applyRatio(88),
    textAlign: 'center',
    width: Metrics.applyRatio(296),
    ...Fonts.style.subSectionTitle,
  },
  goBack: {
    color: Colors.coolGrey,
    marginTop: Metrics.applyRatio(20),
    ...Fonts.style.clickableTextBold,
  },
  imgStyle: {
    height: Metrics.applyRatio(225),
    marginTop: Metrics.applyRatio(80),
    width: Metrics.applyRatio(343),
  },
  innerContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
