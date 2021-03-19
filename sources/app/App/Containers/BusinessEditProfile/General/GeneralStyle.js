import {StyleSheet} from 'react-native'
import Metrics from 'App/Theme/Metrics'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'
import Colors from 'App/Theme/Colors'

export default StyleSheet.create({
  bottomButton: {
    marginBottom: Metrics.applyRatio(25),
    marginTop: Metrics.applyRatio(50),
  },
  buttonContainer: {
    ...ApplicationStyles.buttonContainer,
    borderColor: Colors.transparent,
    marginBottom: Metrics.applyRatio(26),
    marginTop: Metrics.applyRatio(46),
  },
  buttonTextStyle: {
    ...Fonts.style.buttonTitle,
    height: Metrics.applyRatio(23),
  },
  centerView: {alignItems: 'center', marginTop: Metrics.applyRatio(34)},
  clickableContainer: {
    ...ApplicationStyles.clickableTextContainer,
    marginBottom: Metrics.applyRatio(10),
  },
  clickableTextStyle: {
    ...ApplicationStyles.clickableText,
  },
  container: {
    ...ApplicationStyles.screen.container,
    alignItems: 'center',
  },
  desc: {
    ...ApplicationStyles.inputStyle,
    height: Metrics.applyRatio(101),
    marginBottom: Metrics.applyRatio(22),
    marginTop: Metrics.applyRatio(15),
    textAlignVertical: 'top',
  },
  editView: {
    alignItems: 'center',
    bottom: -Metrics.applyRatio(10),
    height: Metrics.applyRatio(29),
    justifyContent: 'center',
    marginLeft: Metrics.applyRatio(50),
    opacity: 0.91,
    position: 'absolute',
    right: -Metrics.applyRatio(10),
    width: Metrics.applyRatio(29),
  },
  highInputStyle: {
    ...ApplicationStyles.inputStyle,
    height: Metrics.applyRatio(94),
    marginBottom: Metrics.applyRatio(22),
    marginTop: Metrics.applyRatio(10),
    paddingVertical: Metrics.applyRatio(10),
  },
  highTextView: {height: Metrics.applyRatio(70)},
  inputStyle: {
    ...ApplicationStyles.inputStyle,
    height: Metrics.applyRatio(55),
    marginBottom: Metrics.applyRatio(22),
    marginTop: Metrics.applyRatio(10),
  },
  largeInputStyle: {
    ...ApplicationStyles.inputStyle,
    height: Metrics.GUTTER_WIDTH * 13,
    textAlignVertical: 'top',
  },
  pencilIcon: {
    maxHeight: Metrics.applyRatio(30),
    maxWidth: Metrics.applyRatio(30),
    minHeight: Metrics.applyRatio(15),
    minWidth: Metrics.applyRatio(15),
    resizeMode: 'contain',
  },
  profileImage: {
    borderRadius: Metrics.applyRatio(28),
    height: Metrics.applyRatio(72),
    width: Metrics.applyRatio(72),
  },
  profileView: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Metrics.applyRatio(28),
    flex: 1,
    height: Metrics.applyRatio(72),
    justifyContent: 'center',
    marginBottom: Metrics.applyRatio(20),
    width: Metrics.applyRatio(72),
  },
  saveBtn: {
    margin: Metrics.GUTTER_WIDTH * 1,
  },
  sectionTitle: {
    ...Fonts.style.greyInfoUpperCase,
    paddingLeft: Metrics.applyRatio(20),
    position: 'absolute',
    textAlign: 'left',
    top: Metrics.applyRatio(1.5),
  },
  subCategory: {
    ...ApplicationStyles.inputStyle,
    height: Metrics.applyRatio(101),
    marginBottom: Metrics.applyRatio(22),
    marginTop: Metrics.applyRatio(10),
    paddingTop: Metrics.applyRatio(15),
    textAlignVertical: 'top',
  },
  tabTextStyle: {
    fontSize: Fonts.size.regular,
    textAlign: 'center',
  },
  textView: {height: Metrics.applyRatio(85)},
  unEditableInputStyle: {
    backgroundColor: Colors.greyInput,
    borderRadius: Metrics.applyRatio(17),
    height: Metrics.applyRatio(55),
    justifyContent: 'center',
    marginBottom: Metrics.applyRatio(22),
    marginTop: Metrics.applyRatio(10),
    width: Metrics.applyRatio(333),
  },
  unEditableTextStyle: {
    ...Fonts.style.textInput,
    color: Colors.blueyGrey,
  },
  validationButton: {
    ...ApplicationStyles.validationButton,
  },
  validationText: {
    ...ApplicationStyles.validationText,
  },
})
