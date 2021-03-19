import React from 'react'
import {Text, View, KeyboardAvoidingView} from 'react-native'
// Component
// import ClickableText from 'App/Components/ClickableText/ClickableText'
import CustomButton from 'App/Components/CustomButton/CustomButton'
import CustomInputText from 'App/Components/CustomInputText/CustomInputText'
// Other
import {Colors} from 'App/Theme'
import {translate} from 'App/Services/TranslationService'
import Style from './SocialStyle'
import {PropTypes} from 'prop-types'
import {UserService} from 'App/Services/GraphQL/UserService'
import StatusEnum from 'App/Enums/StatusEnum'

// const facebookPreLink = 'facebook.com/'
export default class Social extends React.Component {
  constructor(props) {
    super(props)
    this._fetchSocial()
    this.state = {
      instaName: '',
      fbUrl: '',
      testInsta: '',
      resubmit: false,
    }
  }
  _fetchSocial = () => {
    UserService.getBusinessUser().then((res) => {
      console.log('response Social => ', res)
      this.setState({
        instaName: res.data.businessUser.instagramId ? res.data.businessUser.instagramId : '',
        resubmit: res.data.businessUser.status === StatusEnum.REFUSED,
        fbUrl: res.data.businessUser.facebookUrl ? res.data.businessUser.facebookUrl : '',
      })
    })
  }

  setInsta = (text) => {
    const instagramUsernameRegex = /^[a-zA-Z0-9_.]{0,29}$/ // TODO: make sure there aren't other valid character
    if (instagramUsernameRegex.test(text)) {
      this.setState(
        {
          instaName: text,
        },
        () => {
          this.props.onBusinessChange('instagramId', this.state.instaName)
        },
      )
    }
  }

  setFbURL = (text) => {
    this.setState(
      {
        fbUrl: text,
      },
      () => {
        this.props.onBusinessChange('facebookUrl', this.state.fbUrl)
      },
    )
  }

  onPressSaveSocial = () => {
    this.props.allSave()
  }
  render() {
    const {instaName, fbUrl, resubmit} = this.state
    return (
      <View style={Style.container}>
        {/* <KeyboardAvoidingView
          style={Style.container}
          behavior="padding"
          enabled> */}
        <View style={Style.centerView}>
          <View style={Style.textView}>
            <CustomInputText
              style={Style.inputStyle}
              value={instaName}
              onChangeText={this.setInsta}
              placeholder={translate('instaName')}
              textColor={Colors.black1}
              keyboardType="email-address"
            />
            <Text style={Style.sectionTitle}>{translate('instaName')}</Text>
          </View>
          <View style={Style.textView}>
            <CustomInputText
              style={Style.inputStyle}
              value={fbUrl}
              onChangeText={this.setFbURL}
              placeholder={translate('facebookUrl')}
              textColor={Colors.black1}
              keyboardType="email-address"
            />
            <Text style={Style.sectionTitle}>{translate('facebookUrl')}</Text>
          </View>
        </View>
        <KeyboardAvoidingView style={Style.btnBottomView} behavior="padding" enabled>
          {/* <View style={Style.btnBottomView}> */}
          <CustomButton
            areYouManuallyGivingPositionFromBottom={true}
            buttonPositionFromBottom={0}
            primaryButtonStyle={Style.buttonContainer}
            primaryButtonInputText={resubmit ? translate('resubmit') : translate('save')}
            primaryButtonOnPress={this.onPressSaveSocial}
          />
          {/* </View> */}
        </KeyboardAvoidingView>
      </View>
    )
  }
}
Social.propTypes = {
  onBusinessChange: PropTypes.func,
  allSave: PropTypes.func,
}
