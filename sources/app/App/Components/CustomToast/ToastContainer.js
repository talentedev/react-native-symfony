import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes,
} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Colors, Fonts, Images} from 'App/Theme'
import Metrics from 'App/Theme/Metrics'

const TOAST_MAX_WIDTH = 0.85
const TOAST_ANIMATION_DURATION = 200

const positions = {
  TOP: 20,
  BOTTOM: -20,
  CENTER: 0,
}

const durations = {
  LONG: 3500,
  SHORT: 2000,
}

let styles = StyleSheet.create({
  closeIcon: {
    height: Metrics.applyRatio(10),
    width: Metrics.applyRatio(10),
  },
  containerStyle: {
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderRadius: Metrics.applyRatio(17),
    height: Metrics.applyRatio(34),
    justifyContent: 'center',
    opacity: 0.8,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Metrics.applyRatio(20),
    marginHorizontal: Metrics.applyRatio(17),
  },
  crossButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Metrics.applyRatio(10),
    // marginRight: Metrics.applyRatio(19),
  },
  defaultStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  shadowStyle: {
    elevation: 8,
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 23,
  },
  textStyle: {
    color: Colors.white,
    fontFamily: Fonts.fonts.PoppinsSemiBold,
    fontSize: Metrics.applyRatio(12),
    textAlign: 'center',
  },
})

class ToastContainer extends Component {
  static displayName = 'ToastContainer'

  static propTypes = {
    ...ViewPropTypes,
    containerStyle: ViewPropTypes.style,
    duration: PropTypes.number,
    visible: PropTypes.bool,
    position: PropTypes.number,
    animation: PropTypes.bool,
    shadow: PropTypes.bool,
    keyboardAvoiding: PropTypes.bool,
    backgroundColor: PropTypes.string,
    opacity: PropTypes.number,
    shadowColor: PropTypes.string,
    textColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    delay: PropTypes.number,
    hideOnPress: PropTypes.bool,
    onPress: PropTypes.func,
    onHide: PropTypes.func,
    onHidden: PropTypes.func,
    onShow: PropTypes.func,
    onShown: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    duration: durations.SHORT,
    animation: true,
    shadow: true,
    position: positions.BOTTOM,
    opacity: 0.8,
    delay: 0,
    hideOnPress: true,
    keyboardAvoiding: true,
  }

  constructor() {
    super(...arguments)
    const window = Dimensions.get('window')
    this.state = {
      visible: this.props.visible,
      opacity: new Animated.Value(0),
      windowWidth: window.width,
      windowHeight: window.height,
      keyboardScreenY: window.height,
    }
  }

  componentWillMount() {
    Dimensions.addEventListener('change', this._windowChanged)
    if (this.props.keyboardAvoiding) {
      Keyboard.addListener('keyboardDidChangeFrame', this._keyboardDidChangeFrame)
    }
  }

  componentDidMount = () => {
    if (this.state.visible) {
      this._showTimeout = setTimeout(() => this._show(), this.props.delay)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        clearTimeout(this._showTimeout)
        clearTimeout(this._hideTimeout)
        this._showTimeout = setTimeout(() => this._show(), this.props.delay)
      } else {
        this._hide()
      }

      this.setState({
        visible: nextProps.visible,
      })
    }
  }

  componentWillUnmount = () => {
    this._hide()
    Dimensions.removeEventListener('change', this._windowChanged)
    Keyboard.removeListener('keyboardDidChangeFrame', this._keyboardDidChangeFrame)
  }

  _animating = false
  _root = null
  _hideTimeout = null
  _showTimeout = null
  _keyboardHeight = 0

  _windowChanged = ({window}) => {
    this.setState({
      windowWidth: window.width,
      windowHeight: window.height,
    })
  }

  _keyboardDidChangeFrame = ({endCoordinates}) => {
    this.setState({
      keyboardScreenY: endCoordinates.screenY,
    })
  }

  _show = () => {
    clearTimeout(this._showTimeout)
    if (!this._animating) {
      clearTimeout(this._hideTimeout)
      this._animating = true
      this._root.setNativeProps({
        pointerEvents: 'auto',
      })
      this.props.onShow && this.props.onShow(this.props.siblingManager)
      Animated.timing(this.state.opacity, {
        toValue: this.props.opacity,
        duration: this.props.animation ? TOAST_ANIMATION_DURATION : 0,
        easing: Easing.out(Easing.ease),
      }).start(({finished}) => {
        if (finished) {
          this._animating = !finished
          this.props.onShown && this.props.onShown(this.props.siblingManager)
          if (this.props.duration > 0) {
            this._hideTimeout = setTimeout(() => this._hide(), this.props.duration)
          }
        }
      })
    }
  }

  hideToast = () => {
    if (typeof this.props.onPress === 'function') {
      this.props.onPress()
    }
    if (this.props.hideOnPress) {
      this._hide()
    }
  }

  _hide = () => {
    clearTimeout(this._showTimeout)
    clearTimeout(this._hideTimeout)
    if (!this._animating) {
      if (this._root) {
        this._root.setNativeProps({
          pointerEvents: 'none',
        })
      }

      if (this.props.onHide) {
        this.props.onHide(this.props.siblingManager)
      }

      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: this.props.animation ? TOAST_ANIMATION_DURATION : 0,
        easing: Easing.in(Easing.ease),
      }).start(({finished}) => {
        if (finished) {
          this._animating = false
          this.props.onHidden && this.props.onHidden(this.props.siblingManager)
        }
      })
    }
  }

  render() {
    let {props} = this
    const {windowWidth} = this.state
    let offset = props.position

    const {windowHeight, keyboardScreenY} = this.state
    const keyboardHeight = Math.max(windowHeight - keyboardScreenY, 0)
    let position = offset
      ? {
          [offset < 0 ? 'bottom' : 'top']: offset < 0 ? keyboardHeight - offset : offset,
        }
      : {
          top: 0,
          bottom: keyboardHeight,
        }

    return this.state.visible || this._animating ? (
      <View style={[styles.defaultStyle, position]} pointerEvents="box-none">
        <TouchableWithoutFeedback
        // onPress={this.hideToast}
        >
          <Animated.View
            style={[
              styles.containerStyle,
              {marginHorizontal: windowWidth * ((1 - TOAST_MAX_WIDTH) / 2)},
              props.containerStyle,
              props.backgroundColor && {backgroundColor: props.backgroundColor},
              {
                opacity: this.state.opacity,
              },
              props.shadow && styles.shadowStyle,
              props.shadowColor && {shadowColor: props.shadowColor},
            ]}
            pointerEvents="none"
            ref={(ele) => (this._root = ele)}>
            <View style={styles.content}>
              <Text
                numberOfLines={1}
                style={[
                  styles.textStyle,
                  props.textStyle,
                  props.textColor && {color: props.textColor},
                ]}>
                {this.props.children}
              </Text>
              <TouchableOpacity style={styles.crossButton} onPress={this.hideToast}>
                <Image source={Images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    ) : null
  }
}

export default ToastContainer
export {positions, durations}
