import {StyleSheet} from 'react-native'
import Colors from 'App/Theme/Colors'
import Metrics from 'App/Theme/Metrics'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  almostDoneImg: {
    height: Metrics.applyRatio(240),
    marginTop: Metrics.applyRatio(40),
    width: Metrics.applyRatio(325),
  },
  appleAndPlayIcon: {
    height: Metrics.applyRatio(12),
    marginBottom: Metrics.applyRatio(5),
    marginTop: Metrics.applyRatio(5),
    width: Metrics.applyRatio(32),
  },
  barStyle: {
    // height: Metrics.applyRatio(30),
    justifyContent: 'center',
    width: Metrics.applyRatio(100),
  },
  bgContainer: {
    position: 'relative',
  },
  boldText: {
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.h1,
    marginTop: Metrics.applyRatio(3),
  },
  bottomContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  bottomContainerWithText: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
  },
  btnWithIcon: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnWrapper: {
    flexDirection: 'row',
    marginTop: Metrics.applyRatio(10),
    width: Metrics.applyRatio(228),
  },
  buttonContainer: {
    ...ApplicationStyles.buttonContainer,
    marginVertical: Metrics.applyRatio(10),
  },
  buttonRightBoldTxt: {
    color: Colors.grey4,
    fontSize: Fonts.size.small,
    paddingLeft: Metrics.applyRatio(10),
  },
  buttonRightTxt: {
    color: Colors.grey4,
    fontSize: Fonts.size.small,
    paddingLeft: Metrics.applyRatio(10),
  },
  buttonTextStyle: {
    ...ApplicationStyles.textButton,
    fontSize: Fonts.size.bigMedium,
  },
  cardItemWrapper: {
    flexDirection: 'column',
    width: Metrics.applyRatio(335),
  },
  clearIconStyle: {
    padding: 10,
  },
  codeCellContainer: {
    marginTop: Metrics.applyRatio(30),
    width: Metrics.applyRatio(304),
  },
  codeCellItem: {
    backgroundColor: Colors.greyBackground,
    borderRadius: Metrics.applyRatio(13.6),
    fontFamily: Fonts.fonts.PoppinsRegular,
    paddingBottom: 1,
  },
  codeInputWrapper: {
    alignItems: 'center',
    height: Metrics.applyRatio(120),
  },

  congCircle: {
    alignItems: 'center',
    borderColor: Colors.active,
    borderRadius: Metrics.applyRatio(66),
    borderWidth: 2,
    height: Metrics.applyRatio(132),
    justifyContent: 'center',
    marginTop: Metrics.applyRatio(25),
    width: Metrics.applyRatio(132),
  },

  congrateImg: {
    height: Metrics.applyRatio(214),
    marginTop: Metrics.applyRatio(40),
    width: Metrics.applyRatio(300),
  },
  container: {
    ...ApplicationStyles.screen.container,
  },
  containerIem: {
    alignItems: 'center',
    width: Metrics.applyRatio(325),
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flex: 5,
  },
  copyTextBtnWrapper: {
    bottom: Metrics.applyRatio(10),
    flexDirection: 'row',
    marginTop: Metrics.applyRatio(15),
    position: 'absolute',
    width: Metrics.applyRatio(228),
  },
  cornerBgContent: {
    alignItems: 'center',
    bottom: 0,
    left: 0,
    padding: Metrics.applyRatio(15),
    position: 'absolute',
    right: 0,
    top: 0,
  },
  cornerBgImg: {
    height: Metrics.applyRatio(75),
    margin: Metrics.applyRatio(8),
    width: Metrics.applyRatio(130),
  },
  descTxt: {
    fontFamily: Fonts.fonts.PoppinsLight,
    fontSize: Fonts.size.xxsmall,
    marginVertical: Metrics.applyRatio(5),
    textAlign: 'center',
    width: Metrics.applyRatio(110),
  },
  descriptionBox: {
    color: Colors.grey4,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.xsmall,
  },
  emailStyle: {
    color: Colors.blueValidation,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.small,
    marginTop: Metrics.applyRatio(3),
    textAlign: 'center',
  },
  fabricIcon: {
    height: Metrics.applyRatio(30),
    marginTop: Metrics.applyRatio(30),
    width: Metrics.applyRatio(30),
  },
  femaleIcon: {
    borderRadius: Metrics.applyRatio(11),
    height: Metrics.applyRatio(22),
    marginTop: Metrics.applyRatio(10),
    width: Metrics.applyRatio(22),
  },
  footerItem: {
    marginBottom: Metrics.applyRatio(10),
  },
  imageTabBtnIcon: {
    height: Metrics.applyRatio(14),
    width: Metrics.applyRatio(14),
  },
  imageTabBtnLinkIcon: {
    height: Metrics.applyRatio(16),
    width: Metrics.applyRatio(14),
  },
  imgOverContainer: {
    alignItems: 'center',
    width: Metrics.applyRatio(150),
  },
  imgOverContent: {
    alignItems: 'center',
    bottom: 0,
    left: 0,
    paddingHorizontal: 30,
    paddingVertical: 40,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  inactiveButton: {
    opacity: 0.6,
  },
  invalidText: {
    alignSelf: 'center',
    color: Colors.reddish91,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    marginBottom: Metrics.applyRatio(10),
    marginTop: Metrics.applyRatio(-40),
  },
  leftTitle: {
    ...Fonts.style.title,
    marginTop: Metrics.applyRatio(40),
    textAlign: 'left',
    width: Metrics.applyRatio(296),
  },
  lightBoxImg: {
    height:
      ((Metrics.DEVICE_HEIGHT - Metrics.HEADER_BAR_HEIGHT_COMPACT) * 5) / 6 -
      Metrics.applyRatio(280),
    width:
      ((Metrics.DEVICE_HEIGHT - Metrics.HEADER_BAR_HEIGHT_COMPACT) * 5) / 6 -
      Metrics.applyRatio(280),
  },
  listButtonIcon: {
    ...ApplicationStyles.locationBoxThirdStyle,
  },
  listCardContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: Metrics.applyRatio(310),
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: Colors.greyBackground,
    flexDirection: 'row',
    height: Metrics.applyRatio(57),
    width: Metrics.applyRatio(315),
  },
  listItemButtonList: {flexDirection: 'row', flexWrap: 'wrap', marginTop: Metrics.applyRatio(5)},
  listTextItem: {
    flexDirection: 'row',
    marginVertical: Metrics.applyRatio(10),
  },
  listViewItem: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.applyRatio(20),
    marginHorizontal: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(20),
    padding: Metrics.applyRatio(10),
  },
  listViewItemWithBorder: {
    backgroundColor: Colors.white,
    borderColor: Colors.listCardBorder,
    borderRadius: Metrics.applyRatio(20),
    borderWidth: 1,
    marginHorizontal: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(20),
  },
  logoWithNameStyle: {
    height: Metrics.applyRatio(15),
    marginTop: Metrics.applyRatio(15),
    width: Metrics.applyRatio(60),
  },
  mainContainer: {
    backgroundColor: Colors.white,
    flex: 5,
  },
  nameStyle: {
    height: Metrics.applyRatio(33),
    margin: Metrics.applyRatio(15),
    width: Metrics.applyRatio(33),
  },
  namesStyle: {flexDirection: 'column'},
  pointText: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.medium,
    paddingHorizontal: Metrics.applyRatio(10),
  },
  posintCircleImg: {
    height: Metrics.applyRatio(9),
    marginLeft: Metrics.applyRatio(25),
    marginTop: Metrics.applyRatio(5),
    width: Metrics.applyRatio(9),
  },
  positionBtn: {
    bottom: Metrics.applyRatio(10),
    position: 'absolute',
  },
  proceedingText: {
    color: Colors.coolGrey,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.medium,
    marginBottom: Metrics.applyRatio(-5),
  },
  promoText: {
    padding: Metrics.applyRatio(10),
    textAlign: 'center',
    width: Metrics.applyRatio(304),
  },
  promoTextContainer: {
    alignItems: 'center',
    backgroundColor: Colors.greyBackground,
    borderRadius: Metrics.applyRatio(35),
    height: Metrics.applyRatio(180),
    justifyContent: 'center',
    padding: Metrics.applyRatio(10),
    width: Metrics.applyRatio(304),
  },
  promotionDisplay: {
    alignSelf: 'center',
    borderColor: Colors.listCardBorder,
    borderRadius: Metrics.applyRatio(15),
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: Metrics.applyRatio(86),
    width: Metrics.applyRatio(335),
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
    color: Colors.brownGrey,
  },
  scrollContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  semiTitle: {
    alignSelf: 'center',
    color: Colors.black1,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.big,
    marginTop: Metrics.applyRatio(30),
  },
  separatorStyle: {
    alignSelf: 'center',
    backgroundColor: Colors.greyDivider,
    height: Metrics.applyRatio(1),
    width: Metrics.applyRatio(275),
  },
  shadowView: {
    ...ApplicationStyles.shadowView,
    backgroundColor: Colors.white,
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
    fontSize: Fonts.size.bigMedium,
    marginTop: Metrics.applyRatio(15),
    textAlign: 'center',
    width: Metrics.applyRatio(256),
  },
  subtitleStyle: {
    ...Fonts.style.subSectionTitle,
    fontSize: Fonts.size.medium,
    marginBottom: Metrics.applyRatio(10),
    marginHorizontal: Metrics.applyRatio(55),
    marginTop: Metrics.applyRatio(-10),
    textAlign: 'center',
  },
  tabBarStyle: {
    backgroundColor: Colors.white,
  },
  tabContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: Metrics.applyRatio(30),
  },
  tabContent: {
    alignItems: 'center',
    marginTop: Metrics.applyRatio(100),
  },
  tabContentWithBg: {
    alignItems: 'center',
    height: Metrics.applyRatio(465),
    marginTop: Metrics.applyRatio(0),
    position: 'relative',
    width: Metrics.applyRatio(246),
  },
  tabContentWrapper: {
    alignItems: 'center',
    flex: 1,
    marginTop: Metrics.applyRatio(20),
    position: 'relative',
  },
  tabImgBg: {
    height: Metrics.applyRatio(465),
    width: Metrics.applyRatio(246),
  },
  tabImgContentWrapper: {
    alignItems: 'center',
    flex: 1,
    marginTop: Metrics.applyRatio(10),
    position: 'relative',
  },
  termsText: {
    color: Colors.blueValidation,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.medium,
  },
  textBox: {flexDirection: 'column', margin: Metrics.applyRatio(10)},
  textButtonContainer: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  textTabContentWithBg: {
    alignItems: 'center',
    marginTop: Metrics.applyRatio(0),
    position: 'relative',
    width: Metrics.applyRatio(246),
  },
  titleBox: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsMedium,
    fontSize: Fonts.size.bigMedium,
    width: Metrics.applyRatio(200),
  },
  titleTextStyle: {
    ...Fonts.style.title,
    fontSize: Fonts.size.regular,
    marginTop: Metrics.applyRatio(35),
    textAlign: 'center',
    width: Metrics.applyRatio(296),
  },
  titleTxt: {
    ...Fonts.style.title,
    fontSize: Fonts.size.xsmall,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  topTitle: {
    color: Colors.grey,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.medium,
    marginBottom: Metrics.applyRatio(10),
    textAlign: 'center',
  },
  validationButton: {
    marginTop: Metrics.applyRatio(13),
    ...ApplicationStyles.buttonContainer,
  },
  validationText: {
    ...ApplicationStyles.textButton,
  },
  viewShotContainer: {
    bottom: Metrics.applyRatio(-800),
    position: 'absolute',
  },
})
