import {StyleSheet} from 'react-native'
import Metrics from 'App/Theme/Metrics'
import Fonts from 'App/Theme/Fonts'
import Colors from 'App/Theme/Colors'

export default StyleSheet.create({
  categoryItemImg: {
    maxHeight: Metrics.applyRatio(51),
    maxWidth: Metrics.applyRatio(51),
    minHeight: Metrics.applyRatio(31),
    minWidth: Metrics.applyRatio(31),
    resizeMode: 'contain',
  },
  categoryItemImgContainer: {
    alignItems: 'center',
    borderRadius: Metrics.applyRatio(20),
    height: Metrics.applyRatio(69),
    justifyContent: 'center',
    width: Metrics.applyRatio(69),
  },
  categoryItemTxt: {
    color: Colors.grey1,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
    marginVertical: Metrics.applyRatio(7.5),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  categoryListItem: {
    // margin: Metrics.GUTTER_WIDTH,
    alignItems: 'center',
    flex: 1,
    marginVertical: Metrics.applyRatio(10),
  },
  selectedCatItemTxt: {
    color: Colors.selected,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.small,
    marginVertical: Metrics.applyRatio(7.5),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
})
