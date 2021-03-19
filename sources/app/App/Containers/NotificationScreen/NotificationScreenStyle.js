import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics} from 'App/Theme'

export default StyleSheet.create({
  backButton: {
    color: Colors.blueyGrey,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.medium,
    // fontWeight: 'bold',
  },
  backButtonContainer: {
    marginHorizontal: Metrics.applyRatio(20),
    marginVertical: Metrics.applyRatio(20),
  },
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
  emptyScreen: {
    alignItems: 'center',
    height: Metrics.applyRatio(500),
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: Colors.iconGrey,
    borderRadius: Metrics.applyRatio(15),
    height: Metrics.applyRatio(44),
    justifyContent: 'center',
    width: Metrics.applyRatio(44),
  },
  iconStyle: {
    height: Metrics.applyRatio(29),
    resizeMode: 'contain',
    width: Metrics.applyRatio(23),
  },
  itemTextStyle: {
    ...Fonts.style.greyInfoDarker, // TODO: add font with color greyishBrown
    alignSelf: 'flex-start',
    fontSize: Fonts.size.medium,
    textAlign: 'left',
  },
  logoutStyle: {
    ...Fonts.style.titleMenu,
    color: Colors.greyishBrown, // TODO: add color greyishBrown
    fontSize: Fonts.size.medium,
    marginLeft: Metrics.applyRatio(10),
  },
  messageText: {
    color: Colors.blueyGrey,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    marginLeft: Metrics.applyRatio(82),
    marginRight: Metrics.applyRatio(82),
    marginTop: Metrics.applyRatio(49),
    textAlign: 'center',
  },
  notificationStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    marginVertical: Metrics.applyRatio(5),
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
    alignItems: 'flex-start',
    flexGrow: 1,
    flexWrap: 'wrap',
    fontSize: Fonts.size.medium,
    marginLeft: Metrics.applyRatio(11),
    width: Metrics.applyRatio(260),
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
})
