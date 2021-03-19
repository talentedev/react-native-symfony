import React, {Component} from 'react'
import {Image, Text, View, Dimensions} from 'react-native'
import {Images, Metrics} from 'App/Theme'
import CustomHeader from 'App/Components/CustomHeader'
import Style from './ApprovalFailureStyle'
import {translate} from 'App/Services/TranslationService'
import NavigationService from 'App/Services/NavigationService'
import {PropTypes} from 'prop-types'
import CustomButton from 'App/Components/CustomButton/CustomButton'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const heightScreen = Dimensions.get('window').height

export default class ApprovalFailure extends Component {
  constructor(props) {
    super(props)
    const {rejectedReason} = this.props.navigation.state.params
    this.state = {
      rejectedReason: rejectedReason,
    }
  }
  onPressNext = () => {
    NavigationService.navigate('BusinessEditProfileScreen')
  }
  render() {
    const {rejectedReason} = this.state
    return (
      //   <ScrollView>
      <View style={Style.container}>
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled
          enableOnAndroid
          extraScrollHeight={Metrics.applyRatio(150)}
          keyboardShouldPersistTaps="handled">
          <CustomHeader leftComponent="back" />
          <Image source={Images.approvalFail} style={Style.imgStyle} />
          <Text style={Style.failTitle}> {translate('acctAppvlFailed')} </Text>
          <Text style={Style.failContent}>{translate('acctAppvlFailedMsg')}</Text>
          {rejectedReason ? (
            <View style={Style.reasonContainer}>
              <Text style={Style.rejectedReasonStyle}>{rejectedReason}</Text>
            </View>
          ) : (
            <View style={heightScreen <= 570 ? Style.heightViewSmall : Style.heightView} />
          )}
          <View style={Style.bottomView}>
            <CustomButton
              primaryButtonStyle={Style.validationButton}
              primaryButtonInputText={translate('editProfile')}
              primaryButtonOnPress={this.onPressNext}
              isSecondButton={true}
              secondaryButtonStyle={Style.textButtonContainer}
              secondaryButtonTextStyle={Style.doThisTxt}
              secondaryButtonInputText={translate('doThisLater')}
              secondaryButtonOnPress={() => NavigationService.pop()}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

ApprovalFailure.propTypes = {
  navigation: PropTypes.object,
}
