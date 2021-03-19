import React from 'react'
import {Text} from 'react-native'
import PropTypes from 'prop-types'

export default class TextWithBold extends React.Component {
  render() {
    const {fullTxt, boldTxtStyle, bannerTxtStyle, boldTxtList} = this.props
    return (
      <Text>
        {fullTxt.split(' ').map((word, i) => (
          <Text style={boldTxtList.includes(word) ? boldTxtStyle : bannerTxtStyle} key={i}>
            {word}{' '}
          </Text>
        ))}
      </Text>
    )
  }
}

TextWithBold.propTypes = {
  fullTxt: PropTypes.string,
  boldTxtStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  bannerTxtStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  boldTxtList: PropTypes.array,
}
