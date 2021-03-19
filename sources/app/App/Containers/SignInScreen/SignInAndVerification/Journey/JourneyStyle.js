import {StyleSheet, Platform, Dimensions} from 'react-native'
import Metrics from 'App/Theme/Metrics'
import Fonts from 'App/Theme/Fonts'
import Colors from 'App/Theme/Colors'
import {ApplicationStyles} from 'App/Theme'

export default StyleSheet.create({
  businessImg: {
    flex: 1,
    height: Metrics.applyRatio(330),
    marginTop: Metrics.applyRatio(49),
    width: Metrics.applyRatio(188),
  },
  buttonContainer: {
    ...ApplicationStyles.buttonContainer,
    marginBottom: Metrics.applyRatio(31),
    marginTop: Metrics.applyRatio(45),
    // width: Metrics.SQUARE_WIDTH * 8 + Metrics.GUTTER_WIDTH * 7,
  },
  buttonImageStyleFirst: {
    alignItems: 'center',
    backgroundColor: Colors.btnBack,
    borderRadius: Metrics.applyRatio(23),
    flexDirection: 'row',
    height: Metrics.applyRatio(46),
    justifyContent: 'center',
    width: Metrics.applyRatio(298),
  },
  buttonImageStyleLast: {
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderRadius: Metrics.applyRatio(23),
    flexDirection: 'row',
    height: Metrics.applyRatio(46),
    justifyContent: 'center',
    marginTop: Metrics.applyRatio(20),
    width: Metrics.applyRatio(298),
  },
  buttonTextStyle: {
    ...ApplicationStyles.textButton,
  },
  centerView: {alignItems: 'center'},
  continueManually: {
    marginBottom: Metrics.applyRatio(10),
    marginTop: Metrics.applyRatio(20),
  },
  customSliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop:
      Platform.OS === 'ios'
        ? Dimensions.get('screen').height > 736
          ? Metrics.applyRatio(24)
          : Metrics.applyRatio(10)
        : Metrics.applyRatio(10),
    paddingBottom: Metrics.applyRatio(20),
    paddingTop: Metrics.applyRatio(20),
  },
  customSliderStyle: {
    height: 2,
    width: Metrics.applyRatio(37.5),
  },
  deactivateButtonContainer: {
    ...ApplicationStyles.buttonContainer,
    backgroundColor: Colors.lightBlueGrey,
    marginBottom: Metrics.applyRatio(31),
    marginTop: Metrics.applyRatio(45),
    opacity: 0.5,
  },
  facebook: {
    fontFamily: Fonts.fonts.PoppinsBold,
  },
  fontButton: {
    ...Fonts.style.messageBold,
    color: Colors.white,
    textAlign: 'center',
  },
  imageStyle: {
    height: Metrics.applyRatio(17),
    left: Metrics.applyRatio(30),
    position: 'absolute',
    width: Metrics.applyRatio(10),
  },
  inactiveSlider: {
    backgroundColor: Colors.greyBackground,
    flex: 1,
    height: 2,
  },
  innerTxt: {
    ...Fonts.style.greyInfo,
  },
  innerView: {
    flex: 1,
  },
  mainContain: {
    flex: 1,
  },
  mainTxt: {
    ...Fonts.style.title,
    marginTop: Metrics.applyRatio(10),
    textAlign: 'center',
    width: Metrics.applyRatio(212),
  },
  middalView: {flex: 1, flexDirection: 'row'},
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderTopLeftRadius: Metrics.applyRatio(25),
    borderTopRightRadius: Metrics.applyRatio(25),
    padding: Metrics.applyRatio(25),
  },
  modalListItem: {
    backgroundColor: Colors.greyBackground,
    borderRadius: Metrics.applyRatio(20),
    height: Metrics.applyRatio(55),
    justifyContent: 'center',
    marginBottom: Metrics.applyRatio(40),
    padding: Metrics.applyRatio(5),
    textAlign: 'left',
    width: Metrics.applyRatio(315),
  },
  modalTopDash: {
    backgroundColor: Colors.grey1,
    borderRadius: Metrics.applyRatio(12),
    height: Metrics.applyRatio(5),
    width: Metrics.applyRatio(30),
  },
  pickView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: Metrics.applyRatio(50),
    marginVertical: 10,
  },
  regestrationMethodText: {
    color: Colors.greyishBrown70,
    fontFamily: Fonts.fonts.PoppinsMedium,
    fontSize: Fonts.size.h5,
    marginBottom: Metrics.applyRatio(10),
    marginTop: Metrics.applyRatio(8),
    textAlign: 'center',
  },
  selectionType: {
    height: Metrics.applyRatio(120),
    resizeMode: 'contain',
  },
  shopperImg: {
    flex: 1,
    height: Metrics.applyRatio(330),
    marginTop: Metrics.applyRatio(49),
    width: Metrics.applyRatio(188),
  },
  trackStyle: {height: 2},
  txtStyleOff: {
    ...Fonts.style.titleReguler,
    alignSelf: 'center',
    marginTop: Metrics.applyRatio(35),
  },
  txtStyleOn: {...Fonts.style.title, alignSelf: 'center', marginTop: Metrics.applyRatio(35)},
  useFacebookText: {
    color: Colors.coolGrey138,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.medium,
    marginBottom: Metrics.applyRatio(30),
    textAlign: 'center',
  },
  verifyStyle: {color: Colors.black1, fontSize: Fonts.size.h4},
})
