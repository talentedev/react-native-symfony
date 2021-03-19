import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics} from 'App/Theme'

export default StyleSheet.create({
  backgroundContainer: {
    backgroundColor: Colors.greyInput,
    marginLeft: Metrics.applyRatio(23),
    marginRight: Metrics.applyRatio(23),
  },
  bottomBar: {
    backgroundColor: Colors.greyInput,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: Metrics.applyRatio(95),
    marginRight: Metrics.applyRatio(30),
  },
  bottomIcons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Metrics.applyRatio(30),
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
  defaultImageContainer: {
    alignSelf: 'center',
    borderRadius: Metrics.applyRatio(19.5),
    height: Metrics.applyRatio(34),
    width: Metrics.applyRatio(36),
  },
  iconStyle: {
    maxHeight: Metrics.applyRatio(20),
    maxWidth: Metrics.applyRatio(20),
    minHeight: Metrics.applyRatio(15),
    minWidth: Metrics.applyRatio(15),
    resizeMode: 'contain',
  },
  itemTextStyle: {
    ...Fonts.style.greyInfoDarker,
    color: Colors.black1,
    marginLeft: Metrics.applyRatio(10),
  },
  logoutStyle: {
    ...Fonts.style.titleMenu,
    color: Colors.greyishBrown, // TODO: add color greyishBrown
    fontSize: Fonts.size.medium,
    marginLeft: Metrics.applyRatio(10),
  },
  pencilStyle: {
    height: Metrics.applyRatio(14),
    marginLeft: Metrics.GUTTER_WIDTH,
    marginTop: Metrics.applyRatio(12),
    width: Metrics.applyRatio(14),
  },
  profilContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: Metrics.applyRatio(30),
  },
  profileImageContainer: {
    alignSelf: 'center',
    borderRadius: Metrics.applyRatio(39),
    height: Metrics.applyRatio(78),
    width: Metrics.applyRatio(78),
  },
  scrollView: {
    backgroundColor: Colors.greyInput,
    flexGrow: 1,
    marginLeft: Metrics.applyRatio(30),
    marginTop: Metrics.applyRatio(40),
  },
  scrollViewContainer: {
    backgroundColor: Colors.greyInput,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  socialMediaIcon: {
    height: Metrics.applyRatio(22),
    width: Metrics.applyRatio(22),
  },
  textName: {
    ...Fonts.style.title,
    color: Colors.greyishBrown,
    fontSize: Metrics.applyRatio(18),
    marginBottom: Metrics.applyRatio(-5),
    textAlign: 'left',
  },
  textProfileContainer: {
    alignItems: 'flex-start',
    marginLeft: Metrics.GUTTER_WIDTH,
  },
  textUserName: {
    ...Fonts.style.subSectionTitle,
    color: Colors.greyishBrown,
    textAlign: 'left',
  },
  titleMenu: {
    ...Fonts.style.titleMenu,
  },
  titleWithIcon: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  topBar: {
    flexDirection: 'row',
  },
  versionInfo: {
    ...Fonts.style.subSectionTitle,
    alignSelf: 'flex-end',
    fontSize: Metrics.applyRatio(15),
    letterSpacing: 0.22,
    marginTop: Metrics.applyRatio(44),
  },
})
