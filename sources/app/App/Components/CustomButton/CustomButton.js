import React from 'react'
import {View, Image, TouchableOpacity, Text} from 'react-native'

import styles from './CustomButtonStyle'
import PropTypes from 'prop-types'
import ClickableText from '../ClickableText/ClickableText'
import Metrics from 'App/Theme/Metrics'

export default class CustomButton extends React.Component {
  render() {
    const {
      areYouManuallyGivingPositionFromBottom, // give props {true} to component when you are giving position from bottom
      buttonPositionFromBottom, // default iPhoneX family=60, other iPhones=40 and android=40 // give value for margin from bottom
      primaryButtonUnderlined,
      primaryButtonInputText,
      primaryButtonTextStyle,
      primaryButtonWithLargePadding,
      primaryButtonStyle,
      primaryButtonOnPress,
      primaryButtonActiveOpacity,
      primaryButtonEditable,
      isSecondButton,
      secondaryButtonActiveOpacity,
      secondaryButtonEditable,
      secondaryButtonInputText,
      secondaryButtonOnPress,
      secondaryButtonStyle,
      secondaryButtonTextStyle,
      isImageSecondButton,
      isImageSecondButtonViewStyle,
      isImageStyle,
      isImageSource,
      isImageSecondButtonInputText,
      isImageSecondButtonTextStyle,
      isImageSecondButtonOnPress,
      mainViewStyle,
      primaryButton,
      isImagePlushText,
      isImagePlushTextMainView,
      isImagePlushTextOnPress,
      isImagePlushTextImageSource,
      isImagePlushTextImageStyle,
      isImagePlushTextTitle,
      isImagePlushTextTitleStyle,
    } = this.props
    return (
      <View
        style={
          mainViewStyle
            ? areYouManuallyGivingPositionFromBottom
              ? // eslint-disable-next-line react-native/no-inline-styles
                {
                  alignItems: 'center',
                  bottom: Metrics.applyRatio(buttonPositionFromBottom + 10),
                }
              : styles.customButtonBottom
            : null
        }>
        {isImageSecondButton ? (
          <View style={isImageSecondButtonViewStyle}>
            <Image source={isImageSource} style={isImageStyle} />
            <ClickableText
              inputText={isImageSecondButtonInputText}
              textStyle={isImageSecondButtonTextStyle}
              onPress={isImageSecondButtonOnPress}
            />
          </View>
        ) : null}
        {primaryButton ? (
          <ClickableText
            inputText={primaryButtonInputText}
            style={
              primaryButtonStyle || [
                styles.validationButton,
                !primaryButtonEditable ? '' : styles.inactiveButton,
              ]
            }
            textStyle={primaryButtonTextStyle || styles.validationText}
            onPress={primaryButtonOnPress}
            activeOpacity={primaryButtonActiveOpacity}
            editable={primaryButtonEditable}
            underlined={primaryButtonUnderlined}
            withLargePadding={primaryButtonWithLargePadding}></ClickableText>
        ) : null}
        {isSecondButton ? (
          <ClickableText
            inputText={secondaryButtonInputText}
            style={secondaryButtonStyle || styles.secondaryButtonStyle}
            textStyle={secondaryButtonTextStyle || styles.validationButtonStyle}
            onPress={secondaryButtonOnPress}
            activeOpacity={secondaryButtonActiveOpacity}
            editable={secondaryButtonEditable}></ClickableText>
        ) : null}
        {isImagePlushText ? (
          <TouchableOpacity style={isImagePlushTextMainView} onPress={isImagePlushTextOnPress}>
            <Image source={isImagePlushTextImageSource} style={isImagePlushTextImageStyle} />
            <Text style={isImagePlushTextTitleStyle}>{isImagePlushTextTitle}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    )
  }
}

CustomButton.propTypes = {
  areYouManuallyGivingPositionFromBottom: PropTypes.bool,
  buttonPositionFromBottom: PropTypes.number,
  primaryButtonInputText: PropTypes.string,
  isImageSecondButtonInputText: PropTypes.string,
  isImagePlushTextTitle: PropTypes.string,
  primaryButtonUnderlined: PropTypes.bool,
  primaryButtonWithLargePadding: PropTypes.bool,
  primaryButtonOnPress: PropTypes.func,
  primaryButtonTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  primaryButtonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isImagePlushTextMainView: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isImagePlushTextImageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isImagePlushTextTitleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  primaryButtonActiveOpacity: PropTypes.number,
  primaryButtonEditable: PropTypes.bool,
  isSecondButton: PropTypes.bool,
  isImageSecondButton: PropTypes.bool,
  isImageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isImageSource: PropTypes.number,
  secondaryButtonInputText: PropTypes.string,
  secondaryButtonOnPress: PropTypes.func,
  secondaryButtonTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isImageSecondButtonTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  secondaryButtonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  secondaryButtonActiveOpacity: PropTypes.number,
  secondaryButtonEditable: PropTypes.bool,
  isImageSecondButtonViewStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isImageSecondButtonOnPress: PropTypes.func,
  isImagePlushTextOnPress: PropTypes.func,
  mainViewStyle: PropTypes.bool,
  primaryButton: PropTypes.bool,
  isImagePlushText: PropTypes.bool,
  isImagePlushTextImageSource: PropTypes.number,
}
CustomButton.defaultProps = {
  primaryButtonUnderlined: false,
  isImageSecondButton: false,
  primaryButton: true,
  primaryButtonActiveOpacity: 1,
  secondaryButtonActiveOpacity: 1,
  isImagePlushText: false,
}
