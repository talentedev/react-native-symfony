import {StyleSheet} from 'react-native'
import Colors from 'App/Theme/Colors'
import Metrics from 'App/Theme/Metrics'
import Fonts from 'App/Theme/Fonts'

export default StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    aspectRatio: 1,
    height: Metrics.DEVICE_HEIGHT * 0.06,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Metrics.DEVICE_HEIGHT * 0.06,
    width: Metrics.DEVICE_WIDTH,
  },
  imageStyle: {
    height: 24,
    width: 24,
  },
  titleStyle: {
    color: Colors.text,
    flex: 1,
    fontSize: Fonts.size.h2,
    marginLeft: 10,
    textAlign: 'center',
  },
})
