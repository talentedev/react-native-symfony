import {StyleSheet} from 'react-native'

import ApplicationStyles from 'App/Theme/ApplicationStyles'
import {Metrics, Fonts, Colors} from 'App/Theme'

export default StyleSheet.create({
  inputAndroid: {
    ...ApplicationStyles.inputStyle,
    ...Fonts.style.dropDownText,
    backgroundColor: Colors.transparent,
    borderRadius: Metrics.applyRatio(20),
    color: Colors.grey2,
    height: Metrics.applyRatio(45),
    marginBottom: 0,
    marginTop: 0,
    paddingLeft: Metrics.applyRatio(10),
    paddingRight: Metrics.applyRatio(25),
    width: Metrics.applyRatio(305),
  },
  inputIOS: {
    ...ApplicationStyles.inputStyle,
    ...Fonts.style.dropDownText,
    backgroundColor: Colors.transparent,
    borderRadius: Metrics.applyRatio(20),
    color: Colors.grey2,
    height: Metrics.applyRatio(45),
    marginBottom: 0,
    marginTop: 0,
    paddingLeft: Metrics.applyRatio(10),
    paddingRight: Metrics.applyRatio(25),
    width: Metrics.applyRatio(305),
  },
  modalViewBottom: {
    backgroundColor: Colors.white,
  },
})
