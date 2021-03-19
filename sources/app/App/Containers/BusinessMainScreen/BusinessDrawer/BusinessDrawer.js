import React from 'react'
import {View, Image, TouchableOpacity, Text, FlatList, Linking} from 'react-native'
import {WhiteSpace} from '@ant-design/react-native'
// import DrawerService from 'App/Services/DrawerService'
import {Images, Metrics} from 'App/Theme'
import Style from './BusinessDrawerStyle'
import {translate} from 'App/Services/TranslationService'
import NavigationService from 'App/Services/NavigationService'
import {UserService} from 'App/Services/GraphQL/UserService'
import InAppBrowserService from 'App/Services/InAppBrowserService'
import {convertCurrency} from 'App/Services/Utils'

const data = [
  {
    id: 1,
    name: 'actions',
    subtitle: [
      {
        id: 1,
        name: 'referrerValidation',
        icon: Images.proofValidationIcon,
        event: () => {
          NavigationService.navigate('ProofValidationMessage')
        },
      },
      {
        id: 2,
        name: 'customerValidation',
        icon: Images.customerValidationIcon,
        event: () => {
          NavigationService.navigate('CusotmerValidation')
        },
      },
    ],
  },
  {
    id: 2,
    name: 'financialInfo',
    subtitle: [
      {
        id: 1,
        name: 'credit',
        icon: Images.creditIcon,
        event: () => {},
      },
      {
        id: 2,
        name: 'payment',
        icon: Images.payment,
        event: () => {
          NavigationService.navigate('AddPaymentMethodScreen')
        },
      },
      {
        id: 3,
        name: 'transactionHistory',
        icon: Images.transactionHistory,
        event: () => {
          NavigationService.navigate('BusinessTransactionScreen')
        },
      },
      {
        id: 4,
        name: 'billingHistory',
        icon: Images.billingHistory,
        event: () => {
          NavigationService.navigate('BillingHistory')
        },
      },
    ],
  },
  {
    id: 3,
    name: 'preferences',
    subtitle: [
      {
        id: 1,
        name: 'viewPromoPasscode',
        icon: Images.viewPromoPasscode,
        event: () => {
          NavigationService.navigate('EditPasscode')
        },
      },
      {
        id: 2,
        name: 'transferAccount',
        icon: Images.transferAccount,
        event: () => {
          NavigationService.navigate('BusinessTransferAccountScreen')
        },
      },
      {
        id: 3,
        name: 'language',
        icon: Images.language,
        event: () => {
          /* TODO: add navigation */
        },
      },
    ],
  },
  {
    id: 4,
    name: 'supportAndContract',
    subtitle: [
      {
        id: 1,
        name: 'whatsapp',
        icon: Images.whatsApp,
        event: () => {
          Linking.openURL('whatsapp://send?phone=85267464912').catch(() => {
            InAppBrowserService.openInAppBrowserLink(
              'http://api.whatsapp.com/send?phone=85267464912',
            ) // TODO: change to ambassador's
          })
        },
      },
      {
        id: 2,
        name: 'email',
        icon: Images.email,
        event: () => {
          InAppBrowserService.openInAppBrowserLink('mailto:info@ambassador.com')
        },
      },
    ],
  },
  {
    id: 5,
    name: 'additionalInfo',
    subtitle: [
      {
        id: 1,
        name: 'faq',
        icon: Images.faq,
        event: () => {
          InAppBrowserService.openInAppBrowserLink('https://ambassador.com/#faq')
        },
      },
      {
        id: 2,
        name: 'privacyPolicy',
        icon: Images.privacyPolicy,
        event: () => {
          InAppBrowserService.openInAppBrowserLink('https://ambassador.com/privacy-policy/')
        },
      },
      {
        id: 3,
        name: 'termsConditions',
        icon: Images.termsAndConditions,
        event: () => {
          InAppBrowserService.openInAppBrowserLink('https://ambassador.com/') // TODO: not provided yet
        },
      },
    ],
  },
]
export class DrawerContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
    this._fetchUser() // TODO: save the user in redux to potentially enhance performance
  }

  _fetchUser = () => {
    UserService.getBusinessUser().then((res) => {
      this.setState({user: res.data.businessUser})
    })
  }
  _keyExtractor = (item) => item.id.toString()
  render() {
    return (
      <View style={Style.container}>
        <View style={{height: Metrics.applyRatio(50)}} />
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={this._keyExtractor}
          ListFooterComponent={
            <View style={{marginLeft: Metrics.applyRatio(20)}}>
              <WhiteSpace size="lg" />
              <TouchableOpacity
                style={Style.clickables}
                onPress={() => {
                  UserService.logoutAndClearTokens().then(() => {
                    NavigationService.clearApolloStoreAndNavigateToSignInScreen()
                  })
                }}>
                <Image
                  source={Images.logout}
                  style={{width: Metrics.applyRatio(15), height: Metrics.applyRatio(15)}}
                />
                <Text style={Style.logoutStyle}>{translate('logout')}</Text>
              </TouchableOpacity>
            </View>
          }
          renderItem={(item) => {
            return (
              <View style={{marginLeft: Metrics.applyRatio(30)}}>
                <WhiteSpace size="md" />
                <Text style={Style.titleMenu}>{translate(item.item.name)}</Text>
                <WhiteSpace size="md" />
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={item.item.subtitle}
                  keyExtractor={this._keyExtractor}
                  renderItem={(item) => {
                    return (
                      <View style={{marginLeft: Metrics.applyRatio(10)}}>
                        <WhiteSpace size="md" />
                        <TouchableOpacity
                          style={Style.clickables}
                          onPress={() => item.item.event()}>
                          <Image source={item.item.icon} style={Style.iconStyle} />
                          <Text style={Style.itemTextStyle}>
                            {translate(item.item.name)}
                            {item.item.name === 'credit' && (
                              <Text style={Style.creditPrice}>
                                {'$' +
                                  convertCurrency(
                                    this.state.user ? this.state.user.businessCredit : '',
                                  )}
                              </Text>
                            )}
                          </Text>
                        </TouchableOpacity>
                        <WhiteSpace size="md" />
                      </View>
                    )
                  }}
                />
              </View>
            )
          }}
        />
        <View style={Style.bottomBar}>
          <View style={Style.bottomIcons}>
            {/* <TouchableOpacity */}
            {/*  onPress={() => { */}
            {/*    Linking.openURL( */}
            {/*      'fb://facewebmodal/f?href=https://www.facebook.com/' + this.state.user.facebookId, */}
            {/*    ).catch(() => { */}
            {/*      InAppBrowserService.openInAppBrowserLink('https://www.facebook.com/' + this.state.user.facebookId) */}
            {/*    }) */}
            {/*  }}> */}
            {/*  <Image source={Images.facebook} style={Style.socialMediaIcon} /> */}
            {/* </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('instagram://user?username=ambassador').catch(() => {
                  InAppBrowserService.openInAppBrowserLink('https://www.instagram.com/ambassador/')
                })
              }}>
              <Image source={Images.instagram} style={Style.socialMediaIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                InAppBrowserService.openInAppBrowserLink('https://ambassador.com/')
              }}>
              <Image source={Images.website} style={Style.socialMediaIcon} />
            </TouchableOpacity>
          </View>
          <View style={Style.bottomTextBar}>
            <Text style={Style.versionInfo}>V 1.1</Text>
          </View>
        </View>
      </View>
    )
  }
}
