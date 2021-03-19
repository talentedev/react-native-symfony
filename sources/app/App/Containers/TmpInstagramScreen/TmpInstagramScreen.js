import React from 'react'
import {View} from 'react-native'
import InstagramFeed from 'App/Components/Instagram/InstagramFeed'
import Style from './TmpInstagramScreenStyle'
import CustomHeader from 'App/Components/CustomHeader'

export default class TmpInstagramScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CustomHeader leftComponent="back" compact />
        <View style={Style.container}>
          <InstagramFeed username={'instagram'} />
        </View>
      </React.Fragment>
    )
  }
}
