import React from 'react'
import {ActivityIndicator, StyleSheet, TouchableHighlight, View} from 'react-native'
import {PropTypes} from 'prop-types'
import {Image} from 'react-native-elements'
import {InstagramService} from 'App/Services/Apisauce/InstagramService'
import {Colors, Metrics} from 'App/Theme'

const defaultCount = 6

export default class InstagramFeed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feedImages: [],
    }
    this._fetchImages()
  }

  _fetchImages = () => {
    InstagramService.fetchIGFeedImages(
      this.props.username,
      this.props.count ? this.props.count : defaultCount,
    ).then((res) => {
      this.setState({
        feedImages: res,
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.username !== prevProps.username) {
      this._fetchImages()
    }
  }

  _renderItem = (item) => (
    <View
      key={item.shortcode}
      style={
        this.props.imageContainerStyle ? this.props.imageContainerStyle : Style.imageContainerStyle
      }>
      <TouchableHighlight underlayColor={Colors.transparent} onPress={() => console.log(item.uri)}>
        <Image
          style={Style.imageStyle}
          source={{uri: item.uri}}
          PlaceholderContent={<ActivityIndicator color={Colors.primary} />}
        />
      </TouchableHighlight>
    </View>
  )

  render() {
    return (
      <View style={this.props.containerStyle ? this.props.containerStyle : Style.containerStyle}>
        {this.state.feedImages
          ? this.state.feedImages.map((feedImage) => this._renderItem(feedImage))
          : null}
      </View>
    )
  }
}

InstagramFeed.propTypes = {
  username: PropTypes.string.isRequired,
  count: PropTypes.number,
  containerStyle: PropTypes.object,
  imageContainerStyle: PropTypes.object,
}

const Style = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  imageContainerStyle: {
    borderRadius: Metrics.applyRatio(15),
    height: Metrics.applyRatio(104),
    marginBottom: Metrics.applyRatio(10),
    width: Metrics.applyRatio(104),
  },
  imageStyle: {
    borderRadius: Metrics.applyRatio(15),
    height: '100%',
    width: '100%',
  },
})
