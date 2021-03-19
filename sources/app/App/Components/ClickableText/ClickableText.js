import React from 'react'
import {Text, TouchableOpacity} from 'react-native'

import styles from './ClickableTextStyle'
import PropTypes from 'prop-types'

export default class ClickableText extends React.Component {
  /* constructor(props) {
    super(props)
    this.state = {
      underlined: props.underlined,
      opacity: props.activeOpacity,
    }
  } */

  /* static getDerivedStateFromProps(nextProps, prevState) {
    console.log('run getDerivedStateFromProps next', nextProps)
    console.log('run getDerivedStateFromProps prev', prevState)
    if (nextProps.underlined !== prevState.underlined) {
      return { underlined: nextProps.underlined }
    }
    if (nextProps.activeOpacity !== prevState.opacity) {
      return { opacity: nextProps.activeOpacity }
    } else return null
  } */
  render() {
    const {
      underlined,
      inputText,
      textStyle,
      withLargePadding,
      style,
      onPress,
      activeOpacity,
      editable,
    } = this.props
    return (
      <TouchableOpacity
        style={style}
        onPress={onPress}
        activeOpacity={activeOpacity}
        disabled={editable}>
        <Text
          style={[
            textStyle,
            underlined ? styles.underLineStyle : styles.noUnderLineStyle,
            withLargePadding ? styles.padding : null,
          ]}>
          {inputText}
        </Text>
      </TouchableOpacity>
    )
  }
}

ClickableText.propTypes = {
  inputText: PropTypes.string,
  underlined: PropTypes.bool,
  withLargePadding: PropTypes.bool,
  onPress: PropTypes.func,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  activeOpacity: PropTypes.number,
  editable: PropTypes.bool,
  //   textStyle: PropTypes.object,
  //   style: PropTypes.object,
}
ClickableText.defaultProps = {
  underlined: false,
  activeOpacity: 1,
}
