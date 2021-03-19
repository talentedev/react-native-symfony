import {StyleSheet} from 'react-native'
import Colors from 'App/Theme/Colors'
import Metrics from 'App/Theme/Metrics'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  approveIcon: {
    height: Metrics.applyRatio(12),
    marginRight: Metrics.applyRatio(7),
    width: Metrics.applyRatio(16),
  },
  approveTxt: {
    color: Colors.grey4,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.medium,
    marginBottom: Metrics.applyRatio(10),
  },
  bottomContainer: {
    alignItems: 'center',
    flex: 4,
    justifyContent: 'center',
  },
  buttonContainer: {
    ...ApplicationStyles.buttonContainer,
    marginVertical: Metrics.applyRatio(10),
  },
  checkoutList: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: Metrics.applyRatio(30),
  },
  container: {
    ...ApplicationStyles.screen.container,
  },
  containerIem: {
    alignItems: 'center',
    width: Metrics.applyRatio(325),
  },
  contentContainer: {
    alignItems: 'flex-end',
    backgroundColor: Colors.white,
    flex: 5,
    justifyContent: 'center',
  },
  dateTxt: {
    color: Colors.coolGrey,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    marginBottom: Metrics.applyRatio(20),
  },
  flexOneText: {
    color: Colors.coolGrey,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.medium,
  },
  flexStartContainer: {
    alignItems: 'flex-start',
  },
  flexendContainer: {
    justifyContent: 'flex-end',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Metrics.applyRatio(30),
    marginTop: Metrics.applyRatio(20),
  },
  hkdMediumTxt: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsMedium,
    fontSize: Fonts.size.bigMedium,
  },
  hkdTxt: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.medium,
  },
  iconApproveTxt: {
    color: Colors.softGreen,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.bigMedium,
  },
  iconRejectTxt: {
    color: Colors.pastelRed,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.bigMedium,
  },
  leftTxtContainer: {
    width: Metrics.applyRatio(200),
  },
  listItemBoldTitle: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.bigMedium,
    marginTop: Metrics.applyRatio(30),
  },
  listItemButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: Metrics.applyRatio(20),
  },
  listItemButtonTxtContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: Metrics.applyRatio(20),
  },
  listItemContent: {
    flexDirection: 'row',
    marginBottom: Metrics.applyRatio(8.5),
  },
  listItemDesc: {
    color: Colors.darkGrey,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    width: Metrics.applyRatio(100),
  },
  listItemStyle: {},
  listItemTitle: {
    color: Colors.darkGrey,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.bigMedium,
    marginBottom: Metrics.applyRatio(8),
    marginTop: Metrics.applyRatio(21.5),
  },
  listSeperatorItemStyle: {
    borderBottomColor: Colors.greyDivider,
    borderBottomWidth: Metrics.applyRatio(1),
  },
  moreBtn: {
    color: Colors.brightBlue,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.small,
  },
  proofListImg: {
    borderColor: Colors.lightBlueGrey,
    borderRadius: Metrics.applyRatio(2),
    height: Metrics.applyRatio(68),
    marginRight: Metrics.applyRatio(20),
    width: Metrics.applyRatio(68),
  },
  proofVImg: {
    height: Metrics.applyRatio(284),
    width: Metrics.applyRatio(238),
  },
  rejectIcon: {
    height: Metrics.applyRatio(13),
    marginRight: Metrics.applyRatio(7),
    width: Metrics.applyRatio(13),
  },
  scrollContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  separatorStyle: {
    alignSelf: 'center',
    backgroundColor: Colors.greyDivider,
    height: Metrics.applyRatio(1),
    width: Metrics.applyRatio(337),
  },
  subTitleStyle: {
    ...Fonts.style.subSectionTitle,
    color: Colors.coolGrey,
    fontSize: Fonts.size.bigMedium,
    marginBottom: Metrics.applyRatio(29),
    marginHorizontal: Metrics.applyRatio(14),
    marginTop: Metrics.applyRatio(5),
    textAlign: 'center',
  },
  titleTextStyle: {
    ...Fonts.style.title,
    color: Colors.greyishBrown,
    textAlign: 'center',
    width: Metrics.applyRatio(296),
  },
  txtSubTitle: {
    color: Colors.darkGrey,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.medium,
  },
  validateIcon: {
    height: Metrics.applyRatio(37),
    width: Metrics.applyRatio(37),
  },
})
