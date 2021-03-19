import {StyleSheet} from 'react-native'
import {Colors, Metrics, Fonts} from 'App/Theme'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  phoneNoView: {
    // borderColor: Colors.white,
    backgroundColor: Colors.transparent,
    borderColor: Colors.white,
    borderRadius: Metrics.applyRatio(17),
    borderWidth: Metrics.applyRatio(2),
    color: Colors.white,
    marginLeft: Metrics.applyRatio(32),
    marginRight: Metrics.applyRatio(28),
    paddingHorizontal: Metrics.applyRatio(16),
    width: '85%',
  },

  textStyle: {
    color: Colors.white,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.bigMedium,
    height: Metrics.applyRatio(55),
    marginTop: Metrics.applyRatio(2),
  },
})
