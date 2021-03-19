import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics} from 'App/Theme'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  btnBottomView: {
    alignContent: 'flex-end',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: Metrics.applyRatio(36),
  },
  buttonContainer: {
    ...ApplicationStyles.buttonContainer,
  },
  buttonTextStyle: {
    ...Fonts.style.buttonTitle,
    height: Metrics.applyRatio(23),
  },
  container: {
    flex: 1,
  },
  disButtonContainer: {
    ...ApplicationStyles.buttonContainer,
    opacity: 0.5,
  },
  dollar: {
    ...Fonts.style.textInput,
    alignSelf: 'center',
    color: Colors.black,
    marginLeft: Metrics.applyRatio(-20),
    paddingHorizontal: Metrics.applyRatio(0),
    paddingLeft: Metrics.applyRatio(20),
    paddingRight: Metrics.applyRatio(10),
    textAlign: 'left',
  },
  inputStyle: {
    backgroundColor: Colors.greyInput,
    borderRadius: Metrics.applyRatio(17),
    height: Metrics.applyRatio(55),
    marginBottom: Metrics.applyRatio(22),
    marginTop: Metrics.applyRatio(10),
    ...Fonts.style.textInput,
  },
  inputStyle2: {
    backgroundColor: Colors.greyInput,
    ...Fonts.style.textInput,
    paddingHorizontal: Metrics.applyRatio(0),
    width: '100%',
  },
  inputStyleWithIcon: {
    ...ApplicationStyles.inputStyle,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  marginBottomButton: {
    marginBottom: Metrics.applyRatio(40),
  },
  paypalStyle: {
    alignSelf: 'center',
    marginBottom: Metrics.applyRatio(30),
    maxHeight: Metrics.applyRatio(20),
    maxWidth: Metrics.applyRatio(75),
    minHeight: Metrics.applyRatio(14),
    minWidth: Metrics.applyRatio(50),
    resizeMode: 'contain',
  },
  placeHolder: {
    ...Fonts.style.subSectionTitle,
    color: Colors.grey1,
    marginBottom: Metrics.applyRatio(-15),
    marginLeft: Metrics.applyRatio(20),
    zIndex: 3,
  },
  viewAmount: {
    flex: 1,
    marginLeft: Metrics.applyRatio(30),
    marginRight: Metrics.applyRatio(30),
  },
})
