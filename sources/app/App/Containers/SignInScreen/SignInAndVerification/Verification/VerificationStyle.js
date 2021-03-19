import {StyleSheet} from 'react-native'
import Metrics from 'App/Theme/Metrics'
import Fonts from 'App/Theme/Fonts'
import Colors from 'App/Theme/Colors'
import {ApplicationStyles} from 'App/Theme'

export default StyleSheet.create({
  buttonContainer: {
    ...ApplicationStyles.buttonContainer,
    marginTop: Metrics.applyRatio(76),
  },
  buttonTextStyle: {
    ...ApplicationStyles.textButton,
  },
  clickableContainer: {
    ...ApplicationStyles.clickableTextContainer,
    alignSelf: 'center',
    height: Metrics.applyRatio(20),
    marginTop: Metrics.applyRatio(30),
  },
  clickableTextStyle: {
    ...ApplicationStyles.clickableText,
  },
  codeCellContainer: {
    width: Metrics.applyRatio(304),
  },
  codeCellItem: {
    backgroundColor: Colors.greyBackground,
    borderRadius: Metrics.applyRatio(13.6),
    fontFamily: Fonts.fonts.PoppinsRegular,
    paddingBottom: 1,
  },
  disActiveButtonContainer: {
    ...ApplicationStyles.buttonContainer,
    backgroundColor: Colors.lightBlueGrey,
    marginTop: Metrics.applyRatio(30),
  },
  inValidText: {
    color: Colors.reddish91,
    fontFamily: Fonts.fonts.PoppinsRegular,
    marginTop: Metrics.applyRatio(10),
  },
  innerTxt: {
    ...Fonts.style.message,
    alignSelf: 'center',
    color: Colors.grey,
    marginTop: Metrics.applyRatio(10),
  },
  innerView: {alignItems: 'center', flex: 1},
  mainContain: {
    flex: 1,
  },
  mainTxt: {
    ...Fonts.style.title,
    alignSelf: 'center',
    color: Colors.black1,
    marginTop: Metrics.applyRatio(40),
    textAlign: 'center',
    width: Metrics.applyRatio(192),
  },
  verifyView: {
    flexDirection: 'row',
    // height: Metrics.applyRatio(55),
    justifyContent: 'space-between',
    marginTop: Metrics.applyRatio(30),
    width: Metrics.applyRatio(333),
    // borderWidth: 1,
  },
})
