import {StyleSheet} from 'react-native'
import {Colors, Metrics, Fonts, ApplicationStyles} from 'App/Theme'

export default StyleSheet.create({
  activeHeader: {
    alignItems: 'center',
    borderColor: Colors.black4,
    borderRadius: Metrics.applyRatio(20),
    borderStyle: 'dashed',
    borderWidth: Metrics.applyRatio(1),
    marginHorizontal: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(20),
    paddingHorizontal: Metrics.applyRatio(45),
    paddingVertical: Metrics.applyRatio(20),
  },
  activeStyle: {flex: 1, marginTop: Metrics.applyRatio(20)},
  container: {
    ...ApplicationStyles.screen.container,
    backgroundColor: Colors.greyBackground,
    flex: 1,
    justifyContent: 'center',
  },
  emptyCon: {alignItems: 'center'},
  error: {
    ...Fonts.style.normal,
    marginBottom: Metrics.applyRatio(5),
    textAlign: 'center',
  },
  instructions: {
    ...Fonts.style.normal,
    fontStyle: 'italic',
    marginBottom: Metrics.applyRatio(5),
    textAlign: 'center',
  },
  loading: {
    ...Fonts.style.normal,
    marginBottom: Metrics.applyRatio(5),
    textAlign: 'center',
  },
  logo: {
    height: '100%',
    width: '100%',
  },
  logoContainer: {
    height: Metrics.applyRatio(300),
    marginBottom: Metrics.applyRatio(25),
    width: '100%',
  },
  marginHeader: {marginTop: Metrics.applyRatio(20)},
  result: {
    ...Fonts.style.normal,
    marginBottom: Metrics.applyRatio(5),
    textAlign: 'center',
  },
  startPromotionTxt: {
    ...Fonts.style.startPromotion,
    color: Colors.greyishBrown,
  },
  tabBarStyle: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: Metrics.applyRatio(23),
    borderBottomRightRadius: Metrics.applyRatio(23),
    height: Metrics.applyRatio(60),
    overflow: 'hidden',
  },
  tabTextStyle: {
    fontSize: Fonts.size.regular,
    textAlign: 'center',
  },
  text: {
    ...Fonts.style.normal,
    marginBottom: Metrics.applyRatio(5),
    textAlign: 'center',
  },
  textStyle: {
    color: Colors.greyDark,
    fontSize: Fonts.size.regular,
  },
  title: {
    ...Fonts.style.h2,
    marginBottom: Metrics.applyRatio(10),
    textAlign: 'center',
  },
})
