import {Dimensions, Platform, StyleSheet} from 'react-native'
import Colors from 'App/Theme/Colors'
import Metrics from 'App/Theme/Metrics'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  betweenContainer: {
    height: '60%',
  },
  btnMargin: {
    marginBottom: Metrics.applyRatio(30),
  },
  buttonContainer: {
    ...ApplicationStyles.buttonContainer,
    marginVertical: Metrics.applyRatio(30),
  },
  buttonContainerFinal: {
    ...ApplicationStyles.buttonContainer,
    marginBottom: Metrics.applyRatio(10),
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
    height: '20%',
    justifyContent: 'flex-end',
    // marginTop: Metrics.applyRatio(40),
    // position: 'absolute',
  },
  clearIconStyle: {
    padding: 10,
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
    marginVertical: Metrics.applyRatio(17),
  },
  customSliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom:
      Platform.OS === 'ios'
        ? Dimensions.get('screen').height > 736
          ? Metrics.applyRatio(-12)
          : Metrics.applyRatio(-5)
        : Metrics.applyRatio(-5),
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
    width: Metrics.applyRatio(37.5),
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
    backgroundColor: Colors.lightBlueGrey,
    marginVertical: Metrics.applyRatio(30),
    opacity: 0.6,
  },
  deactivateButtonContainerFinal: {
    ...ApplicationStyles.buttonContainer,
    backgroundColor: Colors.lightBlueGrey,
    marginBottom: Metrics.applyRatio(10),
    opacity: 0.6,
  },
  errorTxt: {
    color: Colors.reddish91,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    marginLeft: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(-20),
  },
  finalScreenTitleStyle: {
    textAlign: 'center',
    width: Metrics.applyRatio(296),
  },
  flexOne: {
    flex: 1,
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
  inactiveButton: {
    opacity: 0.6,
  },
  inactiveSlider: {
    backgroundColor: Colors.greyBackground,
    flex: 1,
    height: 2,
  },
  innerScreenContainer: {
    ...ApplicationStyles.screen.container,
    paddingHorizontal: Metrics.applyRatio(20),
  },
  innerTxt: {
    ...Fonts.style.message,
    alignSelf: 'center',
    color: Colors.grey1,
    marginBottom: Metrics.applyRatio(30),
    width: Metrics.applyRatio(296),
  },
  inputImageIcon: {
    height: Metrics.applyRatio(29),
    width: Metrics.applyRatio(29),
  },
  inputStyle: {
    ...ApplicationStyles.inputStyle,
    fontSize: Fonts.size.small,
    justifyContent: 'center',
  },
  inputStyleWithIcon: {
    ...ApplicationStyles.inputStyle,
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputStyleWithoutFontStyle: {
    ...ApplicationStyles.inputStyleWithoutFontStyle,
    justifyContent: 'center',
  },
  inputText: {
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    fontStyle: 'normal',
    letterSpacing: 0,
    marginLeft: Metrics.applyRatio(5),
    textAlign: 'left',
  },
  inputTextIcon: {
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    textAlign: 'center',
    width: Metrics.applyRatio(20),
  },

  listItem: {
    alignItems: 'center',
    backgroundColor: Colors.greyBackground,
    flexDirection: 'row',
    height: Metrics.applyRatio(57),
    width: Metrics.applyRatio(315),
  },
  marginBottomButton: {
    marginBottom: Metrics.applyRatio(10),
  },
  mediumFont: {
    fontSize: Fonts.size.medium,
  },
  moreTagSelectButtonContainer: {
    alignItems: 'center',
    height: Metrics.applyRatio(40),
    justifyContent: 'center',
    marginTop: Metrics.applyRatio(10),
    width: Metrics.applyRatio(254),
  },
  nameBig: {
    color: Colors.black,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.medium,
  },
  nameSmall: {
    color: Colors.blueyGrey,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
  },
  nameStyle: {
    borderRadius: Metrics.applyRatio(16.5),
    height: Metrics.applyRatio(33),
    margin: Metrics.applyRatio(15),
    width: Metrics.applyRatio(33),
  },
  namesStyle: {flexDirection: 'column'},
  nullListItem: {
    alignItems: 'center',
    backgroundColor: Colors.greyBackground,
    height: Metrics.applyRatio(201),
    justifyContent: 'center',
    width: Metrics.applyRatio(315),
  },
  onlyCenterContainer: {
    alignItems: 'center',
  },
  rockstarDescText: {
    ...Fonts.style.message,
    marginTop: Metrics.applyRatio(10),
  },
  rockstarImg: {
    height: Metrics.applyRatio(254),
    width: Metrics.applyRatio(300),
  },
  roundSearchBar: {
    backgroundColor: Colors.greyBackground,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    height: Metrics.applyRatio(55),
    width: Metrics.applyRatio(315),
  },
  roundSearchText: {
    ...Fonts.style.titleSection,
    color: Colors.black,
    fontFamily: Fonts.fonts.PoppinsRegular,
  },
  screen1InputContainer: {
    ...ApplicationStyles.screen.containerRow,
    marginBottom: Metrics.applyRatio(15),
    marginTop: Metrics.applyRatio(20),
  },
  screen1InputStyle: {
    backgroundColor: Colors.greyInput,
    borderRadius: Metrics.applyRatio(17),
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    fontStyle: 'normal',
    height: Metrics.applyRatio(55),
    letterSpacing: 0.17,
    marginBottom: Metrics.applyRatio(20),
    marginHorizontal: Metrics.applyRatio(10),
    // marginLeft: Metrics.applyRatio(-5),
    paddingLeft: Metrics.applyRatio(20),
    textAlign: 'left',
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
  searchHead: {
    marginLeft: Metrics.applyRatio(8),
    marginTop: Metrics.applyRatio(-6),
    maxHeight: Metrics.applyRatio(20),
    maxWidth: Metrics.applyRatio(20),
    minHeight: Metrics.applyRatio(15),
    minWidth: Metrics.applyRatio(15),
    resizeMode: 'contain',
  },
  selectGenderContainer: {
    flexDirection: 'row',
    marginVertical: Metrics.applyRatio(20),
  },
  separatorStyle: {
    alignSelf: 'center',
    backgroundColor: Colors.greyDivider,
    height: Metrics.applyRatio(1),
    width: Metrics.applyRatio(275),
  },
  sixFirstView: {
    alignItems: 'center',
    height: '20%',
  },
  sliderStyle: {
    marginBottom:
      Platform.OS === 'ios'
        ? Dimensions.get('screen').height > 736
          ? Metrics.applyRatio(-12)
          : Metrics.applyRatio(-5)
        : Metrics.applyRatio(-5),
    marginTop:
      Platform.OS === 'ios'
        ? Dimensions.get('screen').height > 736
          ? Metrics.applyRatio(24)
          : Metrics.applyRatio(10)
        : Metrics.applyRatio(10),
  },
  stepTextStyle: {
    ...Fonts.style.greyInfoUpperCase,
    fontFamily: Fonts.fonts.PoppinsMedium,
    fontSize: Fonts.size.medium,
  },
  stretchableView: {
    alignSelf: 'center',
    backgroundColor: Colors.greyBackground,
    borderRadius: Metrics.applyRatio(17),
    margin: Metrics.applyRatio(20),
    overflow: 'hidden',
  },
  subTitleStyle: {
    ...Fonts.style.subSectionTitle,
    color: Colors.grey1,
    marginBottom: Metrics.applyRatio(-15),
    paddingLeft: Metrics.applyRatio(10),
    position: 'relative',
    zIndex: 22,
  },
  subtitleStyle: {
    ...Fonts.style.subSectionTitle,
    fontSize: Fonts.size.medium,
    marginHorizontal: Metrics.applyRatio(55),
    textAlign: 'center',
  },
  tagStyle: {
    borderColor: Colors.black2,
    borderWidth: 1,
  },
  titleTextStyle: {
    ...Fonts.style.title,
    marginVertical: Metrics.applyRatio(10),
    textAlign: 'center',
  },
  trackStyle: {height: 1},
  validationButton: {
    ...ApplicationStyles.buttonContainer,
  },
  validationButtonContainer: {
    ...Fonts.style.approvalPending,
    color: Colors.coolGrey,
  },
  validationButtonStyle: {
    ...Fonts.style.greyInfoDarker,
    fontSize: Fonts.size.bigMedium,
    width: Metrics.applyRatio(254),
  },
})
