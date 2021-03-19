import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics} from 'App/Theme'

export default StyleSheet.create({
  backButton: {
    color: Colors.blueyGrey,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: 14,
    // fontWeight: 'bold',
  },
  backButtonContainer: {
    marginHorizontal: Metrics.applyRatio(20),
    marginVertical: Metrics.applyRatio(20),
  },
  centerView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  messageText: {
    color: Colors.blueyGrey,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: 12,
    marginLeft: Metrics.applyRatio(82),
    marginRight: Metrics.applyRatio(82),
    marginTop: Metrics.applyRatio(49),
    textAlign: 'center',
  },
  unDrawImageStyle: {
    height: Metrics.applyRatio(236),
    marginLeft: Metrics.applyRatio(16),
    marginRight: Metrics.applyRatio(16),
  },
})
