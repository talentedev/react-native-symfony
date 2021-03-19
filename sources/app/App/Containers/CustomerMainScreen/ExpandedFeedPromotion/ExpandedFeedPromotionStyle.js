import {StyleSheet} from 'react-native'
import Metrics from 'App/Theme/Metrics'
import Colors from 'App/Theme/Colors'
import Fonts from 'App/Theme/Fonts'

export default StyleSheet.create({
  backgroundImage: {
    backgroundColor: Colors.black,
    height: Metrics.DEVICE_WIDTH * 0.7,
    width: Metrics.DEVICE_WIDTH,
  },
  bgContainer: {
    flex: 1,
  },
  bookmarkWrapper: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.applyRatio(28.8),
    height: Metrics.applyRatio(57.6),
    padding: Metrics.applyRatio(11),
    position: 'absolute',
    right: Metrics.applyRatio(-14),
    top: Metrics.applyRatio(-28.8),
    width: Metrics.applyRatio(57.6),
  },
  contentBody: {
    marginTop: Metrics.GUTTER_WIDTH * 3,
    paddingHorizontal: Metrics.GUTTER_WIDTH * 3,
  },
  contentContainer: {
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
  },
  deleteText: {
    ...Fonts.style.approvalPending,
    color: Colors.reddish91,
    marginLeft: Metrics.applyRatio(8),
  },
  deleteTextView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: Metrics.applyRatio(30),
    marginTop: Metrics.applyRatio(30),
  },
  description: {
    color: Colors.black1,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    textAlign: 'justify',
  },
  detailContentContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    marginTop: Metrics.DEVICE_WIDTH * 0.35,
    paddingTop: Metrics.applyRatio(90),
    width: '100%',
  },
  extraMarginTop: {
    marginTop: Metrics.applyRatio(20),
  },
  footerAlert: {
    alignItems: 'center',
    backgroundColor: Colors.paleGreyTwo,
    borderRadius: Metrics.applyRatio(10),
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Metrics.applyRatio(20),
    paddingVertical: Metrics.applyRatio(8),
  },
  footerAlertText: {
    color: Colors.greyishBrown,
    marginRight: Metrics.GUTTER_WIDTH * 0.5,
  },
  footerSelectedTabItem: {
    backgroundColor: Colors.blueValidation,
  },
  footerTab: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    width: Metrics.DEVICE_WIDTH,
  },
  footerTabItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: Metrics.GUTTER_WIDTH * 3,
  },
  footerTabItemText: {
    color: Colors.blueValidation,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.bigMedium,
  },
  footerTabSeletedItemText: {
    color: Colors.white,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.bigMedium,
  },
  gridItem: {
    alignItems: 'center',
    backgroundColor: Colors.paleGreyTwo,
    borderRadius: Metrics.applyRatio(18),
    flex: 1,
    paddingHorizontal: Metrics.GUTTER_WIDTH,
    paddingVertical: Metrics.GUTTER_WIDTH,
    textAlign: 'center',
  },
  leftContent: {
    justifyContent: 'flex-start',
  },
  linkText: {
    alignSelf: 'center',
    color: Colors.brightBlue,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.bigMedium,
    marginVertical: Metrics.applyRatio(30),
  },
  listBottomSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: Metrics.GUTTER_WIDTH,
  },
  listBottomSectionText: {
    color: Colors.black1,
    fontFamily: Fonts.fonts.PoppinsMedium,
    fontSize: Fonts.size.small,
    paddingLeft: Metrics.GUTTER_WIDTH,
  },
  listButtonIcon: {
    borderColor: Colors.greyDivider,
    borderRadius: Metrics.applyRatio(13.5),
    borderWidth: 1,
    color: Colors.black1,
    fontFamily: Fonts.fonts.PoppinsMedium,
    fontSize: Fonts.size.small,
    marginRight: Metrics.applyRatio(10),
    paddingHorizontal: Metrics.applyRatio(10),
    paddingTop: Metrics.applyRatio(4),
  },
  listButtonIconOnline: {
    borderColor: Colors.brightBlue,
    color: Colors.brightBlue,
    marginTop: Metrics.applyRatio(7),
  },
  listItemButtonList: {
    height: Metrics.applyRatio(27),
    marginTop: Metrics.applyRatio(7),
  },
  listTopSection: {
    flexDirection: 'row',
    marginVertical: Metrics.GUTTER_WIDTH,
  },
  listTopSectionIcon: {height: Metrics.applyRatio(15), width: Metrics.applyRatio(15)},
  listTopSectionText: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.big,
    letterSpacing: 0,
  },
  marginLeft: {
    marginLeft: Metrics.GUTTER_WIDTH * 0.5,
  },
  marginRight: {
    marginRight: Metrics.GUTTER_WIDTH * 0.5,
  },
  moreBtn: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.medium,
    marginTop: Metrics.applyRatio(10),
    textAlign: 'right',
  },
  overwrapImgContainer: {
    backgroundColor: Colors.blackShadeOpacity1,
    height: Metrics.DEVICE_HEIGHT * 0.5,
    position: 'absolute',
    width: Metrics.DEVICE_WIDTH,
    zIndex: 2,
  },
  priceListItem: {
    flexDirection: 'row',
    marginTop: Metrics.applyRatio(20),
  },
  promoImage: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.applyRatio(8.4),
    height: Metrics.applyRatio(25),
    width: Metrics.applyRatio(25),
  },
  promotionTitle: {
    ...Fonts.style.promotionName,
    paddingLeft: Metrics.applyRatio(10),
  },
  redemBox: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Metrics.applyRatio(20),
    marginHorizontal: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(-120),
    paddingVertical: Metrics.applyRatio(27),
    position: 'relative',
    zIndex: 3,
  },
  redemptionCount: {
    alignItems: 'center',
    height: Metrics.applyRatio(30),
    marginTop: Metrics.applyRatio(-40),
    position: 'relative',
  },
  redemptionTxt: {
    backgroundColor: Colors.black,
    borderRadius: Metrics.applyRatio(19.5),
    color: Colors.white,
    fontSize: Fonts.size.medium,
    paddingHorizontal: Metrics.applyRatio(15),
    paddingVertical: Metrics.applyRatio(5),
    textAlign: 'center',
  },
  referrerAmount: {
    fontFamily: Fonts.fonts.PoppinsMedium,
    fontSize: Fonts.size.big,
  },
  referrerIcon: {
    backgroundColor: Colors.paleGreyTwo,
    borderRadius: Metrics.applyRatio(18),
    height: Metrics.applyRatio(36),
    paddingLeft: Metrics.applyRatio(8),
    paddingTop: Metrics.applyRatio(5),
    width: Metrics.applyRatio(36),
  },
  referrerIconContent: {
    fontSize: Fonts.size.bigMedium,
  },
  referrerText: {
    alignSelf: 'center',
    color: Colors.greyishBrown,
    paddingLeft: Metrics.applyRatio(10),
  },
  scrollInnerView: {
    paddingTop: Metrics.applyRatio(30),
    width: Metrics.DEVICE_WIDTH - Metrics.GUTTER_WIDTH * 6,
  },
  shape: {
    alignSelf: 'flex-end',
    height: Metrics.applyRatio(8),
    marginLeft: Metrics.applyRatio(20),
    width: Metrics.applyRatio(8),
  },
  subSectionContentWrapper: {
    marginBottom: Metrics.applyRatio(30),
  },
  subSectionIcon: {
    height: Metrics.applyRatio(22),
    width: Metrics.applyRatio(22),
  },
  subSectionTitle: {
    ...Fonts.style.promotionName,
    fontFamily: Fonts.fonts.PoppinsBold,
    paddingLeft: Metrics.applyRatio(10),
  },
  subSectionTitleWrapper: {
    flexDirection: 'row',
    marginBottom: Metrics.applyRatio(10),
  },
  viewMoreTxt: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    textAlign: 'left',
    width: Metrics.applyRatio(310),
  },
  waveImg: {
    alignSelf: 'center',
    height: Metrics.applyRatio(7),
    width: Metrics.applyRatio(47),
  },
  wrapText: {
    flex: 1,
    flexWrap: 'wrap',
  },
})
