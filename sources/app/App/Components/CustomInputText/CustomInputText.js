import React from 'react'
import {TextInput} from 'react-native'

import PropTypes from 'prop-types'
import Colors from 'App/Theme/Colors'
import styles from './CustomInputTextStyle'
export default class CustomInputText extends React.Component {
  // TextInput Method

  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      return {value: nextProps.value}
    } else return null
  }

  setRef = (element) => {
    const {ref} = this.props
    if (ref) ref(element)
  }

  textInputOnFocus = () => {
    const {onFocus} = this.props
    if (onFocus) onFocus()
  }
  textInputOnChangeText = (text) => {
    const {onChangeText} = this.props
    if (onChangeText) onChangeText(text)
    this.setState = {
      textValue: text,
    }
  }
  textInputSubmitEditing = () => {
    const {onSubmitEditing} = this.props
    if (onSubmitEditing) onSubmitEditing()
  }

  // Render Method
  render() {
    const {value} = this.state
    const {
      style,
      textColor,
      returnKeyType,
      keyboardType,
      secureTextEntry,
      autoCapitalize,
      editable,
      placeholder,
      placeholderTextColor,
      multiline,
    } = this.props
    return (
      <TextInput
        style={[style, styles.paddingStyle] || styles.paddingStyle}
        placeholder={placeholder || ''}
        placeholderTextColor={placeholderTextColor || Colors.grey}
        value={value}
        editable={editable || true}
        multiline={multiline}
        numberOfLines={2}
        ref={this.setRef}
        textColor={textColor || Colors.black1}
        returnKeyType={returnKeyType || 'done'}
        keyboardType={keyboardType || 'default'}
        secureTextEntry={secureTextEntry || false}
        autoCapitalize={autoCapitalize || 'none'}
        onChangeText={this.textInputOnChangeText}
        onFocus={this.textInputOnFocus}
        onSubmitEditing={this.textInputSubmitEditing}
      />
    )
  }
}

CustomInputText.propTypes = {
  value: PropTypes.string,
  ref: PropTypes.any,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  placeholder: PropTypes.string,
  isEditable: PropTypes.bool,
  textInputStyle: PropTypes.object,
  textColor: PropTypes.string,
  returnKeyType: PropTypes.string,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  autoCapitalize: PropTypes.bool,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  editable: PropTypes.bool,
  placeholderTextColor: PropTypes.string,
  multiline: PropTypes.bool,
}
