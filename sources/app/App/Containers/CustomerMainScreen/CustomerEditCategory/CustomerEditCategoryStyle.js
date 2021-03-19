import {StyleSheet, Platform} from 'react-native'
import Colors from 'App/Theme/Colors'
import Metrics from 'App/Theme/Metrics'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  betweenContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    ...ApplicationStyles.buttonContainer,
    marginVertical: Metrics.applyRatio(20),
  },
  buttonTextStyle: {
    ...ApplicationStyles.textButton,
    fontSize: Fonts.size.bigMedium,
  },
  categoryListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: Metrics.applyRatio(20),
    width: Metrics.applyRatio(345),
  },
  centerContainer: {
    alignItems: 'center',
  },
  clickableContainer: {
    ...ApplicationStyles.clickableTextContainer,
    marginBottom: Metrics.applyRatio(10),
  },
  clickableTextStyle: {
    ...ApplicationStyles.clickableText,
  },
  container: {
    ...ApplicationStyles.screen.container,
  },
  containerItem: {
    alignItems: 'center',
    marginVertical: Metrics.applyRatio(37),
  },
  datePickerCustom: {
    alignItems: 'flex-start',
    borderWidth: 0,
    textAlign: 'left',
  },
  datepicker: {
    height: Platform.OS === 'ios' ? Metrics.applyRatio(50) : Metrics.applyRatio(40),
    marginBottom: Metrics.applyRatio(10),
    marginTop: Metrics.applyRatio(10),
    overflow: 'hidden',
  },
  deactivateButtonContainer: {
    ...ApplicationStyles.buttonContainer,
    marginVertical: Metrics.applyRatio(20),
    opacity: 0.6,
  },
  errorTxt: {
    color: Colors.red,
    fontSize: Fonts.size.small,
  },
  finalScreenTitleStyle: {
    textAlign: 'center',
  },
  genderImg: {
    height: Metrics.applyRatio(347),
    width: Metrics.applyRatio(188),
  },
  genderSelect: {
    color: Colors.grey1,
    fontSize: Fonts.size.big,
    textTransform: 'uppercase',
  },
  genderSelectBtn: {
    alignItems: 'center',
    flex: 1,
  },
  genderSelected: {
    color: Colors.black,
    fontSize: Fonts.size.big,
    textTransform: 'uppercase',
  },
  innerScreenContainer: {
    ...ApplicationStyles.screen.container,
    paddingHorizontal: Metrics.applyRatio(20),
  },
  innerTxt: {
    ...Fonts.style.message,
    alignSelf: 'center',
    color: Colors.grey1,
    marginBottom: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(20),
    width: Metrics.applyRatio(330),
  },
  inputImageIcon: {
    height: Metrics.applyRatio(29),
    width: Metrics.applyRatio(29),
  },
  inputStyle: {
    ...ApplicationStyles.inputStyle,
    justifyContent: 'center',
  },
  inputStyleWithIcon: {
    ...ApplicationStyles.inputStyle,
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputTextIcon: {
    textAlign: 'center',
    width: Metrics.GUTTER_WIDTH * 3,
  },
  moreTagSelectButtonContainer: {
    alignItems: 'center',
    height: Metrics.applyRatio(40),
    justifyContent: 'center',
    marginTop: Metrics.applyRatio(10),
    width: Metrics.applyRatio(254),
  },
  rockstarDescText: {
    ...Fonts.style.message,
    marginTop: Metrics.applyRatio(20),
  },
  rockstarImg: {
    height: Metrics.applyRatio(254),
    width: Metrics.applyRatio(300),
  },
  screen1InputContainer: {
    ...ApplicationStyles.screen.containerRow,
    marginBottom: Metrics.applyRatio(15),
    marginTop: Metrics.applyRatio(20),
  },
  screen1InputStyle: {
    backgroundColor: Colors.greyInput,
    borderRadius: Metrics.applyRatio(17),
    height: Metrics.applyRatio(55),
    marginBottom: Metrics.applyRatio(20),
    marginHorizontal: Metrics.applyRatio(10),
    paddingLeft: Metrics.applyRatio(30),
    width: Metrics.applyRatio(148),
  },
  screen1Style: {
    alignItems: 'center',
    paddingTop: Metrics.applyRatio(10),
  },
  screenRocstarStyle: {
    alignItems: 'center',
    marginVertical: Metrics.applyRatio(20),
    padding: Metrics.applyRatio(20),
  },
  selectGenderContainer: {
    flexDirection: 'row',
    marginVertical: Metrics.applyRatio(20),
  },
  stepTextStyle: {
    ...Fonts.style.greyInfoUpperCase,
  },
  subTitleStyle: {
    ...Fonts.style.subSectionTitle,
    color: Colors.grey1,
  },
  tagStyle: {
    borderColor: Colors.black2,
    borderWidth: 1,
  },
  titleTextStyle: {
    ...Fonts.style.title,
    marginHorizontal: Metrics.applyRatio(20),
    marginVertical: Metrics.applyRatio(10),
    textAlign: 'center',
  },
  validationButtonContainer: {
    alignItems: 'center',
    borderColor: Colors.black2,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(30),
    width: Metrics.applyRatio(330),
  },
  validationButtonStyle: {
    ...Fonts.style.greyInfoDarker,
    fontSize: Fonts.size.bigMedium,
    width: Metrics.applyRatio(340),
  },
})
