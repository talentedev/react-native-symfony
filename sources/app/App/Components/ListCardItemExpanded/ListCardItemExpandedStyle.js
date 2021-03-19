import {StyleSheet} from 'react-native'
import Colors from 'App/Theme/Colors'
import Metrics from 'App/Theme/Metrics'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  captionSubTxt: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsMedium,
    fontSize: Fonts.size.medium,
  },
  flexOne: {flex: 1},
  listBottomSection: {marginBottom: Metrics.applyRatio(10)},
  listBottomSectionText: {
    color: Colors.grey4,
    fontFamily: Fonts.fonts.PoppinsMedium,
    fontSize: Fonts.size.small,
  },
  listButtonIcon: {
    ...ApplicationStyles.locationBoxFirstStyle,
  },
  listImgWrapper: {borderRadius: Metrics.applyRatio(10), marginRight: Metrics.applyRatio(10)},
  listItemButtonList: {flexDirection: 'row', flexWrap: 'wrap'},
  listTopSection: {alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'},
  listTopSectionIcon: {height: Metrics.applyRatio(15), width: Metrics.applyRatio(15)},
  listTopSectionText: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.biggMedium,
    lineHeight: Metrics.applyRatio(25),
    maxWidth: Metrics.applyRatio(214),
  },
  listViewItem: {
    borderRadius: Metrics.applyRatio(20),
    marginHorizontal: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(20),
    width: Metrics.applyRatio(335),
  },
  moreIcon: {
    alignItems: 'flex-end',
    height: Metrics.applyRatio(20),
    margin: 5,
    width: Metrics.applyRatio(20),
  },
  promoImage: {
    borderRadius: Metrics.applyRatio(25),
    height: Metrics.applyRatio(200),
    width: Metrics.applyRatio(334),
  },
  promoName: {
    flexDirection: 'row',
    marginLeft: Metrics.applyRatio(10),
    marginTop: Metrics.applyRatio(20),
  },
  referButtonWrapper: {
    alignItems: 'center',
    borderTopColor: Colors.black5,
    borderTopWidth: Metrics.applyRatio(1),
    flexDirection: 'row',
    justifyContent: 'center',
    padding: Metrics.applyRatio(10),
  },
  referImg: {
    height: Metrics.applyRatio(66),
    width: Metrics.applyRatio(66),
  },
  referNow: {
    color: Colors.blueValidation,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.medium,
  },
})
