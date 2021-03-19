import {StyleSheet} from 'react-native'
import Metrics from 'App/Theme/Metrics'
import Fonts from 'App/Theme/Fonts'
import Colors from 'App/Theme/Colors'

import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  addLocationTitle: {
    color: Colors.black2,
    fontSize: Fonts.size.big,
  },
  addNewLocationText: {
    ...Fonts.style.clickableTextBold,
    color: Colors.blueyGrey,
    fontFamily: Fonts.fonts.PoppinsBold,
    height: Metrics.applyRatio(20),
    marginLeft: Metrics.applyRatio(10),
    // width: Metrics.applyRatio(130),
  },
  addNewLocationView: {alignSelf: 'center', height: '25%', marginTop: Metrics.applyRatio(10)},
  addressList: {alignItems: 'center', marginTop: Metrics.applyRatio(30)},
  addressView: {alignItems: 'center', marginTop: Metrics.applyRatio(10)},
  buttonContainer: {
    ...ApplicationStyles.buttonContainer,
    marginBottom: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(10),
  },
  buttonTextStyle: {
    ...ApplicationStyles.buttonTitle,
  },
  captionMargin: {marginTop: Metrics.applyRatio(0), ...Fonts.style.dropDownText},
  center: {
    alignSelf: 'center',
  },
  container: {
    ...ApplicationStyles.screen.container,
  },
  dropDownView: {alignItems: 'center', marginTop: Metrics.applyRatio(30)},
  end: {alignItems: 'flex-end', flexDirection: 'row'},
  fMandarinOrient: {
    ...Fonts.style.addressDes,
    marginTop: Metrics.applyRatio(5),
    width: Metrics.applyRatio(247),
  },
  flatList: {height: '75%'},
  flatMainView: {marginLeft: Metrics.applyRatio(10)},
  imgLeft: {
    marginLeft: Metrics.applyRatio(15),
  },
  inactiveButton: {
    backgroundColor: Colors.lightBlueGrey,
    opacity: 0.6,
  },
  inputStyle: {
    ...ApplicationStyles.inputStyle,
  },
  line: {
    borderColor: Colors.captionBorder,
    borderStyle: 'solid',
    borderWidth: Metrics.applyRatio(0.5),
    height: Metrics.applyRatio(1),
    marginTop: Metrics.applyRatio(9),
    width: Metrics.applyRatio(315),
  },
  listButtonIcon: {
    ...ApplicationStyles.locationBoxSecondStyle,
  },
  locationSelectItem: {
    color: Colors.grey2,
    height: Metrics.applyRatio(55),
    width: Metrics.applyRatio(305),
  },
  locationValue: {
    color: Colors.grey2,
    fontSize: Fonts.size.bigMedium,
    paddingLeft: Metrics.applyRatio(10),
  },
  mapIconCenter: {
    alignSelf: 'center',
    maxHeight: Metrics.applyRatio(20),
    maxWidth: Metrics.applyRatio(20),
    minHeight: Metrics.applyRatio(15),
    minWidth: Metrics.applyRatio(15),
    resizeMode: 'contain',
  },
  mapPinStyle: {
    maxHeight: Metrics.applyRatio(20),
    maxWidth: Metrics.applyRatio(20),
    minHeight: Metrics.applyRatio(15),
    minWidth: Metrics.applyRatio(15),
    resizeMode: 'contain',
  },
  modalBack: {marginTop: Metrics.applyRatio(20)},
  modalBackInner: {
    backgroundColor: Colors.modalBack,
    borderRadius: 2.5,
    height: Metrics.applyRatio(5),
    width: Metrics.applyRatio(30),
  },
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
  modalMainView: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Metrics.applyRatio(20),
    bottom: 0,
    height: Metrics.applyRatio(409),
    marginBottom: Metrics.applyRatio(1),
    position: 'absolute',
    width: '100%',
  },
  modalTopDash: {
    backgroundColor: Colors.modalBack,
    borderRadius: Metrics.applyRatio(2.5),
    height: Metrics.applyRatio(5),
    width: Metrics.applyRatio(30),
  },
  modalViewMain: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.blackShadeOpacity2,
  },
  noRecImg: {height: Metrics.applyRatio(183), width: Metrics.applyRatio(300)},
  noRecInnerView: {alignSelf: 'center', flex: 1, justifyContent: 'center'},
  noRecText: {
    ...Fonts.style.subSectionTitle,
    alignSelf: 'center',
    marginTop: Metrics.applyRatio(50),
    textAlign: 'center',
    width: Metrics.applyRatio(214),
  },
  pickerIcon: {
    backgroundColor: Colors.transparent,
    borderLeftColor: Colors.transparent,
    borderLeftWidth: Metrics.applyRatio(7),
    borderRightColor: Colors.transparent,
    borderRightWidth: Metrics.applyRatio(7),
    borderTopColor: Colors.blueyGrey,
    borderTopWidth: Metrics.applyRatio(7),
    height: Metrics.applyRatio(0),
    width: Metrics.applyRatio(0),
  },
  pickerSelect: {
    color: Colors.blueyGrey,
    fontSize: Fonts.size.small,
    paddingHorizontal: Metrics.applyRatio(20),
    paddingVertical: Metrics.applyRatio(19),
  },
  renderView: {
    alignSelf: 'flex-start',
    flexDirection: 'column',
    marginTop: Metrics.applyRatio(10),
  },
  sectionTitle: {
    ...Fonts.style.greyInfoUpperCase,
    alignSelf: 'flex-start',
    marginLeft: Metrics.applyRatio(10),
  },
  shape: {
    alignSelf: 'flex-end',
    height: Metrics.applyRatio(8),
    marginLeft: Metrics.applyRatio(20),
    width: Metrics.applyRatio(8),
  },
  subCaptionText: {
    ...Fonts.style.subSectionTitle,
  },
  title: {
    ...Fonts.style.title,
    fontFamily: Fonts.fonts.PoppinsBold,
    marginTop: Metrics.applyRatio(20),
  },
  titleContainer: {
    marginBottom: Metrics.applyRatio(38),
    marginTop: Metrics.applyRatio(20),
  },
  validationButton: {
    ...ApplicationStyles.buttonContainer,
    borderColor: Colors.transparent,
  },
  validationText: {
    ...ApplicationStyles.textButton,
  },
})
