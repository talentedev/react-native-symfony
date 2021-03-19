import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics} from 'App/Theme'

export default StyleSheet.create({
  bottomBar: {
    alignItems: 'center',
    backgroundColor: Colors.bottomNav,
    borderTopWidth: 0,
    height: Metrics.BOTTOM_NAV_BAR_HEIGHT,
    justifyContent: 'center',
  },
  bottomBarLabelActive: {
    ...Fonts.style.greyInfoUpperCase,
    color: Colors.selected,
    fontFamily: Fonts.fonts.PoppinsBold,
    marginTop: Metrics.applyRatio(4),
  },
  bottomBarLabelInactive: {
    ...Fonts.style.greyInfoUpperCase,
    color: Colors.inActive,
    marginTop: Metrics.applyRatio(4),
  },
  centerButton: {
    height: 20,
    resizeMode: 'contain',
  },
  icon: {
    height: 20,
    width: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  leftButton: {
    marginLeft: 50,
  },
  leftImage: {
    height: 20,
    resizeMode: 'contain',
  },
  rightButton: {
    marginRight: 50,
  },
  rightImage: {
    height: 20,
    resizeMode: 'contain',
  },
  tabBarBookmarkIcon: {
    height: Metrics.applyRatio(18),
    width: Metrics.applyRatio(15),
  },
  tabBarIcon: {
    height: Metrics.applyRatio(18),
    width: Metrics.applyRatio(18),
  },
  text: {},
})
