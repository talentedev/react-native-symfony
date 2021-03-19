import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics} from 'App/Theme'

const subCategoryItemDefault = {
  alignItems: 'center',
  alignSelf: 'center',
  fontSize: 14,
  justifyContent: 'center',
  letterSpacing: 0.13,
  marginBottom: Metrics.applyRatio(5),
  marginTop: Metrics.applyRatio(5),
  minWidth: Metrics.applyRatio(120),
  textAlign: 'center',
  textAlignVertical: 'center',
}

export default StyleSheet.create({
  subCategoryItem: {
    ...subCategoryItemDefault,
    borderColor: Colors.transparent,
    color: Colors.blueyGrey,
  },
  subCategoryItemSelected: {
    ...subCategoryItemDefault,
    borderRadius: Metrics.applyRatio(14),
    color: Colors.white,
    // height: Metrics.applyRatio(28),
    height: 'auto',
    width: Metrics.applyRatio(162),
  },
  subCategorySelect: {
    color: Colors.black3,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: 16,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  subCategoryTitle: {
    color: Colors.black,
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
})
