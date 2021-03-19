import {StyleSheet} from 'react-native'
import {Colors, Metrics, Fonts} from 'App/Theme'
import ApplicationStyles from '../../../../Theme/ApplicationStyles'

export const Style = StyleSheet.create({
  activeCenterView: {
    alignItems: 'center',
    height: Metrics.applyRatio(200),
    justifyContent: 'center',
  },
  backImage: {
    borderRadius: Metrics.applyRatio(25),
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  btnView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: Metrics.applyRatio(10),
    textAlign: 'center',
  },
  clockCenter: {
    alignSelf: 'center',
    maxHeight: Metrics.applyRatio(20),
    maxWidth: Metrics.applyRatio(20),
    minHeight: Metrics.applyRatio(15),
    minWidth: Metrics.applyRatio(15),
    resizeMode: 'contain',
  },
  emojiStyle: {
    fontSize: Fonts.size.bigMedium,
    height: Metrics.applyRatio(26),
    textAlign: 'center',
    width: Metrics.applyRatio(76),
  },
  expireText: {
    ...Fonts.style.subSectionTitle,
    alignSelf: 'center',
    color: Colors.grey3,
    marginLeft: Metrics.applyRatio(10),
  },
  expireView: {alignSelf: 'center', flexDirection: 'row'},
  fMandarinOrient: {
    ...Fonts.style.addressDes,
    marginLeft: Metrics.applyRatio(10),
    paddingHorizontal: Metrics.applyRatio(5),
    paddingVertical: Metrics.applyRatio(3),
  },
  imgStyle: {
    borderRadius: Metrics.applyRatio(25),
  },
  innerImgView: {
    alignSelf: 'center',
    backgroundColor: Colors.yellowTransparent91,
    borderRadius: Metrics.applyRatio(14.5),
    height: Metrics.applyRatio(29),
    position: 'absolute',
    width: Metrics.applyRatio(166),
  },
  innerStyleEmoji: {
    alignItems: 'center',
    flexDirection: 'column',
    marginRight: Metrics.applyRatio(10),
  },
  innerView: {
    alignItems: 'center',
    borderRadius: Metrics.applyRatio(25),
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  listButtonIcon: {
    ...ApplicationStyles.locationBoxSecondStyle,
  },
  offStyle: {
    ...Fonts.style.title,
    alignSelf: 'center',
    fontSize: Fonts.size.bigMedium,
    marginTop: Metrics.applyRatio(20),
    textAlign: 'center',
    width: Metrics.applyRatio(286),
  },
  referView: {
    alignSelf: 'center',
    marginBottom: Metrics.applyRatio(30),
    width: Metrics.applyRatio(335),
  },
  secondEmojiStyle: {
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: Metrics.applyRatio(10),
  },
  secondTextStyle: {
    ...Fonts.style.subSectionTitle,
    color: Colors.white,
    height: Metrics.applyRatio(45),
    textAlign: 'center',
    width: Metrics.applyRatio(127),
  },
  subCaptionText: {
    ...Fonts.style.captionFont,
    color: Colors.grey3,
  },
  textContainStyle: {
    ...Fonts.style.subSectionTitle,
    color: Colors.white,
    height: Metrics.applyRatio(45),
    textAlign: 'center',
    width: Metrics.applyRatio(114),
  },
  textStyle: {
    ...Fonts.style.offerAmount,
    color: Colors.white,
    height: Metrics.applyRatio(55),
    textAlign: 'center',
  },
  transparentView: {
    backgroundColor: Colors.text,
    borderRadius: Metrics.applyRatio(25),
    opacity: 0.65,
  },
})

export default {Style}
