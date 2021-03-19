import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics} from 'App/Theme'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  acceptedTxt: {
    color: Colors.apple,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.small,
    fontStyle: 'normal',
    letterSpacing: 0,
  },
  claimStyle: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsBoldItalic,
    fontSize: Fonts.size.small,
    letterSpacing: 0,
  },
  codeStyle: {
    color: Colors.coolGrey,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    fontStyle: 'normal',
    letterSpacing: 0,
    marginTop: Metrics.applyRatio(5),
  },
  container: {...ApplicationStyles.screen.container, paddingTop: Metrics.applyRatio(20)},
  dateStatusView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.applyRatio(20),
    marginVertical: Metrics.applyRatio(15),
  },
  dateView: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    fontStyle: 'normal',
    letterSpacing: 0,
  },
  failedView: {
    color: Colors.reddish91,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.small,
    fontStyle: 'normal',
    letterSpacing: 0,
  },
  firstText: {
    ...Fonts.style.textInput,
    color: Colors.black,
    paddingHorizontal: Metrics.applyRatio(0),
  },
  innerContainer: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.applyRatio(15),
    margin: Metrics.applyRatio(20),
  },
  innerDownView: {
    flexDirection: 'column',
    marginHorizontal: Metrics.applyRatio(20),
    marginVertical: Metrics.applyRatio(15),
  },
  lineView: {
    borderColor: Colors.greyDivider,
    borderStyle: 'solid',
    borderWidth: 0.5,
    height: Metrics.applyRatio(2),
  },
  marginTopFive: {marginTop: Metrics.applyRatio(5)},
  nameStyle: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsItalic,
    fontSize: Fonts.size.small,
    letterSpacing: 0,
  },
  pendingTxt: {
    color: Colors.darkSand,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.small,
    fontStyle: 'normal',
    letterSpacing: 0,
  },
})
