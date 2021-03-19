import {StyleSheet} from 'react-native'
import Colors from 'App/Theme/Colors'
import Metrics from 'App/Theme/Metrics'
import Fonts from 'App/Theme/Fonts'

export default StyleSheet.create({
  categoryName: {
    color: Colors.black1,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.small,
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'right',
  },
  earnText: {
    ...Fonts.style.subSectionTitle,
    fontSize: Fonts.size.xsmall,
  },
  flexOne: {flex: 1},
  listBottomSection: {marginVertical: Metrics.applyRatio(5)},
  listBottomSectionText: {fontFamily: Fonts.fonts.PoppinsRegular, fontSize: Fonts.size.xsmall},
  listImgWrapper: {borderRadius: Metrics.applyRatio(10), marginRight: Metrics.applyRatio(10)},
  listInnerItem: {
    borderBottomColor: Colors.black5,
    borderBottomWidth: Metrics.applyRatio(1),
    flexDirection: 'row',
    padding: Metrics.applyRatio(10),
  },
  listItemButtonList: {flexDirection: 'row', flexWrap: 'wrap'},
  listTopSection: {flexDirection: 'row', justifyContent: 'space-between'},
  listTopSectionIcon: {height: Metrics.applyRatio(15), width: Metrics.applyRatio(15)},
  listTopSectionText: {
    color: Colors.black,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.bigMedium,
  },
  listViewItem: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(20),
  },
  mockBusinessIcon: {
    backgroundColor: Colors.greyLoading,
    borderRadius: Metrics.applyRatio(14),
    height: Metrics.applyRatio(38),
    width: Metrics.applyRatio(38),
  },
  mockContainer: {
    flexDirection: 'row',
    marginHorizontal: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(20),
  },
  mockLocation: {
    backgroundColor: Colors.greyLoading,
    borderRadius: Metrics.applyRatio(12),
    height: Metrics.applyRatio(18),
    marginLeft: Metrics.applyRatio(10),
    marginTop: Metrics.applyRatio(4),
    width: Metrics.applyRatio(50),
  },
  mockLocationsContainer: {
    flexDirection: 'row',
    marginHorizontal: Metrics.applyRatio(20),
  },
  mockName: {
    backgroundColor: Colors.greyLoading,
    borderRadius: Metrics.applyRatio(9),
    height: Metrics.applyRatio(16),
    width: Metrics.applyRatio(99),
  },
  mockNameBottom: {
    backgroundColor: Colors.greyLoading,
    borderRadius: Metrics.applyRatio(9),
    height: Metrics.applyRatio(16),
    marginTop: Metrics.applyRatio(4),
    width: Metrics.applyRatio(99),
  },
  mockNameContainer: {
    flexDirection: 'column',
    marginLeft: Metrics.applyRatio(10),
  },
  mockPromoImage: {
    backgroundColor: Colors.greyLoading,
    borderRadius: Metrics.applyRatio(25),
    height: Metrics.applyRatio(200),
    marginLeft: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(20),
    width: Metrics.applyRatio(334),
  },
  mockPromoSubtitle: {
    backgroundColor: Colors.greyLoading,
    borderRadius: Metrics.applyRatio(9),
    height: Metrics.applyRatio(23),
    marginLeft: Metrics.applyRatio(30),
    width: Metrics.applyRatio(243),
  },
  mockPromoTitle: {
    backgroundColor: Colors.greyLoading,
    borderRadius: Metrics.applyRatio(9),
    height: Metrics.applyRatio(23),
    marginLeft: Metrics.applyRatio(10),
    width: Metrics.applyRatio(243),
  },
  mockTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.applyRatio(20),
  },
  mockcategoryIcon: {
    backgroundColor: Colors.greyLoading,
    borderRadius: Metrics.applyRatio(14),
    height: Metrics.applyRatio(29),
    marginTop: Metrics.applyRatio(10),
    width: Metrics.applyRatio(29),
  },
  mockcategoryIconContainer: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    flex: 1,
  },
  moreIcon: {
    height: Metrics.applyRatio(20),
    width: Metrics.applyRatio(20),
  },
  moreIconDetail: {
    alignItems: 'center',
  },
  moreIconView: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    flex: 1,
  },
  nameTxt: {
    ...Fonts.style.titleSection,
  },
  otherTxt: {
    ...Fonts.style.subSectionTitle,
  },
  promotionName: {
    ...Fonts.style.promotionName,
  },
  referButtonWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: Metrics.applyRatio(10),
  },
  referIcon: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: Metrics.applyRatio(14),
    height: Metrics.applyRatio(38),
    width: Metrics.applyRatio(38),
  },
  referIconView: {width: Metrics.applyRatio(38)},
  referImg: {
    height: Metrics.applyRatio(66),
    width: Metrics.applyRatio(66),
  },
  referInnerView: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Metrics.applyRatio(40),
    marginHorizontal: Metrics.applyRatio(20),
  },
  referNameView: {
    alignSelf: 'center',
    marginLeft: Metrics.applyRatio(10),
    width: Metrics.applyRatio(225),
  },
  referNow: {color: Colors.blueValidation, fontSize: Fonts.size.medium},
  referView: {flex: 1, flexDirection: 'column', marginTop: Metrics.applyRatio(20)},
})
