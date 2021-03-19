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
    lineHeight: Metrics.applyRatio(25),
  },
  flexOne: {flex: 1},
  listBottomSection: {marginBottom: Metrics.applyRatio(10)},
  listBottomSectionText: {
    color: Colors.grey4,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
  },
  listButtonIcon: {
    ...ApplicationStyles.locationBoxFirstStyle,
  },
  listImgWrapper: {borderRadius: Metrics.applyRatio(10), marginRight: Metrics.applyRatio(10)},
  listInnerItem: {
    flexDirection: 'row',
  },
  listItemButtonList: {flexDirection: 'row', flexWrap: 'wrap'},
  listTopSection: {alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'},
  listTopSectionIcon: {height: Metrics.applyRatio(15), width: Metrics.applyRatio(15)},
  listTopSectionText: {
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.bigMedium,
    maxWidth: Metrics.applyRatio(214),
  },
  listViewItem: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.applyRatio(20),
    marginHorizontal: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(20),
    padding: Metrics.applyRatio(10),
  },
  listViewItemWithBorder: {
    backgroundColor: Colors.white,
    borderColor: Colors.listCardBorder,
    borderRadius: Metrics.applyRatio(20),
    borderWidth: 1,
    marginHorizontal: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(20),
  },
  listViewItemWithBorderMargin: {
    backgroundColor: Colors.white,
    borderColor: Colors.listCardBorder,
    borderRadius: Metrics.applyRatio(20),
    borderWidth: 1,
    marginHorizontal: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(20),
  },
  margins: {
    marginBottom: Metrics.applyRatio(10),
    marginLeft: Metrics.applyRatio(10),
    marginRight: Metrics.applyRatio(10),
    marginTop: Metrics.applyRatio(10),
  },
  moreIcon: {
    alignItems: 'flex-end',
    height: Metrics.applyRatio(20),
    margin: 5,
    width: Metrics.applyRatio(20),
  },

  referButtonWrapper: {
    alignItems: 'center',
    borderTopColor: Colors.black5,
    borderTopWidth: Metrics.applyRatio(1),
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Metrics.applyRatio(-7),
    marginHorizontal: Metrics.applyRatio(-10),
    marginTop: Metrics.applyRatio(10),
    paddingTop: Metrics.applyRatio(3),
  },
  referImg: {
    borderRadius: Metrics.applyRatio(8),
    height: Metrics.applyRatio(66),
    width: Metrics.applyRatio(66),
  },
  referNow: {
    alignSelf: 'center',
    color: Colors.blueValidation,
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.medium,
  },
})
