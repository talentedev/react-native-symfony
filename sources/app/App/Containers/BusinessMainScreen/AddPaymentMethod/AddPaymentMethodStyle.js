import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics} from 'App/Theme'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  boldText: {
    color: Colors.blueyGrey,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.medium,
    // fontWeight: '900',
  },
  cardDetailText: {
    color: Colors.blueyGrey,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    marginTop: Metrics.GUTTER_WIDTH,
    textAlign: 'center',
  },
  cardImg: {
    alignSelf: 'center',
    height: Metrics.applyRatio(22),
    margin: Metrics.GUTTER_WIDTH,
    width: Metrics.applyRatio(54),
  },
  cardImgContent: {
    alignSelf: 'center',
    height: Metrics.applyRatio(65),
    justifyContent: 'center',
  },
  cardInputItem: {
    backgroundColor: Colors.greyBackground,
    borderRadius: Metrics.applyRatio(17),
    color: Colors.black,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.bigMedium,
    height: Metrics.applyRatio(55),
    margin: Metrics.applyRatio(5),
    textAlign: 'center',
    width: Metrics.applyRatio(68),
  },
  cardNumContent: {
    flexDirection: 'row',
  },
  container: {
    ...ApplicationStyles.screen.container,
  },
  contentContainer: {
    ...ApplicationStyles.screen.container,
    alignItems: 'center',
    flex: 5,
    padding: Metrics.GUTTER_WIDTH,
  },
  headerText: {
    alignItems: 'center',
    alignSelf: 'center',
    color: Colors.blueyGrey,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.medium,
    justifyContent: 'center',
    paddingBottom: Metrics.applyRatio(20),
    paddingTop: Metrics.GUTTER_WIDTH,
    textAlign: 'center',
    width: Metrics.applyRatio(270),
  },
  headerTextContainer: {
    ...ApplicationStyles.screen.container,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  inputHeader: {
    color: Colors.blueyGrey,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
  },
  nextContainer: {
    ...ApplicationStyles.screen.container,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: Metrics.applyRatio(20),
  },
  validationButton: {
    ...ApplicationStyles.buttonContainer,
    marginBottom: Metrics.applyRatio(10),
  },
  validationInactiveButton: {
    ...ApplicationStyles.buttonContainer,
    marginBottom: Metrics.applyRatio(10),
    opacity: 0.5,
  },
  validationText: {
    ...ApplicationStyles.textButton,
    fontSize: Fonts.size.bigMedium,
  },
})
