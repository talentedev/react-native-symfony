import {StyleSheet} from 'react-native'
import {Metrics, Colors} from 'App/Theme'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  customButtonBottom: {
    alignItems: 'center',
    bottom: Metrics.applyRatio(50),
  },
  inactiveButton: {
    backgroundColor: Colors.lightBlueGrey,
    opacity: 0.6,
  },
  noUnderLineStyle: {
    borderBottomWidth: 0,
    textDecorationLine: 'none',
  },
  secondaryButtonStyle: {
    alignSelf: 'center',
    marginTop: Metrics.applyRatio(20),
  },
  validationButton: {
    ...ApplicationStyles.buttonContainer,
  },
  validationButtonStyle: {
    ...Fonts.style.greyInfoDarker,
    fontSize: Fonts.size.bigMedium,
    width: Metrics.applyRatio(340),
  },
  validationText: {
    ...ApplicationStyles.textButton,
  },
})
