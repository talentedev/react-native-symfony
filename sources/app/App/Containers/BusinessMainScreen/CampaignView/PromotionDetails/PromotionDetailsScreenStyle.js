import {StyleSheet} from 'react-native'
import ApplicationStyles from 'App/Theme/ApplicationStyles'
import {Metrics, Colors, Fonts} from 'App/Theme'

export default StyleSheet.create({
  boldTxt: {
    fontFamily: Fonts.fonts.PoppinsBold,
  },
  centerTxt: {
    textAlign: 'center',
  },
  container: {
    ...ApplicationStyles.screen.container,
  },
  contentContainer: {
    padding: Metrics.applyRatio(20),
  },

  descTxt: {
    color: Colors.coolGrey,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    marginTop: Metrics.applyRatio(10),
  },
  greyBgContainer: {
    backgroundColor: Colors.paleGrey3,
    borderRadius: Metrics.applyRatio(18),
    marginTop: Metrics.applyRatio(20),
    padding: Metrics.applyRatio(16),
    paddingRight: Metrics.applyRatio(15),
  },
  locationListItem: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  priceTxt: {
    color: Colors.coolGrey,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.small,
  },
  pricingTxt: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.fonts.small,
  },
  promoImg: {
    height: Metrics.applyRatio(53),
    marginTop: Metrics.applyRatio(20),
    width: Metrics.applyRatio(94),
  },
  referralCatDesc: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
  },
  referralCatListItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Metrics.applyRatio(10),
  },

  referralCatTitle: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.h2inter,
    lineHeight: Metrics.applyRatio(56),
    textAlign: 'center',
  },
  referralCatTxtContent: {
    paddingLeft: Metrics.applyRatio(20),
    width: Metrics.applyRatio(207),
  },
  referralFeeTxt: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsMedium,
    fontSize: Fonts.size.xsmall,
  },
  referralPercentContent: {
    backgroundColor: Colors.paleGrey2,
    borderRadius: Metrics.applyRatio(18),
    padding: Metrics.applyRatio(10),
    width: Metrics.applyRatio(88),
  },
  rightTxt: {
    textAlign: 'right',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Metrics.applyRatio(265.5),
  },
  sectionContainer: {
    alignItems: 'center',
    borderColor: Colors.lightBlueGrey,
    borderRadius: Metrics.applyRatio(20),
    borderWidth: Metrics.applyRatio(1),
    marginBottom: Metrics.applyRatio(30),
    padding: Metrics.applyRatio(18),
  },
  sectionTitle: {
    ...Fonts.style.startPromotion,
    color: Colors.greyishBrown,
    fontSize: Fonts.size.biggMedium,
  },
  subTitle: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsMedium,
    fontSize: Fonts.size.Medium,
    marginTop: Metrics.applyRatio(10),
  },
})
