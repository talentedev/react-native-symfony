import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics} from 'App/Theme'

export default StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: Metrics.applyRatio(95),
    justifyContent: 'space-between',
    marginRight: Metrics.applyRatio(30),
  },
  bottomIcons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: Metrics.applyRatio(30),
    marginTop: Metrics.applyRatio(44),
    width: Metrics.applyRatio(114),
  },
  bottomTextBar: {
    flexGrow: 1,
  },
  centerView: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: Metrics.applyRatio(30),
  },
  clickables: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    flex: 1,
  },
  contentBarStyle: {
    ...Fonts.style.greyInfoDarker, // TODO: add font with color greyishBrown
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexGrow: 1,
    flexWrap: 'wrap',
    fontSize: Fonts.size.medium,
    marginLeft: Metrics.applyRatio(11),
    width: Metrics.applyRatio(280),
  },

  emptyContainer: {
    alignItems: 'center',
    width: Metrics.applyRatio(263),
  },
  emptyTxt: {
    ...Fonts.style.message,
    marginBottom: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(44),
    textAlign: 'center',
    width: Metrics.applyRatio(214),
  },
  itemTextStyle: {
    ...Fonts.style.titleSection,
    alignSelf: 'flex-start',
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.medium,
    textAlign: 'left',
    width: Metrics.applyRatio(200),
  },
  largeMoneyStyle: {
    ...Fonts.style.title,
    color: Colors.black,
    flex: 1,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Metrics.applyRatio(12),
    fontStyle: 'normal',
    textAlign: 'right',
  },
  logoutStyle: {
    ...Fonts.style.titleMenu,
    color: Colors.greyishBrown, // TODO: add color greyishBrown
    fontSize: Fonts.size.medium,
    marginLeft: Metrics.applyRatio(10),
  },
  moneyBox: {
    alignItems: 'flex-end',
    flexGrow: 1,
    width: Metrics.applyRatio(48),
  },
  moneyStyle: {
    ...Fonts.style.title,
    color: Colors.black,
    flex: 1,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Metrics.applyRatio(18),
    fontStyle: 'normal',
    textAlign: 'right',
  },
  navigationTxt: {
    ...Fonts.style.clickableText,
  },
  notificationStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  offerIcon: {
    height: Metrics.applyRatio(18),
    marginRight: Metrics.applyRatio(5),
    width: Metrics.applyRatio(18),
  },
  scrollStyle: {
    flexGrow: 1,
    marginBottom: Metrics.applyRatio(15),
    marginLeft: Metrics.applyRatio(20),
    marginRight: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(15),
  },
  scrollView: {
    flexGrow: 1,
    marginLeft: Metrics.applyRatio(30),
    marginTop: Metrics.applyRatio(87),
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  textBarStyle: {
    ...Fonts.style.greyInfoDarker, // TODO: add font with color greyishBrown
    flexDirection: 'row',
    flexGrow: 1,
    fontSize: Fonts.size.medium,
  },
  textWithIcon: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeTextStyle: {
    ...Fonts.style.greyInfoDarker, // TODO: add font with color greyishBrown
    alignSelf: 'flex-start',
    fontSize: Fonts.size.small,
  },
  titleMenu: {
    ...Fonts.style.titleMenu,
  },
  titleTextStyle: {
    color: Colors.black,
    fontFamily: Fonts.fonts.PoppinsBold,
    // fontWeight: 'bold',
  },
  undrawEmptyImg: {
    height: Metrics.applyRatio(201),
    width: Metrics.applyRatio(263),
  },
})
