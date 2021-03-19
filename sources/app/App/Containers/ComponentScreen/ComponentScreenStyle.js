import {StyleSheet} from 'react-native'
import ApplicationStyles from 'App/Theme/ApplicationStyles'
import Colors from 'App/Theme/Colors'
import Fonts from 'App/Theme/Fonts'
import Metrics from 'App/Theme/Metrics'

export default StyleSheet.create({
  clickableContainer: {
    alignItems: 'center',
    backgroundColor: Colors.text,
    justifyContent: 'center',
    marginTop: Metrics.DEVICE_WIDTH * 0.32,
    width: '100%',
  },
  clickableTextStyle: {
    color: Colors.white,
    fontSize: Fonts.size.regular,
  },
  container: {
    ...ApplicationStyles.screen.container,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datepickerContainer: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.text,
    borderLeftColor: Colors.white,
    borderRightColor: Colors.white,
    borderTopColor: Colors.text,
    borderWidth: 5,
    flex: 1,
    height: '100%',
    marginBottom: 575,
    width: '50%',
  },
  tabTextStyle: {
    fontSize: Fonts.size.regular,
    textAlign: 'center',
  },
  textInputContainer: {
    borderColor: Colors.grey,
    borderWidth: Metrics.DEVICE_HEIGHT * 0.0015,
    height: Metrics.DEVICE_HEIGHT * 0.025,
    width: Metrics.DEVICE_WIDTH * 0.54,
  },
  textStyle: {
    color: Colors.greyDark,
    fontSize: Fonts.size.regular,
  },
  validationButtonContainer: {
    alignItems: 'center',
    borderColor: Colors.black2,
    borderRadius: Metrics.DEVICE_WIDTH * 0.014,
    borderWidth: Metrics.DEVICE_WIDTH * 0.003,
    height: Metrics.DEVICE_HEIGHT * 0.06,
    justifyContent: 'center',
    marginTop: Metrics.DEVICE_HEIGHT * 0.15,
    width: Metrics.DEVICE_WIDTH * 0.54,
  },
  validationButtonStyle: {
    color: Colors.black1,
    fontSize: Fonts.size.regular,
  },
})
