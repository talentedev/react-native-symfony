import React, {Component} from 'react'
import {Image, Text, View, TouchableOpacity, ScrollView} from 'react-native'
import {Images, Colors, ApplicationStyles, Metrics} from 'App/Theme'
import CustomHeader from 'App/Components/CustomHeader'
import Style from './ApprovalFailureStyle'
import {translate} from 'App/Services/TranslationService'
import NavigationService from 'App/Services/NavigationService'
import {PropTypes} from 'prop-types'
export default class ApprovalFailure extends Component {
  constructor(props) {
    super(props)
    const {itemData} = this.props.navigation.state.params
    this.state = {
      itemData: itemData,
      rejectedReason: itemData.rejectedReason,
    }
  }
  onPressNext = () => {
    // TODO: navigate to appropriate screen
    NavigationService.navigate('NewOfflinePromotion', {itemData: this.state.itemData})
  }
  render() {
    const {rejectedReason} = this.state
    return (
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={Style.container}>
          <CustomHeader leftComponent="back" />
          <Image source={Images.approvalFail} style={Style.imgStyle} />
          <Text style={Style.failTitle}> {translate('promoAppvlFailed')} </Text>
          <Text style={Style.failContent}>{translate('promoAppvlFailedMsg')}</Text>
          {rejectedReason ? (
            <View style={Style.reasonContainer}>
              <Text style={Style.rejectedReasonStyle}>{rejectedReason}</Text>
            </View>
          ) : (
            <View />
          )}
        </View>
        <TouchableOpacity style={Style.validationButton} onPress={this.onPressNext}>
          <Text style={Style.validationText}>{translate('editPromotion')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => NavigationService.pop()}>
          <Text
            style={{
              ...ApplicationStyles.clickableText,
              marginTop: Metrics.applyRatio(20),
              color: Colors.blueyGrey,
              marginBottom: Metrics.applyRatio(60),
            }}>
            {translate('doThisLater')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

ApprovalFailure.propTypes = {
  navigation: PropTypes.object,
}
