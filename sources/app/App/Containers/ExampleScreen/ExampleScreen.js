import React from 'react'
import {ActivityIndicator, Button, Image, Platform, ScrollView, Text, View} from 'react-native'
import {connect} from 'react-redux'
import {PropTypes} from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
import {liveInEurope} from 'App/Stores/Example/Selectors'
import Style from './ExampleScreenStyle'
import {Images} from 'App/Theme'

/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu.',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu.',
})

class ExampleScreen extends React.Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <View style={Style.container}>
        {this.props.userIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={Style.logoContainer}>
              <Image style={Style.logo} source={Images.logo} resizeMode={'contain'} />
            </View>
            <Text style={Style.text}>To get started, edit App.js</Text>
            <Text style={Style.instructions}>{instructions}</Text>
            {this.props.userErrorMessage ? (
              <Text style={Style.error}>{this.props.userErrorMessage}</Text>
            ) : (
              <View>
                <Text style={Style.result}>
                  {"I'm a fake user, my name is "}
                  {this.props.user.name}
                </Text>
                <Text style={Style.result}>
                  {this.props.liveInEurope ? 'I live in Europe !' : "I don't live in Europe."}
                </Text>
              </View>
            )}
            <Button onPress={this.props.fetchUser} title="Refresh" />
          </ScrollView>
        )}
      </View>
    )
  }
}

ExampleScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  liveInEurope: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
  liveInEurope: liveInEurope(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExampleScreen)
