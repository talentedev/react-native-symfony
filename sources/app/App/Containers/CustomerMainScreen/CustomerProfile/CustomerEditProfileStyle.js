import {Platform, StyleSheet} from 'react-native'
import {Fonts, Colors} from 'App/Theme'
import Metrics from 'App/Theme/Metrics'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  btnBottomView: {
    alignContent: 'flex-end',
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
    paddingBottom: Metrics.applyRatio(10),
    width: Metrics.DEVICE_WIDTH,
  },
  buttonContainer: {
    ...ApplicationStyles.buttonContainer,
    marginTop: Metrics.applyRatio(30),
  },
  buttonTextStyle: {
    ...ApplicationStyles.textButton,
    fontSize: Fonts.size.bigMedium,
  },
  clickableText: {
    ...Fonts.style.clickableText,
  },
  container: {
    ...ApplicationStyles.screen.container,
    alignItems: 'center',
  },
  datePickerCustom: {
    alignItems: 'flex-start',
    borderWidth: 0,
    textAlign: 'left',
  },
  deactivateButtonContainer: {
    ...ApplicationStyles.buttonContainer,
    backgroundColor: Colors.lightBlueGrey,
    marginVertical: Metrics.applyRatio(10),
    opacity: 0.6,
  },
  inputStyle: {
    ...ApplicationStyles.inputStyle,
    marginBottom: Metrics.applyRatio(32),
  },
  nameSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pencilImage: {
    marginLeft: Metrics.applyRatio(52),
    marginTop: Metrics.applyRatio(-56),
  },
  placeHolder: {
    ...Fonts.style.subSectionTitle,
    color: Colors.grey1,
    marginBottom: Metrics.applyRatio(-15),
    marginLeft: Metrics.applyRatio(20),
    zIndex: 3,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: Metrics.applyRatio(32),
  },
  profileImage: {
    alignSelf: 'center',
    borderRadius: Metrics.applyRatio(39),
    height: Metrics.applyRatio(78),
    margin: Metrics.applyRatio(27),
    width: Metrics.applyRatio(78),
  },
  shortInputStyle: {
    ...ApplicationStyles.inputStyle,
    marginBottom: Metrics.applyRatio(32),
    width: Metrics.applyRatio(148),
  },
  validationText: {
    ...ApplicationStyles.validationText,
  },
  viewAmount: {
    flex: Platform.OS === 'ios' ? 0 : 1,
    marginLeft: Metrics.applyRatio(30),
    marginRight: Metrics.applyRatio(30),
  },
})
