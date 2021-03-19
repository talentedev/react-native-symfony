import {StyleSheet} from 'react-native'
import {Fonts, Colors, Metrics, ApplicationStyles} from 'App/Theme'

export default StyleSheet.create({
  absolutePos: {
    height: Metrics.applyRatio(280),
    position: 'absolute',
    width: Metrics.applyRatio(296),
  },
  amountText: {
    ...Fonts.style.amountText,
    height: Metrics.applyRatio(71),
    textAlign: 'center',
  },
  balanceText: {
    ...Fonts.style.clickableText,
    color: Colors.white,
    textAlign: 'center',
  },
  buttonContainer: {
    ...ApplicationStyles.buttonContainer,
    borderColor: Colors.transparent,
    marginBottom: Metrics.applyRatio(26),
    marginTop: Metrics.applyRatio(30),
  },
  buttonContainerDisable: {
    ...ApplicationStyles.buttonContainer,
    backgroundColor: Colors.lightBlueGrey,
    marginTop: Metrics.applyRatio(30),
    opacity: 0.5,
  },
  buttonTextStyle: {
    ...Fonts.style.buttonTitle,
    paddingHorizontal: Metrics.applyRatio(10),
    // height: Metrics.applyRatio(23),
  },
  container: {
    flex: 1,
    marginTop: Metrics.applyRatio(24),
  },
  greatText: {
    ...Fonts.style.clickableText,
    color: Colors.blueyGrey,
    height: Metrics.applyRatio(48),
    textAlign: 'center',
    width: Metrics.applyRatio(200),
  },
  greatTextReferring: {
    ...Fonts.style.clickableText,
    color: Colors.blueyGrey,
    height: Metrics.applyRatio(48),
    textAlign: 'center',
    width: Metrics.applyRatio(200),
  },
  hkdTxtStyle: {
    bottom: 0,
    color: Colors.black4,
    fontSize: Fonts.size.medium,
    marginBottom: Metrics.applyRatio(60),
    marginRight: Metrics.applyRatio(22),
    position: 'absolute',
    right: 0,
  },
  imageInnerText: {marginTop: Metrics.applyRatio(65)},
  imageInnerView: {
    alignItems: 'center',
    height: Metrics.applyRatio(260),
    marginTop: Metrics.applyRatio(50),
    width: Metrics.applyRatio(296),
  },
  innerView: {alignItems: 'center', flexDirection: 'column'},
  opacityOne: {
    opacity: 1,
  },
  rawView: {
    flexDirection: 'row',
    marginTop: Metrics.applyRatio(20),
  },
  seeUnReferred: {
    ...Fonts.style.clickableTextBold,
    color: Colors.blueyGrey,
    marginLeft: Metrics.applyRatio(10),
    textAlign: 'center',
  },
  selfCenter: {
    alignSelf: 'center',
    height: Metrics.applyRatio(18),
    width: Metrics.applyRatio(18),
  },
  senView: {alignItems: 'center'},
  txtWithdraw: {
    paddingHorizontal: Metrics.applyRatio(10),
    paddingVertical: Metrics.applyRatio(5),
    ...Fonts.style.withdrawText,
  },
  walletTxtStyle: {
    backgroundColor: Colors.white,
    borderBottomEndRadius: Metrics.applyRatio(14),
    borderTopEndRadius: Metrics.applyRatio(14),
    bottom: 0,
    left: 0,
    marginBottom: Metrics.applyRatio(60),
    position: 'absolute',
  },
  withDrawButton: {
    height: Metrics.applyRatio(46),
    marginTop: Metrics.applyRatio(30),
    width: Metrics.applyRatio(240),
  },
})
