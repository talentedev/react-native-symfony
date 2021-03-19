import {StyleSheet} from 'react-native'
import Colors from 'App/Theme/Colors'
import Metrics from 'App/Theme/Metrics'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  captionSubTxt: {
    color: Colors.grey4,
    fontFamily: Fonts.fonts.PoppinsMedium,
    fontSize: Fonts.size.small,
  },
  catLabel: {
    ...Fonts.style.titleSection,
    fontSize: Fonts.size.xsmall,
  },
  container: {
    ...ApplicationStyles.screen.container,
  },
  descContainer: {marginVertical: Metrics.applyRatio(10)},
  earnText: {
    ...Fonts.style.subSectionTitle,
    fontSize: Fonts.size.xsmall,
  },
  expireDateContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: Metrics.applyRatio(10),
  },
  flexOne: {flex: 1},
  leftContainer: {color: Colors.black1, marginLeft: Metrics.applyRatio(10)},
  listBottomSection: {marginVertical: Metrics.applyRatio(5)},
  listBottomSectionText: {
    color: Colors.grey4,
    fontFamily: Fonts.fonts.PoppinsMedium,
    fontSize: Fonts.size.xsmall,
  },
  listButtonIcon: {
    ...ApplicationStyles.locationBoxSecondStyle,
    fontSize: Fonts.size.xxsmall,
  },
  listFeedViewItem: {
    backgroundColor: Colors.white,
    marginVertical: Metrics.applyRatio(16),
    width: Metrics.applyRatio(263),
  },
  listImgWrapper: {
    borderBottomWidth: 0,
    borderColor: Colors.black5,
    borderRadius: Metrics.applyRatio(20),
    borderWidth: 1,
    elevation: 14,
    shadowColor: Colors.black,
    width: Metrics.applyRatio(263),
  },
  listInnerExpandedItem: {
    backgroundColor: Colors.paleGrey,
    borderColor: Colors.black5,
    borderRadius: Metrics.applyRatio(20),
    borderWidth: 1,
    elevation: 14,
    marginTop: Metrics.applyRatio(-30),
    paddingHorizontal: Metrics.applyRatio(20),
    paddingVertical: Metrics.applyRatio(30),
    width: Metrics.applyRatio(263),
  },
  listInnerItem: {
    flexDirection: 'row',
    marginVertical: Metrics.applyRatio(20),
    width: Metrics.applyRatio(263),
  },
  listItemButtonList: {flexDirection: 'row', flexWrap: 'wrap'},
  listTopSection: {alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'},
  listTopSectionClockIcon: {height: Metrics.applyRatio(15), width: Metrics.applyRatio(15)},
  listTopSectionIcon: {height: Metrics.applyRatio(15), width: Metrics.applyRatio(12)},
  listTopSectionText: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.medium,
    lineHeight: Metrics.applyRatio(20),
  },
  listViewItem: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginBottom: Metrics.applyRatio(30),
    // marginLeft: Metrics.BORDER_SAFE_WIDTH,
    // shadowColor: Colors.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 9.11,
  },
  moreIcon: {
    alignItems: 'flex-end',
    height: Metrics.applyRatio(14),
    margin: 5,
    width: Metrics.applyRatio(12),
  },
  moreIconView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: Metrics.applyRatio(60),
  },
  nameTxt: {
    ...Fonts.style.titleSection,
    fontFamily: Fonts.fonts.PoppinsMedium,
    fontSize: Fonts.size.small,
  },
  otherTxt: {
    ...Fonts.style.subSectionTitle,
    fontSize: Fonts.size.xsmall,
    marginTop: Metrics.applyRatio(-2),
  },
  promotionName: {
    ...Fonts.style.promotionName,
  },
  refCenterView: {
    alignItems: 'center',
    borderColor: Colors.black1,
    borderWidth: 2,
    height: Metrics.DEVICE_HEIGHT * 0.1,
    justifyContent: 'center',
    marginHorizontal: Metrics.applyRatio(40),
    marginVertical: Metrics.applyRatio(10),
  },
  referButtonWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: Metrics.applyRatio(10),
  },
  referExpandedFullImg: {
    backgroundColor: Colors.black,
    borderRadius: Metrics.applyRatio(20),
    height: Metrics.applyRatio(190),
    opacity: 1,
    width: Metrics.applyRatio(263),
  },
  referFullImg: {
    backgroundColor: Colors.greyBackground,
    borderRadius: Metrics.applyRatio(20),
    height: Metrics.applyRatio(160),
    width: Metrics.applyRatio(263),
  },
  referIcon: {
    alignSelf: 'center',
    height: Metrics.applyRatio(30),
    margin: 5,
    width: Metrics.applyRatio(30),
  },
  referIconView: {width: Metrics.applyRatio(30)},
  referInnerView: {
    flexDirection: 'row',
    width: Metrics.applyRatio(263),
  },
  referNameView: {
    alignSelf: 'center',
    marginLeft: Metrics.applyRatio(8),
    width: Metrics.applyRatio(170),
  },
  referNow: {color: Colors.blueValidation, fontSize: Fonts.size.medium},
  referView: {
    flexDirection: 'column',
    flex: 1,
    marginTop: Metrics.applyRatio(30),
  },
  tabBarStyle: {
    borderWidth: 1,
  },
  tabTextStyle: {
    fontSize: Fonts.size.regular,
    textAlign: 'center',
  },
  underLineTab: {
    height: Metrics.applyRatio(2),
    marginRight: Metrics.applyRatio(2),
    // width: Metrics.applyRatio(130),
  },
})
