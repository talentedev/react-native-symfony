import {StyleSheet} from 'react-native'
import {Colors, Metrics, Fonts, ApplicationStyles} from 'App/Theme'

export default StyleSheet.create({
  buttonStyle: {
    height: Metrics.applyRatio(46),
    marginTop: Metrics.applyRatio(30),
    width: Metrics.applyRatio(240),
  },
  container: {
    ...ApplicationStyles.screen.container,
    backgroundColor: Colors.greyBackground,
    flex: 1,
    justifyContent: 'center',
  },
  emptyCon: {alignItems: 'center'},
  emptyImageStyle: {
    height: Metrics.applyRatio(145),
    marginTop: Metrics.applyRatio(109),
    width: Metrics.applyRatio(167),
  },
  letsStartText: {
    ...Fonts.style.dropDownText,
    color: Colors.blueGrey,
    height: Metrics.applyRatio(50),
    marginTop: Metrics.applyRatio(40),
    textAlign: 'center',
    width: Metrics.applyRatio(209),
  },
  watchTutorial: {
    height: Metrics.applyRatio(14),
    marginTop: Metrics.applyRatio(20),
    width: Metrics.applyRatio(154),
  },
  watchTutorialText: {
    ...Fonts.style.dropDownText,
    color: Colors.blueGrey,
    height: Metrics.applyRatio(50),
    marginTop: Metrics.applyRatio(40),
    textAlign: 'center',
    width: Metrics.applyRatio(288),
  },
})
