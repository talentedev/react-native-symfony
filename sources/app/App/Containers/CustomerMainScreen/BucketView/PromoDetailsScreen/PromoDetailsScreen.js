import React, {Component} from 'react'
import {View, Text} from 'react-native'
import CustomHeader from 'App/Components/CustomHeader'
import Style from 'App/Containers/CustomerMainScreen/BucketView/BucketViewStyle'

export default class PromoDetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={Style.container}>
        <CustomHeader leftComponent={'back'} title="20% off on ladies wear" />
        <View style={Style.centerText}>
          <Text>Work in progress</Text>
        </View>
      </View>
    )
  }
}
