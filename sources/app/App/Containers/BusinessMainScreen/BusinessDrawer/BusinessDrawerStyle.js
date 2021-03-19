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
    width: Metrics.applyRatio(76), // 114 for 3 icons
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
    backgroundColor: Colors.greyInput,
    borderWidth: 0,
    flex: 1,
  },
  creditPrice: {
    color: Colors.brightBlue,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.medium,
  },
  iconStyle: {
    maxHeight: Metrics.applyRatio(20),
    maxWidth: Metrics.applyRatio(20),
    minHeight: Metrics.applyRatio(15),
    minWidth: Metrics.applyRatio(15),
    resizeMode: 'contain',
  },
  itemTextStyle: {
    ...Fonts.style.greyInfoDarker, // TODO: add font with color greyishBrown
    color: Colors.black1,
    marginLeft: Metrics.applyRatio(10),
  },
  logoutStyle: {
    ...Fonts.style.titleMenu,
    color: Colors.greyishBrown, // TODO: add color greyishBrown
    fontSize: Fonts.size.medium,
    marginLeft: Metrics.applyRatio(10),
  },
  scrollView: {
    backgroundColor: Colors.greyInput,
    flexGrow: 1,
    marginLeft: Metrics.applyRatio(30),
    marginTop: Metrics.applyRatio(87),
  },
  scrollViewContainer: {
    justifyContent: 'space-between',
  },
  socialMediaIcon: {
    height: Metrics.applyRatio(22),
    width: Metrics.applyRatio(22),
  },
  titleMenu: {
    ...Fonts.style.titleMenu,
    backgroundColor: Colors.greyInput,
  },
  titleWithIcon: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  versionInfo: {
    ...Fonts.style.subSectionTitle,
    alignSelf: 'flex-end',
    fontSize: Metrics.applyRatio(15),
    letterSpacing: 0.22,
    marginTop: Metrics.applyRatio(44),
  },
})
