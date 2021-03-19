import {StyleSheet} from 'react-native'
import Colors from 'App/Theme/Colors'
import Metrics from 'App/Theme/Metrics'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  animationTabBarStyle: {
    borderBottomColor: Colors.greyBackground,
    borderBottomWidth: 1,
    paddingBottom: Metrics.HEADER_ICON_SIZE,
  },
  bookmarkCenterView: {
    alignItems: 'flex-end',
    borderColor: Colors.black1,
    borderWidth: 2,
    height: Metrics.DEVICE_HEIGHT * 0.3,
    marginHorizontal: 25,
    marginVertical: 10,
  },
  bookmarkCheckIcon: {
    height: Metrics.applyRatio(14),
    marginRight: Metrics.applyRatio(5),
    width: Metrics.applyRatio(12),
  },
  bookmarkEarnTxt: {color: Colors.black2, fontSize: Fonts.size.h4, marginLeft: 10},
  bookmarkIcon: {
    alignItems: 'flex-end',
    height: Metrics.DEVICE_WIDTH * 0.08,
    margin: 5,
    width: Metrics.DEVICE_WIDTH * 0.08,
  },
  bookmarkIconView: {width: Metrics.DEVICE_WIDTH * 0.2},
  bookmarkInnerView: {width: Metrics.DEVICE_WIDTH * 0.8},
  bookmarkOffTxt: {color: Colors.black1, fontSize: Fonts.size.h2, marginLeft: 10},
  bookmarkReferName: {color: Colors.black3, fontSize: Fonts.size.h5, marginLeft: 10},
  bookmarkView: {
    flexDirection: 'row',
    marginHorizontal: 25,
    marginVertical: 10,
  },
  centerText: {alignSelf: 'center', flex: 1, justifyContent: 'center'},
  centerView: {alignItems: 'center', marginTop: Metrics.applyRatio(120)},
  container: {
    ...ApplicationStyles.screen.container,
    backgroundColor: Colors.greyBackground,
  },
  earnText: {color: Colors.black2, fontSize: Fonts.size.h5, marginLeft: 35},
  emptyContainer: {
    alignItems: 'center',
    width: Metrics.applyRatio(263),
  },
  emptyTxt: {
    ...Fonts.style.message,
    fontSize: Fonts.size.small,
    marginBottom: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(44),
    textAlign: 'center',
    width: Metrics.applyRatio(214),
  },
  listViewContainer: {
    flex: 1,
  },
  moreIcon: {
    height: Metrics.applyRatio(20),
    width: Metrics.applyRatio(20),
  },
  moreIconView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: Metrics.applyRatio(60),
  },
  nameTxt: {color: Colors.black1, fontSize: Fonts.size.h3},
  navigationTxt: {
    color: Colors.blueyGrey,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.medium,
    marginLeft: Metrics.applyRatio(5),
  },
  offText: {color: Colors.black1, fontSize: Fonts.size.h2, marginLeft: 30},
  offerIcon: {
    height: Metrics.applyRatio(18),
    marginRight: Metrics.applyRatio(5),
    width: Metrics.applyRatio(18),
  },
  offerText: {color: Colors.red, marginRight: Metrics.DEVICE_WIDTH * 0.05, textAlign: 'right'},
  otherTxt: {color: Colors.black1, fontSize: Fonts.size.h4},
  refCenterView: {
    alignItems: 'center',
    borderColor: Colors.black1,
    borderWidth: 2,
    height: Metrics.DEVICE_HEIGHT * 0.1,
    justifyContent: 'center',
    marginHorizontal: 25,
    marginVertical: 10,
  },
  referIcon: {
    alignSelf: 'center',
    height: Metrics.DEVICE_WIDTH * 0.15,
    margin: 5,
    width: Metrics.DEVICE_WIDTH * 0.15,
  },
  referIconView: {width: Metrics.DEVICE_WIDTH * 0.15},
  referInnerView: {
    flexDirection: 'row',
    height: Metrics.DEVICE_HEIGHT * 0.09,
    marginHorizontal: Metrics.DEVICE_HEIGHT * 0.01,
    width: Metrics.DEVICE_WIDTH,
  },
  referName: {alignSelf: 'center', marginLeft: 10, width: Metrics.DEVICE_WIDTH * 0.85},
  referNameView: {alignSelf: 'center', marginLeft: 10, width: Metrics.DEVICE_WIDTH * 0.7},
  referNow: {color: Colors.black1, fontSize: Fonts.size.h2},
  referProgress: {color: Colors.black1, fontSize: Fonts.size.h5},
  referView: {flex: 1, flexDirection: 'column'},
  selfCenter: {
    alignSelf: 'center',
    maxHeight: Metrics.applyRatio(20),
    maxWidth: Metrics.applyRatio(20),
    minHeight: Metrics.applyRatio(15),
    minWidth: Metrics.applyRatio(15),
    resizeMode: 'contain',
  },
  tabTextStyle: {
    fontSize: Fonts.size.regular,
    textAlign: 'center',
  },
  textWithIcon: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  undrawEmptyImg: {
    height: Metrics.applyRatio(201),
    width: Metrics.applyRatio(263),
  },
})
