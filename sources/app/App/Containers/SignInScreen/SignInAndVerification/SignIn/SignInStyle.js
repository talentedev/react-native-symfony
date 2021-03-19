import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Fonts, Metrics} from 'App/Theme'

export default StyleSheet.create({
  backStyle: {
    bottom: 0,
    height: Metrics.DEVICE_HEIGHT,
    left: 0,
    position: 'absolute',
    top: 0,
    width: Metrics.DEVICE_WIDTH,
  },
  byProceedStyle: {
    alignItems: 'center',
    marginTop: Metrics.applyRatio(20),
  },
  clickableButtonContainer: {
    ...ApplicationStyles.buttonContainer,
    backgroundColor: Colors.white,
    marginTop: Metrics.applyRatio(76),
    // width: Metrics.SQUARE_WIDTH * 8 + Metrics.GUTTER_WIDTH * 7,
  },
  clickableContainer: {
    ...ApplicationStyles.buttonContainer,
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    marginTop: Metrics.applyRatio(45),
  },
  clickableTextButtonStyle: {
    ...ApplicationStyles.textButton,
  },
  clickableTextStyle: {
    ...ApplicationStyles.buttonTitle,
    color: Colors.black1,
  },
  innerView: {alignItems: 'center', justifyContent: 'center'},
  mainContain: {
    flex: 1,
  },
  mainIcon: {
    height: Metrics.applyRatio(96),
    marginTop: Metrics.applyRatio(127),
    width: Metrics.applyRatio(60),
  },
  mainTxt: {
    ...Fonts.style.messageBold,
    alignSelf: 'center',
    color: Colors.white,
    marginBottom: Metrics.applyRatio(60),
    marginTop: Metrics.applyRatio(40),
    width: Metrics.applyRatio(216),
  },
  policyStyle: {
    alignSelf: 'center',
    bottom: Metrics.DEVICE_HEIGHT * 0.01,
    position: 'absolute',
  },
  policyText: {
    fontSize: Fonts.size.h4,
    marginBottom: Metrics.DEVICE_HEIGHT * 0.01,
  },
  proceedStyle: {color: Colors.black1, fontSize: Fonts.size.h4},
  textInputStyle: {
    ...ApplicationStyles.inputStyle,
    backgroundColor: Colors.transparent,
    borderColor: Colors.white,
    borderWidth: Metrics.applyRatio(2),
    color: Colors.white,
    marginLeft: Metrics.applyRatio(32),
    marginRight: Metrics.applyRatio(28),
  },
  txtStyle: {
    ...Fonts.style.dropDownText,
    color: Colors.white,
  },
  txtStyleBold: {
    fontFamily: Fonts.fonts.PoppinsBold,
    textDecorationLine: 'underline',
  },
})
