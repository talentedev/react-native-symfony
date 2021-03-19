import ApplicationStyles from 'App/Theme/ApplicationStyles'
import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics} from 'App/Theme'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    backgroundColor: Colors.greyBackground,
  },
  descriptionStyle: {
    ...Fonts.style.subSectionTitle,
    color: Colors.black,
  },
  emptyScreen: {
    alignItems: 'center',
    height: Metrics.applyRatio(300),
    justifyContent: 'center',
  },
  nameStyle: {
    ...Fonts.style.title,
    marginTop: Metrics.applyRatio(20),
  },
  navigationTxt: {
    color: Colors.grey4,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.medium,
  },
  noRefer: {...Fonts.style.dropDownText, color: Colors.grey4, textAlign: 'center'},
  offerIcon: {
    height: Metrics.applyRatio(18),
    marginRight: Metrics.applyRatio(5),
    width: Metrics.applyRatio(18),
  },
  profileImageContainer: {
    borderRadius: Metrics.applyRatio(39),
    height: Metrics.applyRatio(78),
    width: Metrics.applyRatio(78),
  },
  profileImgContainer: {
    alignSelf: 'center',
    borderRadius: Metrics.applyRatio(39),
    elevation: 10,
    height: Metrics.applyRatio(78),
    shadowColor: Colors.greyBackground,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    width: Metrics.applyRatio(78),
  },
  profileSection: {
    alignItems: 'center',
    height: Metrics.applyRatio(182),
    marginLeft: Metrics.applyRatio(42),
    width: Metrics.applyRatio(291),
  },
  referral: {
    color: Colors.white,
    fontSize: Fonts.size.small,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  referralContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.black,
    borderRadius: Metrics.applyRatio(19.5),
    height: Metrics.applyRatio(30),
    justifyContent: 'center',
    marginTop: -Metrics.applyRatio(30) / 2,
    paddingHorizontal: Metrics.applyRatio(20),
  },
  textBeforePost: {
    ...Fonts.style.subSectionTitle,
    color: Colors.grey4,
    textAlign: 'center',
  },
  textWithIcon: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Metrics.applyRatio(20),
  },
  topBar: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: Metrics.applyRatio(23),
    borderBottomRightRadius: Metrics.applyRatio(23),
    borderWidth: 0,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  touchableOpacity: {
    alignItems: 'flex-start',
    marginLeft: Metrics.applyRatio(-40),
    padding: Metrics.applyRatio(20),
  },
})
