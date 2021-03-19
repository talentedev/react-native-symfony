import React, {Component} from 'react'
import {View, Text} from 'react-native'
import Style from 'App/Containers/CustomerMainScreen/BucketView/BucketViewStyle'
import CustomHeader from 'App/Components/CustomHeader'
import {translate} from 'App/Services/TranslationService'

export default class EmptyUnReferring extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={Style.container}>
        <CustomHeader leftComponent={'back'} title="UnreferredEmptyScreen" />
        <View style={Style.centerText}>
          <Text>{translate('workInProgress')} </Text>
        </View>
      </View>
    )
  }
}
