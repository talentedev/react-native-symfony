import {StyleSheet} from 'react-native'
import Metrics from 'App/Theme/Metrics'
import Fonts from 'App/Theme/Fonts'
import Colors from 'App/Theme/Colors'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  addressList: {alignItems: 'center', marginTop: Metrics.applyRatio(30)},
  container: {
    ...ApplicationStyles.screen.container,
  },
  end: {alignItems: 'flex-end'},
  fMandarinOrient: {
    ...Fonts.style.addressDes,
    marginTop: Metrics.applyRatio(5),
    width: Metrics.applyRatio(247),
  },
  flatMainView: {marginLeft: Metrics.applyRatio(10)},
  line: {
    borderColor: Colors.captionBorder,
    borderStyle: 'solid',
    borderWidth: Metrics.applyRatio(0.5),
    height: 1,
    marginTop: Metrics.applyRatio(9),
    width: Metrics.applyRatio(315),
  },
  listButtonIcon: {
    ...ApplicationStyles.locationBoxSecondStyle,
  },
  locationArrowIcon: {
    height: Metrics.applyRatio(18),
    width: Metrics.applyRatio(18),
  },
  renderView: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrics.applyRatio(10),
    marginTop: Metrics.applyRatio(20),
  },
  subCaptionText: {
    ...Fonts.style.subSectionTitle,
  },
})
