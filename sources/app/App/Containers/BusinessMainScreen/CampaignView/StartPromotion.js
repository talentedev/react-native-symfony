import React, {Component} from 'react'
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native'
import Style from './StartPromotionStyle'
import {Images} from 'App/Theme'
import {translate} from 'App/Services/TranslationService'
import {PropTypes} from 'prop-types'
import NavigationService from 'App/Services/NavigationService'
import StatusEnum from 'App/Enums/StatusEnum'
import {BusinessService} from 'App/Services/GraphQL/BusinessService'
import Spinner from 'react-native-loading-spinner-overlay'

export default class StartPromotion extends Component {
  constructor(props) {
    super(props)
    const {btnShow, status} = this.props
    this.state = {
      btn: btnShow,
      status: status,
      loading: false,
      canCreateOfflinePromotion: props.canCreateOfflinePromotion,
      canCreateOnlinePromotion: props.canCreateOnlinePromotion,
      websiteUrl: props.websiteUrl,
      appleStoreUrl: props.appleStoreUrl,
      playStoreUrl: props.playStoreUrl,
    }
  }

  goToPromotionType = () => {
    const {
      canCreateOfflinePromotion,
      canCreateOnlinePromotion,
      websiteUrl,
      appleStoreUrl,
      playStoreUrl,
    } = this.state
    if (canCreateOfflinePromotion && canCreateOnlinePromotion) {
      NavigationService.push('SelectPromotionTypeScreen', {websiteUrl, appleStoreUrl, playStoreUrl})
    } else if (canCreateOfflinePromotion) {
      NavigationService.push('NewOfflineCampaignScreen')
    } else if (canCreateOnlinePromotion) {
      if (websiteUrl || appleStoreUrl || playStoreUrl) {
        NavigationService.push('NewOnlineCampaignScreen')
      } else {
        Alert.alert(
          '',
          translate('errors.pleaseSetLink'),
          [
            {
              text: translate('cancel'),
              style: 'cancel',
            },
            {
              text: translate('addLink'),
              onPress: () => NavigationService.push('BusinessEditProfileScreen'),
            },
          ],
          {cancelable: false},
        )
      }
    }
  }

  render() {
    const {btn, status} = this.state
    return (
      <View style={(Style.container, Style.emptyCon)}>
        <Spinner visible={this.state.loading} />
        <Image style={Style.emptyImageStyle} source={Images.emptyStartPromotionImage} />
        <Text style={Style.watchTutorialText}>
          {status === StatusEnum.APPROVED
            ? translate('letsStartCampaign')
            : translate('watchTutorial')}
        </Text>
        <TouchableOpacity>
          <Image style={Style.watchTutorial} source={Images.watchTutorial} />
        </TouchableOpacity>
        {!btn &&
          (status === StatusEnum.APPROVED ? (
            <TouchableOpacity
              onPress={() => {
                this.setState(
                  {
                    loading: true,
                  },
                  () => {
                    BusinessService.getLoggedBusinessPayment()
                      .then((res) => {
                        const last4 = res.data.loggedBusinessPayment
                          ? res.data.loggedBusinessPayment.stripeCardLast4
                          : null
                        if (last4) {
                          this.setState(
                            {
                              loading: false,
                            },
                            () => this.goToPromotionType(),
                          )
                        } else {
                          this.setState(
                            {
                              loading: false,
                            },
                            () =>
                              setTimeout(() => {
                                Alert.alert(
                                  '',
                                  translate('errors.pleaseAddPaymentMethod'),
                                  [
                                    {
                                      text: translate('cancel'),
                                      style: 'cancel',
                                    },
                                    {
                                      text: translate('addPaymentMethod'),
                                      onPress: () =>
                                        NavigationService.push('AddPaymentMethodScreen'),
                                    },
                                  ],
                                  {cancelable: false},
                                )
                              }, 100),
                          )
                        }
                      })
                      .catch(() => {
                        this.setState(
                          {
                            loading: false,
                          },
                          () =>
                            setTimeout(() => {
                              Alert.alert(
                                translate('errors.serverError'),
                                translate('errors.pleaseRetryLater'),
                              )
                            }, 100),
                        )
                      })
                  },
                )
              }}>
              <Image style={Style.buttonStyle} source={Images.startPromotionButton} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                console.log(status)
              }}>
              <Image style={Style.buttonStyle} source={Images.startPromotionButtonDisable} />
            </TouchableOpacity>
          ))}
      </View>
    )
  }
}

StartPromotion.propTypes = {
  btnShow: PropTypes.bool,
  status: PropTypes.string,
  canCreateOfflinePromotion: PropTypes.bool,
  canCreateOnlinePromotion: PropTypes.bool,
  websiteUrl: PropTypes.string,
  appleStoreUrl: PropTypes.string,
  playStoreUrl: PropTypes.string,
}
