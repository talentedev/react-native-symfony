import {StyleSheet} from 'react-native'
import Fonts from 'App/Theme/Fonts'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
  },
  instructions: {
    ...Fonts.style.normal,
    fontStyle: 'italic',
    marginBottom: 5,
    textAlign: 'center',
  },
  loading: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
  },
  logo: {
    height: '100%',
    width: '100%',
  },
  result: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
  },
  scrollView: {
    alignItems: 'center',
  },
  text: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
  },
  title: {
    ...Fonts.style.title,
  },
})
