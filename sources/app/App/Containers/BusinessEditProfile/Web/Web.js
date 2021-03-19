import React from 'react'
import {KeyboardAvoidingView, Text, View} from 'react-native'
// Component
// import ClickableText from 'App/Components/ClickableText/ClickableText'
import CustomButton from 'App/Components/CustomButton/CustomButton'
import CustomInputText from 'App/Components/CustomInputText/CustomInputText'
// Other
import {Colors} from 'App/Theme'
import {translate} from 'App/Services/TranslationService'
import Style from './WebStyle'
import {PropTypes} from 'prop-types'
import {UserService} from 'App/Services/GraphQL/UserService'
// import StatusEnum from 'App/Enums/StatusEnum'

// const facebookPreLink = 'facebook.com/'
export default class Web extends React.Component {
  constructor(props) {
    super(props)
    this._fetchWeb()
    this.state = {
      appleStoreUrl: '',
      websiteUrl: '',
      playStoreUrl: '',
      resubmit: false,
    }
  }
  _fetchWeb = () => {
    UserService.getBusinessUser().then((res) => {
      this.setState({
        websiteUrl: res.data.businessUser.websiteUrl ? res.data.businessUser.websiteUrl : '',
        appleStoreUrl: res.data.businessUser.appleStoreUrl
          ? res.data.businessUser.appleStoreUrl
          : '',
        playStoreUrl: res.data.businessUser.playStoreUrl ? res.data.businessUser.playStoreUrl : '',
      })
    })
  }

  setWebsiteLink = (text) => {
    this.setState(
      {
        websiteUrl: text,
      },
      () => {
        this.props.onBusinessChange('websiteUrl', this.state.websiteUrl)
      },
    )
  }

  setAppstoreLink = (text) => {
    this.setState(
      {
        appleStoreUrl: text,
      },
      () => {
        this.props.onBusinessChange('appleStoreUrl', this.state.appleStoreUrl)
      },
    )
  }

  setGooglePlayLink = (text) => {
    this.setState(
      {
        playStoreUrl: text,
      },
      () => {
        this.props.onBusinessChange('playStoreUrl', this.state.playStoreUrl)
      },
    )
  }

  onPressSaveSocial = () => {
    this.props.allSave()
  }
  render() {
    const {websiteUrl, appleStoreUrl, playStoreUrl, resubmit} = this.state
    return (
      <View style={Style.container}>
        <View style={Style.centerView}>
          <View style={Style.textView}>
            <CustomInputText
              style={Style.inputStyle}
              value={websiteUrl}
              onChangeText={this.setWebsiteLink}
              placeholder={translate('websiteLink')}
              textColor={Colors.black1}
              keyboardType="email-address"
            />
            <Text style={Style.sectionTitle}>{translate('websiteLink')}</Text>
          </View>
          <View style={Style.textView}>
            <CustomInputText
              style={Style.inputStyle}
              value={appleStoreUrl}
              onChangeText={this.setAppstoreLink}
              placeholder={translate('appStoreLink')}
              textColor={Colors.black1}
              keyboardType="email-address"
            />
            <Text style={Style.sectionTitle}>{translate('appStoreLink')}</Text>
          </View>

          <View style={Style.textView}>
            <CustomInputText
              style={Style.inputStyle}
              value={playStoreUrl}
              onChangeText={this.setGooglePlayLink}
              placeholder={translate('googlePlayLink')}
              textColor={Colors.black1}
              keyboardType="email-address"
            />
            <Text style={Style.sectionTitle}>{translate('googlePlayLink')}</Text>
          </View>
        </View>
        <KeyboardAvoidingView style={Style.btnBottomView} behavior="padding" enabled>
          <CustomButton
            areYouManuallyGivingPositionFromBottom={true}
            buttonPositionFromBottom={0}
            primaryButtonStyle={Style.buttonContainer}
            primaryButtonInputText={resubmit ? translate('resubmit') : translate('save')}
            primaryButtonOnPress={this.onPressSaveSocial}
          />
        </KeyboardAvoidingView>
      </View>
    )
  }
}
Web.propTypes = {
  onBusinessChange: PropTypes.func,
  allSave: PropTypes.func,
}
