import React, {PureComponent} from 'react'
import {Text, View, Image, TouchableHighlight} from 'react-native'
import PropTypes from 'prop-types'

import Style from './TitleBarStyle'
import Colors from 'App/Theme/Colors'

class TitleBar extends PureComponent {
  // onPress Method
  onPressLeft = () => {
    const {onPressLeftIcon} = this.props
    if (onPressLeftIcon) onPressLeftIcon()
  }

  onPressRight = () => {
    const {onPressRightIcon} = this.props
    if (onPressRightIcon) onPressRightIcon()
  }
  onPressNotify = () => {
    const {onPressNotifyIcon} = this.props
    if (onPressNotifyIcon) onPressNotifyIcon()
  }
  render() {
    const {
      title,
      isLeftIcon,
      isRightIcon,
      isNotify,
      leftIcon,
      rightIcon,
      notifyIcon,
      textAlignCustome,
    } = this.props
    return (
      <View style={Style.container}>
        <TouchableHighlight
          style={Style.buttonContainer}
          disabled={!isLeftIcon}
          underlayColor={Colors.grey}
          onPress={this.onPressLeft}>
          <View>{isLeftIcon && <Image style={Style.imageStyle} source={leftIcon} />}</View>
        </TouchableHighlight>
        <Text style={[Style.titleStyle, {textAlign: textAlignCustome}]}>{title}</Text>
        {isNotify && (
          <TouchableHighlight
            style={Style.buttonContainer}
            disabled={!isNotify}
            underlayColor={Colors.grey}
            onPress={this.onPressNotify}>
            <Image style={Style.imageStyle} source={notifyIcon} />
          </TouchableHighlight>
        )}
        <TouchableHighlight
          style={Style.buttonContainer}
          disabled={!isRightIcon}
          underlayColor={Colors.grey}
          onPress={this.onPressRight}>
          <View>{isRightIcon && <Image style={Style.imageStyle} source={rightIcon} />}</View>
        </TouchableHighlight>
      </View>
    )
  }
}

TitleBar.propTypes = {
  title: PropTypes.string,
  textAlignCustome: PropTypes.string,
  isLeftIcon: PropTypes.bool,
  leftIcon: Image.propTypes.source,
  onPressLeftIcon: PropTypes.func,
  isRightIcon: PropTypes.bool,
  rightIcon: Image.propTypes.source,
  onPressRightIcon: PropTypes.func,
  isNotify: PropTypes.bool,
  notifyIcon: Image.propTypes.source,
  onPressNotifyIcon: PropTypes.func,
}

export default TitleBar
