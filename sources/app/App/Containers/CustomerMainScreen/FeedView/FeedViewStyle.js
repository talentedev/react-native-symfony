import {StyleSheet} from 'react-native'
import {Fonts, Colors, ApplicationStyles, Metrics} from 'App/Theme'

export default StyleSheet.create({
  bannerContainer: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.applyRatio(10),
    padding: Metrics.applyRatio(20),
    paddingLeft: Metrics.applyRatio(10),
    margin: Metrics.applyRatio(20),
    flexDirection: 'row',
  },
  bannerTitle: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.medium,
  },
  bannerTxt: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
  },
  bannerTxtContainter: {
    flex: 1,
    paddingLeft: Metrics.applyRatio(10),
  },
  boldTxt: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.small,
  },
  border: {backgroundColor: Colors.grey, height: 1, width: '100%'},
  centerView: {alignSelf: 'center', flex: 1, justifyContent: 'center'},
  container: {
    ...ApplicationStyles.screen.container,
    backgroundColor: Colors.greyBackground,
  },
  emptyScreen: {alignItems: 'center', flex: 1, justifyContent: 'center'},
  emptyText: {
    color: Colors.grey1,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.medium,
    marginTop: Metrics.applyRatio(30),
    textAlign: 'center',
  },
  error: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
  },
  instructions: {
    ...Fonts.style.normal,
    fontStyle: 'italic',
    marginBottom: 5,
    textAlign: 'center',
  },
  listViewContainer: {
    backgroundColor: Colors.greyBackground,
    flex: 1,
  },
  loading: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
  },
  logo: {
    height: '100%',
    width: '100%',
  },
  logoContainer: {
    height: 300,
    marginBottom: 25,
    width: '100%',
  },
  offerText: {color: Colors.red, textAlign: 'right'},
  result: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
  },
  text: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
  },
  title: {
    ...Fonts.style.h2,
    marginBottom: 10,
    textAlign: 'center',
  },
  userIcon: {
    height: Metrics.applyRatio(50),
    width: Metrics.applyRatio(50),
  },
})
