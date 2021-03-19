import {StyleSheet} from 'react-native'
import {Colors} from 'App/Theme'
import Metrics from 'App/Theme/Metrics'
import ApplicationStyles from 'App/Theme/ApplicationStyles'
import Fonts from 'App/Theme/Fonts'

export default StyleSheet.create({
  addLocationTitle: {
    color: Colors.black2,
    fontSize: Fonts.size.big,
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
