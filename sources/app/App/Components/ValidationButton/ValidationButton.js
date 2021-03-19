import React from 'react'
import {Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'

export default class ValidationButton extends React.PureComponent {
  onPressButton = () => {
    const {onPress} = this.props
    if (onPress) onPress()
  }
  render() {
    const {text, style, textStyle, activeOpacity, disabled} = this.props
    return (
      <TouchableOpacity
        style={style}
        onPress={this.onPressButton}
        activeOpacity={activeOpacity}
        disabled={disabled}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

ValidationButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  activeOpacity: PropTypes.number,
  disabled: PropTypes.bool,
  //   style: PropTypes.object,
  //   textStyle: PropTypes.object,
}
