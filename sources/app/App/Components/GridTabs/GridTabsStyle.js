import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics} from 'App/Theme'

export default StyleSheet.create({
  categoryItemImg: {
    maxHeight: Metrics.applyRatio(50),
    maxWidth: Metrics.applyRatio(50),
    minHeight: Metrics.applyRatio(31),
    minWidth: Metrics.applyRatio(31),
    resizeMode: 'contain',
  },
  categoryItemImgContainer: {
    alignItems: 'center',
    borderRadius: Metrics.applyRatio(15),
    height: Metrics.applyRatio(44),
    justifyContent: 'center',
    marginLeft: Metrics.applyRatio(12),
    marginRight: Metrics.applyRatio(12),
    width: Metrics.applyRatio(44),
  },
  categoryItemImgRowContainer: {
    alignItems: 'center',
    borderRadius: Metrics.applyRatio(10.5),
    flexDirection: 'row',
    height: Metrics.applyRatio(31),
    justifyContent: 'center',
    marginLeft: Metrics.applyRatio(12),
    marginRight: Metrics.applyRatio(12),
    paddingHorizontal: Metrics.applyRatio(15),
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
    marginTop: Metrics.applyRatio(4),
    // flex: 1,
  },
  categoryRowItemImg: {
    marginRight: Metrics.applyRatio(5),
    maxHeight: Metrics.applyRatio(40),
    maxWidth: Metrics.applyRatio(40),
    minHeight: Metrics.applyRatio(25),
    minWidth: Metrics.applyRatio(25),
    resizeMode: 'contain',
  },
  selectedCatItemGreenTxt: {
    color: Colors.white,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.small,
    marginVertical: Metrics.applyRatio(7.5),
    textAlign: 'center',
    textTransform: 'uppercase',
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
