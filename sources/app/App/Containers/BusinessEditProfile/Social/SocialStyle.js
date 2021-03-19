import {StyleSheet} from 'react-native'
import {Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme'

export default StyleSheet.create({
  btnBottomView: {
    alignContent: 'flex-end',
    flex: 2,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    ...ApplicationStyles.buttonContainer,
    marginBottom: Metrics.applyRatio(65),
  },
  buttonTextStyle: {
    ...Fonts.style.buttonTitle,
    height: Metrics.applyRatio(23),
  },
  centerView: {marginTop: Metrics.applyRatio(45)},
  container: {
    ...ApplicationStyles.screen.container,
    alignItems: 'center',
  },
  facebookPreLink: {
    ...Fonts.style.textInput,
    alignSelf: 'center',
    color: Colors.blueyGrey,
    marginLeft: Metrics.applyRatio(-20),
    textAlign: 'left',
  },
  inputStyle: {
    ...ApplicationStyles.inputStyle,
    height: Metrics.applyRatio(55),
    marginBottom: Metrics.applyRatio(22),
    marginTop: Metrics.applyRatio(10),
  },
  inputStyleFB: {
    ...Fonts.style.textInput,
    marginLeft: Metrics.applyRatio(-40),
    textAlign: 'left',
    width: Metrics.applyRatio(220),
  },
  inputStyleWithIcon: {
    ...ApplicationStyles.inputStyle,
    alignItems: 'center',
    flexDirection: 'row',
  },
  sectionTitle: {
    ...Fonts.style.greyInfoUpperCase,
    paddingLeft: Metrics.applyRatio(20),
    position: 'absolute',
    textAlign: 'left',
    top: 0,
  },
  textView: {height: Metrics.applyRatio(85)},
})
