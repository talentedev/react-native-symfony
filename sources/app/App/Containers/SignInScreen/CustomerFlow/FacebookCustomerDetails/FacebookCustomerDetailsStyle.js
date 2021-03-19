import {StyleSheet, Platform, Dimensions} from 'react-native'
import Metrics from 'App/Theme/Metrics'
import Fonts from 'App/Theme/Fonts'
import Colors from 'App/Theme/Colors'
import {ApplicationStyles} from 'App/Theme'

export default StyleSheet.create({
  buttonContainer: {
    ...ApplicationStyles.buttonContainer,
    marginBottom: Metrics.applyRatio(30),
    marginTop: Metrics.applyRatio(30),
  },
  buttonTextStyle: {
    ...ApplicationStyles.textButton,
    fontSize: Fonts.size.bigMedium,
  },
  canNotEditText: {
    color: Colors.coolGrey138,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.xsmall,
    marginLeft: Metrics.applyRatio(20),
  },
  centerView: {alignItems: 'center', marginTop: Metrics.applyRatio(30)},
  checkBoxDescText: {
    color: Colors.coolGrey138,
    ...Fonts.style.greyInfo,
    marginStart: Metrics.applyRatio(10),
  },
  checkBoxStyle: {
    flexDirection: 'row',
    marginLeft: Metrics.applyRatio(30),
    marginTop: Metrics.applyRatio(10),
  },
  container: {
    ...ApplicationStyles.screen.container,
  },
  customSliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop:
      Platform.OS === 'ios'
        ? Dimensions.get('screen').height > 736
          ? Metrics.applyRatio(24)
          : Metrics.applyRatio(10)
        : Metrics.applyRatio(10),
    paddingBottom: Metrics.applyRatio(20),
    paddingTop: Metrics.applyRatio(20),
  },
  customSliderStyle: {
    height: 2,
    width: Metrics.applyRatio(250),
  },
  datePickerCustom: {
    alignItems: 'flex-start',
    borderWidth: 0,
    textAlign: 'left',
  },
  deactivateButtonContainer: {
    ...ApplicationStyles.buttonContainer,
    backgroundColor: Colors.lightBlueGrey,
    marginBottom: Metrics.applyRatio(30),
    marginTop: Metrics.applyRatio(30),
    opacity: 0.5,
  },
  editView: {
    bottom: Metrics.applyRatio(0),
    height: Metrics.applyRatio(29),
    opacity: 0.91,
    position: 'absolute',
    right: Metrics.applyRatio(0),
    width: Metrics.applyRatio(29),
  },
  genderStyle: {alignItems: 'center', justifyContent: 'center'},
  inactiveSlider: {
    backgroundColor: Colors.greyBackground,
    flex: 1,
    height: 2,
  },
  inputStyle: {
    ...ApplicationStyles.inputStyle,
    height: Metrics.applyRatio(55),
    marginBottom: Metrics.applyRatio(22),
    marginTop: Metrics.applyRatio(10),
  },
  inputStyleWithIcon: {
    ...ApplicationStyles.inputStyle,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: Metrics.applyRatio(7),
  },
  inputStyleWithoutFontStyle: {
    ...ApplicationStyles.inputStyleWithoutFontStyle,
    justifyContent: 'center',
  },
  inputText: {
    ...Fonts.style.textInput,
    letterSpacing: 0,
    marginLeft: Metrics.applyRatio(5),
    paddingHorizontal: Metrics.applyRatio(0),
    textAlign: 'left',
  },
  mainContain: {
    flex: 1,
  },
  marginLeft: {
    marginLeft: Metrics.applyRatio(20),
  },
  pencilIcon: {
    maxHeight: Metrics.applyRatio(30),
    maxWidth: Metrics.applyRatio(30),
    minHeight: Metrics.applyRatio(15),
    minWidth: Metrics.applyRatio(15),
    resizeMode: 'contain',
  },
  profileImage: {
    borderRadius: Metrics.applyRatio(39),
    height: Metrics.applyRatio(78),
    width: Metrics.applyRatio(78),
  },
  profileView: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  screen1InputContainer: {
    ...ApplicationStyles.screen.containerRow,
  },
  screen1InputStyle: {
    width: Metrics.applyRatio(333) / 2 - Metrics.applyRatio(10),
  },
  sectionTitle: {
    ...Fonts.style.subSectionTitle,
    color: Colors.coolGrey,
    paddingLeft: Metrics.applyRatio(20),
    position: 'absolute',
    textAlign: 'left',
    top: Metrics.applyRatio(1.5),
  },
  subTitleStyle: {
    ...Fonts.style.subSectionTitle,
    color: Colors.coolGrey,
    marginBottom: Metrics.applyRatio(-15),
    paddingLeft: Metrics.applyRatio(20),
    position: 'relative',
    zIndex: 22,
  },
  subtitleDescText: {
    color: Colors.coolGrey138,
    ...Fonts.style.greyInfo,
    marginEnd: Metrics.applyRatio(56),
    marginStart: Metrics.applyRatio(56),
    marginTop: Metrics.applyRatio(13),
  },
  textView: {height: Metrics.applyRatio(85)},
  titleDescText: {
    color: Colors.greyishBrown,
    ...Fonts.style.title,
  },
  titleView: {
    alignItems: 'center',
    marginTop: Metrics.applyRatio(30),
  },
  viewTextInput: {
    alignItems: 'center',
    marginTop: Metrics.applyRatio(30),
  },
})
