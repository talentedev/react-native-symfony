import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics, ApplicationStyles} from 'App/Theme'

export default StyleSheet.create({
  bottomView: {
    alignContent: 'flex-end',
    flex: 2,
    justifyContent: 'flex-end',
  },
  container: {
    // alignItems: 'center',
    flex: 1,
  },
  doThisTxt: {
    ...ApplicationStyles.clickableText,
    alignItems: 'center',
    color: Colors.blueyGrey,
    marginBottom: Metrics.applyRatio(30),
    marginTop: Metrics.applyRatio(20),
  },
  failContent: {
    ...Fonts.style.subSectionTitle,
    alignSelf: 'center',
    color: Colors.grey2,
    fontSize: Fonts.size.bigMedium,
    textAlign: 'center',
    width: Metrics.applyRatio(316),
  },
  failTitle: {
    alignSelf: 'center',
    color: Colors.grey3,
    fontFamily: Fonts.fonts.PoppinsSemiBold,
    fontSize: Fonts.size.regular,
    letterSpacing: 0,
    margin: Metrics.applyRatio(10),
  },
  heightView: {
    height: Metrics.applyRatio(200),
  },
  heightViewSmall: {
    height: Metrics.applyRatio(80),
  },
  imgStyle: {alignSelf: 'center', height: Metrics.applyRatio(157), width: Metrics.applyRatio(188)},
  reasonContainer: {
    backgroundColor: Colors.paleGrey,
    borderRadius: Metrics.applyRatio(35),
    // height: Metrics.applyRatio(160),
    marginHorizontal: Metrics.applyRatio(35),
    marginVertical: Metrics.applyRatio(36),
  },
  rejectedReasonStyle: {
    color: Colors.grey2,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.bigMedium,
    // height: Metrics.applyRatio(160),
    paddingHorizontal: Metrics.applyRatio(21),
    paddingVertical: Metrics.applyRatio(10),
    textAlign: 'center',
  },
  textButtonContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: Metrics.applyRatio(26),
  },
  validationButton: {
    ...ApplicationStyles.buttonContainer,
    marginTop: Metrics.applyRatio(20),
  },
  validationText: {
    ...ApplicationStyles.textButton,
    fontSize: Fonts.size.bigMedium,
  },
})
