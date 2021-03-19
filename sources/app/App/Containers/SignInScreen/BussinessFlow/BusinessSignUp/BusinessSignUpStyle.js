import {Dimensions, Platform, StyleSheet} from 'react-native'
import Colors from 'App/Theme/Colors'
import Metrics from 'App/Theme/Metrics'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  avgCatTxt: {
    color: Colors.grey,
    fontFamily: Fonts.fonts.PoppinsMedium,
    fontSize: Fonts.size.small,
    paddingTop: Metrics.applyRatio(5),
  },
  bottomContainer: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    ...ApplicationStyles.buttonContainer,
    marginBottom: Metrics.applyRatio(40),
    marginTop: Metrics.applyRatio(20),
  },
  buttonContainerDisabled: {
    ...ApplicationStyles.buttonContainer,
    backgroundColor: Colors.lightBlueGrey,
    borderColor: Colors.transparent,
    marginBottom: Metrics.applyRatio(40),
    marginTop: Metrics.applyRatio(20),
  },
  buttonMessageStyle: {
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Metrics.applyRatio(14),
    // fontWeight: 'bold',
    marginBottom: Metrics.applyRatio(6),
    textAlign: 'center',
  },
  buttonTextStyle: {
    ...ApplicationStyles.textButton,
    fontSize: Fonts.size.bigMedium,
  },
  categorySlot: {
    backgroundColor: Colors.white,
    height: Metrics.applyRatio(14),
    marginBottom: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(-7),
    position: 'relative',
    transform: [{rotate: '45deg'}],
    width: Metrics.applyRatio(14),
    zIndex: 0,
  },
  container: {
    ...ApplicationStyles.screen.container,
  },
  containerImgItem: {
    alignItems: 'center',
    flex: 10,
    justifyContent: 'center',
  },
  containerItem: {
    alignItems: 'center',
    marginVertical: Metrics.applyRatio(10),
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flex: 5,
    justifyContent: 'center',
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
  deactivateButtonContainer: {
    ...ApplicationStyles.buttonContainer,
    backgroundColor: Colors.lightBlueGrey,
    marginVertical: Metrics.applyRatio(30),
    opacity: 0.6,
  },
  errorTxt: {
    color: Colors.reddish91,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    marginLeft: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(-20),
  },
  facebookPreLink: {
    textAlign: 'center',
    width: Metrics.applyRatio(100),
  },
  finishContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderTopLeftRadius: Metrics.applyRatio(25),
    borderTopRightRadius: Metrics.applyRatio(25),
    justifyContent: 'flex-end',
    paddingHorizontal: Metrics.applyRatio(20),
    width: Metrics.DEVICE_WIDTH,
  },
  finishStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.applyRatio(34),
  },
  headerBigContainer: {
    alignItems: 'center',
    flex: 2.5,
  },
  headerContainer: {
    alignItems: 'center',
  },
  imagePickerButton: {
    ...ApplicationStyles.screen.container,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePickerButtonContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.greyBackground,
    borderRadius: Metrics.applyRatio(20),
    height: Metrics.applyRatio(100),
    width: Metrics.applyRatio(100),
  },
  inactiveSlider: {
    backgroundColor: Colors.greyBackground,
    flex: 1,
    height: 2,
  },
  innerMain: {
    backgroundColor: Colors.transparentBlack,
    flex: 1,
  },
  innerText: {
    ...Fonts.style.greyInfo,
    color: Colors.coolGrey,
    marginTop: Metrics.applyRatio(15),
  },
  innerTxt: {
    ...Fonts.style.message,
    alignSelf: 'center',
    color: Colors.grey1,
    fontSize: Fonts.size.medium,
    marginTop: Metrics.applyRatio(10),
    width: Metrics.applyRatio(296),
  },
  inputSocialStyle: {
    ...ApplicationStyles.inputStyle,
    justifyContent: 'center',
    marginBottom: Metrics.applyRatio(30),
    marginTop: Metrics.applyRatio(10),
  },
  inputStyle: {
    ...ApplicationStyles.inputStyle,
    justifyContent: 'center',
    marginBottom: Metrics.applyRatio(38),
    marginTop: Metrics.applyRatio(38),
  },
  inputStyleWithIcon: {
    ...ApplicationStyles.inputStyle,
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputText: {
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
  },
  inputTextIcon: {
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    textAlign: 'left',
    width: Metrics.applyRatio(20),
  },
  maxMinAvdTxt: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsMedium,
    fontSize: Fonts.size.biggMedium,
    paddingTop: Metrics.applyRatio(20),
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderTopLeftRadius: Metrics.applyRatio(25),
    borderTopRightRadius: Metrics.applyRatio(25),
    padding: Metrics.applyRatio(25),
  },
  modalInnerView: {
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Metrics.applyRatio(40),
    width: '100%',
  },
  modalMainView: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Metrics.applyRatio(20),
    bottom: 0,
    height: Metrics.applyRatio(300),
    position: 'absolute',
    width: '100%',
  },
  modalPart: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '33.33%',
  },
  modalTabView: {
    alignItems: 'center',
    height: Metrics.applyRatio(45),
    marginBottom: Metrics.applyRatio(5),
    width: Metrics.applyRatio(45),
  },
  modalTopDash: {
    alignSelf: 'center',
    backgroundColor: Colors.modalBack,
    borderRadius: Metrics.applyRatio(2.5),
    height: Metrics.applyRatio(5),
    marginTop: Metrics.applyRatio(30),
    width: Metrics.applyRatio(30),
  },
  questionIcon: {
    color: Colors.white,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.bigMedium,
  },
  rockstarDescText: {
    ...Fonts.style.message,
    marginTop: Metrics.applyRatio(20),
  },
  rockstarImg: {
    height: Metrics.applyRatio(254),
    width: Metrics.applyRatio(301),
  },
  screen1Style: {
    alignItems: 'center',
    paddingHorizontal: Metrics.applyRatio(30),
    paddingTop: Metrics.applyRatio(10),
  },
  screenRocstarStyle: {
    alignItems: 'center',
    // marginVertical: Metrics.applyRatio(20),
    paddingHorizontal: Metrics.applyRatio(24),
  },
  selCategoryContainer: {
    alignItems: 'center',
    backgroundColor: Colors.greyBackground,
  },
  selectedImageStyle: {
    borderRadius: Metrics.applyRatio(20),
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  shareIconSize: {
    height: Metrics.applyRatio(16),
    tintColor: Colors.white,
    width: Metrics.applyRatio(16),
  },
  shareView: {
    alignItems: 'center',
    backgroundColor: Colors.text,
    borderRadius: Metrics.applyRatio(23),
    height: Metrics.applyRatio(46),
    justifyContent: 'center',
    marginLeft: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(20),
    width: Metrics.applyRatio(46),
  },
  stepSixContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flex: 5,
    marginTop: Metrics.applyRatio(-10),
  },
  stepTextStyle: {
    ...Fonts.style.greyInfoUpperCase,
    fontSize: Fonts.size.medium,
  },
  subCategoryContainer: {
    ...ApplicationStyles.screen.container,
    alignItems: 'center',
  },
  subCategoryDesc: {
    color: Colors.brownGrey99,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: 14,
    // fontWeight: 'bold',
    marginBottom: Metrics.applyRatio(10),
    textAlign: 'center',
  },
  subCategorySelect: {
    color: Colors.black3,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: 16,
    // fontWeight: 'bold',
    marginBottom: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(10),
    // marginBottom: 20,
    // marginTop: 20,
    textAlign: 'center',
  },
  subTitleStyle: {
    ...Fonts.style.subSectionTitle,
    color: Colors.grey1,
    marginBottom: Metrics.applyRatio(-15),
    marginLeft: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(30),
    zIndex: 3,
  },
  textButtonContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: Metrics.applyRatio(26),
  },
  title: {
    ...Fonts.style.categoryMissing,
    color: Colors.greyishBrown,
    marginTop: Metrics.applyRatio(20),
    textAlign: 'center',
  },
  titleContext: {
    ...Fonts.style.clickableText,
    color: Colors.coolGrey,
    fontSize: Fonts.size.medium,
    marginTop: Metrics.applyRatio(10),
    textAlign: 'center',
    width: Metrics.applyRatio(335),
  },
  titleTextStyle: {
    ...Fonts.style.title,
    alignSelf: 'center',
    marginTop: Metrics.applyRatio(10),
    textAlign: 'center',
    width: Platform.os === 'ios' ? Metrics.applyRatio(296) : Metrics.applyRatio(256),
  },
  trackStyle: {height: 1},
  uploadLaterTxt: {
    color: Colors.grey4,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.medium,
    textAlign: 'center',
  },
  whiteHeaderContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingBottom: Metrics.applyRatio(15),
    width: Metrics.DEVICE_WIDTH,
  },
})
