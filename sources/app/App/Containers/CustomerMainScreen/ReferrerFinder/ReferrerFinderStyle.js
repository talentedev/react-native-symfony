import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics} from 'App/Theme'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  clearIconStyle: {
    padding: 10,
  },
  container: {
    ...ApplicationStyles.screen.container,
  },
  contentView: {flex: 1, height: Metrics.applyRatio(300)},
  inactiveButton: {
    opacity: 0.6,
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: Colors.greyBackground,
    flexDirection: 'row',
    height: Metrics.applyRatio(57),
    width: Metrics.applyRatio(315),
  },
  marginTopBtn: {
    marginTop: Metrics.applyRatio(10),
  },
  nameBig: {
    color: Colors.black,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.medium,
  },
  nameSmall: {
    color: Colors.blueyGrey,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.small,
  },
  nameStyle: {
    borderRadius: Metrics.applyRatio(16.5),
    height: Metrics.applyRatio(33),
    margin: Metrics.applyRatio(15),
    width: Metrics.applyRatio(33),
  },
  namesStyle: {flexDirection: 'column'},
  nullListItem: {
    alignItems: 'center',
    backgroundColor: Colors.greyBackground,
    height: Metrics.applyRatio(201),
    justifyContent: 'center',
    width: Metrics.applyRatio(315),
  },
  roundSearchBar: {
    backgroundColor: Colors.greyBackground,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    height: Metrics.applyRatio(55),
    width: Metrics.applyRatio(315),
  },
  roundSearchText: {
    ...Fonts.style.titleSection,
    color: Colors.black,
    fontFamily: Fonts.fonts.PoppinsRegular,
  },
  separatorStyle: {
    alignSelf: 'center',
    backgroundColor: Colors.greyDivider,
    height: Metrics.applyRatio(1),
    width: Metrics.applyRatio(275),
  },
  stretchableView: {
    alignSelf: 'center',
    backgroundColor: Colors.greyBackground,
    borderRadius: Metrics.applyRatio(17),
    margin: Metrics.applyRatio(20),
    overflow: 'hidden',
  },
  subtitleStyle: {
    ...Fonts.style.subSectionTitle,
    fontSize: Fonts.size.medium,
    marginHorizontal: Metrics.applyRatio(20),
    textAlign: 'center',
  },
  validationButton: {
    ...ApplicationStyles.buttonContainer,
  },
  validationText: {
    ...ApplicationStyles.textButton,
  },
})
