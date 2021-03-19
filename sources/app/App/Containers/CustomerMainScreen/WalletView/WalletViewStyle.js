import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from 'App/Theme'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    backgroundColor: Colors.greyBackground,
  },
  emptyScreen: {alignItems: 'center', flex: 1, justifyContent: 'center'},
  flatListStyle: {flex: 1, marginTop: Metrics.applyRatio(30)},
  innerTransaction: {
    flexDirection: 'row',
    marginTop: Metrics.applyRatio(2),
  },
  minAgo: {...Fonts.style.subSectionTitle},
  renderContainer: {
    ...ApplicationStyles.screen.container,
  },
  separatorView: {
    alignSelf: 'center',
    backgroundColor: Colors.black,
    height: Metrics.applyRatio(10),
    marginLeft: Metrics.applyRatio(10),
    marginRight: Metrics.applyRatio(10),
    width: Metrics.applyRatio(1.2),
  },
  tabBarStyle: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: Metrics.applyRatio(23),
    borderBottomRightRadius: Metrics.applyRatio(23),
    height: Metrics.applyRatio(60),
    overflow: 'hidden',
  },
  tabBarUnderline: {
    alignItems: 'center',
    width: '75%',
  },
  text: {
    ...Fonts.style.dropDownText,
    color: Colors.text,
    marginTop: Metrics.applyRatio(1),
  },
  textStyle: {
    ...Fonts.style.modalAmountText,
    color: Colors.text,
    // fontWeight: 'bold',
  },
  textStyle1: {
    ...Fonts.style.subSectionTitle,
    color: Colors.black,
    fontStyle: 'italic',
  },
  transactionView: {
    borderBottomColor: Colors.captionBorder,
    borderLeftColor: Colors.transparent,
    borderRightColor: Colors.transparent,
    borderTopColor: Colors.transparent,
    borderWidth: Metrics.applyRatio(1),
    flexDirection: 'column',
    marginHorizontal: Metrics.applyRatio(20),
    paddingBottom: Metrics.applyRatio(10),
  },
  view1: {
    width: '70%',
  },
  view2: {
    alignSelf: 'flex-end',
    width: '30%',
  },
})
