import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics, ApplicationStyles} from 'App/Theme'

export default StyleSheet.create({
  addressSector: {
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: Metrics.applyRatio(20),
  },
  animationTabBarStyle: {
    borderBottomColor: Colors.greyBackground,
    borderBottomWidth: 2,
    paddingBottom: Metrics.HEADER_ICON_SIZE,
  },
  anotherListButtonIcon: {
    ...ApplicationStyles.locationBoxSecondStyle,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    marginBottom: Metrics.applyRatio(5),
    marginRight: 0,
  },
  category: {
    color: Colors.grey4,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    marginLeft: Metrics.applyRatio(6),
    textTransform: 'uppercase',
  },
  categoryBox: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 60,
  },
  container: {
    ...ApplicationStyles.screen.container,
  },
  contentContainer: {
    alignItems: 'center',
  },
  descriptionStyle: {
    ...Fonts.style.subSectionTitle,
    color: Colors.coolGrey,
    marginBottom: Metrics.applyRatio(5),
    textAlign: 'center',
    width: Metrics.applyRatio(274),
    // position: "absolute",
    // top: 115
  },
  editIcon: {
    alignSelf: 'flex-end',
    height: Metrics.applyRatio(20),
    marginRight: Metrics.applyRatio(15),
    marginTop: Metrics.applyRatio(9),
    width: Metrics.applyRatio(20),
  },
  emptyImageStyle: {
    height: Metrics.applyRatio(145),
    marginTop: Metrics.applyRatio(20),
    width: Metrics.applyRatio(167),
  },
  emptyLocationView: {
    height: Metrics.applyRatio(39),
    width: Metrics.DEVICE_WIDTH,
  },
  emptyText: {
    color: Colors.grey1,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.medium,
    marginBottom: Metrics.applyRatio(100),
    marginTop: Metrics.applyRatio(30),
    textAlign: 'center',
  },

  failContent: {
    ...Fonts.style.subSectionTitle,
    alignSelf: 'center',
    margin: Metrics.applyRatio(5),
    textAlign: 'center',
    width: Metrics.applyRatio(214),
  },
  failImage: {
    alignSelf: 'center',
    height: Metrics.applyRatio(157),
    marginTop: Metrics.applyRatio(40),
    width: Metrics.applyRatio(188),
  },
  failTitle: {
    alignSelf: 'center',
    color: Colors.reddish91,
    fontFamily: Fonts.fonts.PoppinsSemiBold,
    fontSize: Fonts.size.small,
    letterSpacing: 0,
    marginTop: Metrics.applyRatio(10),
  },
  flexTwoContainer: {
    flex: 2,
  },
  headerLabelContent: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: Metrics.applyRatio(10),
  },
  headerTextWithLabel: {
    alignItems: 'center',
    height: Metrics.applyRatio(32),
    marginBottom: Metrics.applyRatio(15),
    paddingTop: Metrics.applyRatio(5),
    width: Metrics.applyRatio(200),
  },
  icon: {
    maxHeight: Metrics.applyRatio(20),
    maxWidth: Metrics.applyRatio(20),
    minHeight: Metrics.applyRatio(15),
    minWidth: Metrics.applyRatio(15),
    resizeMode: 'contain',
  },
  iconWithText: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Metrics.applyRatio(10),
  },
  iconsContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageInstagramContainer: {
    alignItems: 'center',
    borderColor: Colors.greyDivider,
    borderTopWidth: Metrics.applyRatio(1),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: Metrics.applyRatio(20),
    paddingTop: Metrics.applyRatio(10),
  },
  instagramIcon: {
    marginRight: Metrics.applyRatio(10),
    marginTop: Metrics.applyRatio(22.5),
    maxHeight: Metrics.applyRatio(20),
    maxWidth: Metrics.applyRatio(20),
    minHeight: Metrics.applyRatio(15),
    minWidth: Metrics.applyRatio(15),
    resizeMode: 'contain',
  },
  listButtonIcon: {
    ...ApplicationStyles.locationBoxSecondStyle,
    alignItems: 'center',
    fontSize: Fonts.size.xdsmall,
    height: Metrics.applyRatio(24),
    marginHorizontal: Metrics.applyRatio(5),
    marginRight: 0,
  },
  listItemButtonList: {
    alignItems: 'center',
    alignSelf: 'center',
    height: Metrics.applyRatio(24),
    justifyContent: 'space-evenly',
    marginBottom: Metrics.applyRatio(20),
    width: Metrics.applyRatio(274),
  },
  listTopSectionText: {
    alignSelf: 'center',
    color: Colors.black1,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.biggMedium,
    // fontWeight: 'bold',
    marginBottom: Metrics.applyRatio(10),
    marginTop: Metrics.applyRatio(10),
  },
  listViewContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: Metrics.applyRatio(300),
  },
  listViewItem: {
    borderRadius: Metrics.applyRatio(20),
    marginHorizontal: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(30),
    width: Metrics.applyRatio(335),
  },
  menuIcon: {
    height: Metrics.applyRatio(20),
    marginLeft: Metrics.applyRatio(15),
    marginTop: Metrics.applyRatio(9),
    width: Metrics.applyRatio(20),
  },
  menuTitle: {
    ...Fonts.style.titleMenu,
    alignSelf: 'center',
    fontSize: Fonts.size.big,
    margin: Metrics.applyRatio(30),
  },
  moreIcon: {
    height: Metrics.applyRatio(11),
    width: Metrics.applyRatio(14),
  },
  moreText: {
    ...Fonts.style.clickableText,
    alignSelf: 'center',
    color: Colors.grey2,
    fontFamily: Fonts.fonts.PoppinsBold,
    marginTop: Metrics.applyRatio(20),
  },
  nameStyle: {
    ...Fonts.style.title,
    fontSize: Fonts.size.biggMedium,
    height: Metrics.applyRatio(25),
    marginBottom: Metrics.applyRatio(2),

    // position: "absolute",
    // top:70
  },
  nameStyleMin: {
    ...Fonts.style.title,
    alignSelf: 'center',
    fontSize: Metrics.applyRatio(18),
    // marginTop: Metrics.applyRatio(-10),
  },
  pendingContainer: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: Colors.yellowTransparent91,
    borderRadius: Metrics.applyRatio(14),
    height: Metrics.applyRatio(28),
    justifyContent: 'center',
    marginRight: Metrics.applyRatio(10),
    marginTop: Metrics.applyRatio(-190),
    width: Metrics.applyRatio(119),
  },
  pendingContent: {
    ...Fonts.style.subSectionTitle,
    alignSelf: 'center',
    margin: Metrics.applyRatio(5),
    textAlign: 'center',
    width: Metrics.applyRatio(160),
  },
  pendingImage: {
    alignSelf: 'center',
    height: Metrics.applyRatio(166),
    marginTop: Metrics.applyRatio(40),
    width: Metrics.applyRatio(194),
  },
  pendingTitle: {
    alignSelf: 'center',
    color: Colors.darkSand,
    fontFamily: Fonts.fonts.PoppinsSemiBold,
    fontSize: Fonts.size.small,
    letterSpacing: 0,
    marginTop: Metrics.applyRatio(20),
  },
  pickerIcon: {
    backgroundColor: Colors.transparent,
    borderLeftColor: Colors.transparent,
    borderLeftWidth: Metrics.applyRatio(7),
    borderRightColor: Colors.transparent,
    borderRightWidth: Metrics.applyRatio(7),
    borderTopColor: Colors.blueValidation,
    borderTopWidth: Metrics.applyRatio(7),
    height: Metrics.applyRatio(0),
    marginLeft: Metrics.applyRatio(11),
    width: Metrics.applyRatio(0),
  },
  profileImageContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: Metrics.applyRatio(28),
    height: Metrics.applyRatio(72),
    marginBottom: Metrics.applyRatio(20),
    width: Metrics.applyRatio(72),
  },
  profileSection: {
    alignItems: 'center',
    height: Metrics.applyRatio(400),
    marginLeft: Metrics.applyRatio(7),
    width: Metrics.applyRatio(291),
  },
  promoImage: {
    borderRadius: Metrics.applyRatio(25),
    height: Metrics.applyRatio(200),
    width: Metrics.applyRatio(334),
  },
  promoRedeem: {
    alignItems: 'center',
    backgroundColor: Colors.blueTransparent90,
    borderBottomLeftRadius: Metrics.applyRatio(25),
    borderBottomRightRadius: Metrics.applyRatio(25),
    height: Metrics.applyRatio(29),
    justifyContent: 'center',
    marginTop: Metrics.applyRatio(133),
    width: Metrics.applyRatio(334),
  },
  questionBox: {alignItems: 'center', flexDirection: 'row'},
  questionIcon: {
    height: Metrics.applyRatio(15),
    margin: Metrics.applyRatio(5),
    width: Metrics.applyRatio(15),
  },
  redeemText: {
    ...ApplicationStyles.textButton,
    fontSize: Fonts.size.small,
  },
  referral: {
    color: Colors.white,
    fontSize: Fonts.size.small,
    textAlign: 'center',
  },
  referralContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.black,
    borderRadius: Metrics.applyRatio(19.5),
    height: Metrics.applyRatio(30),
    justifyContent: 'center',
    // marginTop: Metrics.applyRatio(30),
    paddingHorizontal: Metrics.applyRatio(20),
    position: 'relative',
    zIndex: 122,
    // position: "absolute",
    // top: 190
  },
  referralDashContainer: {
    backgroundColor: Colors.greyDivider,
    bottom: Metrics.applyRatio(-16),
    height: 1,
    position: 'absolute',
    width: Metrics.applyRatio(335),
    zIndex: 0,
  },
  referralDashWraper: {
    position: 'relative',
    width: Metrics.applyRatio(335),
    zIndex: 2,
  },
  refuseContainer: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: Colors.reddish91,
    borderRadius: Metrics.applyRatio(14),
    height: Metrics.applyRatio(28),
    justifyContent: 'center',
    marginRight: Metrics.applyRatio(10),
    marginTop: Metrics.applyRatio(-190),
    width: Metrics.applyRatio(119),
  },
  seeWhy: {
    color: Colors.blueyGrey,
    fontFamily: Fonts.fonts.PoppinsSemiBold,
    fontSize: Fonts.size.medium,
  },
  shadowLayer: {
    backgroundColor: Colors.greyBackground,
    borderRadius: Metrics.applyRatio(25),
    elevation: 7,
    height: Metrics.applyRatio(200),
    marginBottom: Metrics.applyRatio(10),
    width: Metrics.applyRatio(334),
  },
  statusStyle: {
    ...Fonts.style.titleMenu,
    color: Colors.whiteTransparent90,
    // position: 'absolute',
    // top: 95
  },
  tabContainer: {
    backgroundColor: Colors.greyBackground,
    flex: 1,
    justifyContent: 'center',
    width: Metrics.applyRatio(375),
  },
  textBeforePost: {
    ...Fonts.style.subSectionTitle,
    color: Colors.grey1,
    textAlign: 'center',
  },
  toggleHeaderContainer: {
    backgroundColor: Colors.white,
    height: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(20),
    width: Metrics.DEVICE_WIDTH,
  },
  topBar: {
    backgroundColor: Colors.white,
    borderWidth: 0,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  topBarMin: {
    backgroundColor: Colors.white,
    borderWidth: 0,
    flexDirection: 'row',
    height: 20,
    overflow: 'hidden',
  },
  touchableOpacity: {
    padding: Metrics.applyRatio(20),
  },
  touchableQuestion: {alignSelf: 'center'},
  usernameStyle: {
    ...Fonts.style.subSectionTitle,
    color: Colors.black,
    height: Metrics.applyRatio(17),
    marginBottom: Metrics.applyRatio(10),
    // position: 'absolute',
    // top: 95
  },
  validContainer: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: Colors.whiteTransparent90,
    borderRadius: Metrics.applyRatio(14),
    height: Metrics.applyRatio(28),
    justifyContent: 'center',
    marginRight: Metrics.applyRatio(10),
    marginTop: Metrics.applyRatio(-190),
    width: Metrics.applyRatio(119),
  },
})
