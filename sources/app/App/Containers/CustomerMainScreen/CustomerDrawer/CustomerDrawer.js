import React from 'react'
import {FlatList, Image, Linking, Text, TouchableOpacity, View} from 'react-native'
import {WhiteSpace} from '@ant-design/react-native'
// import DrawerService from 'App/Services/DrawerService'
import {ApplicationStyles, Images, Metrics} from 'App/Theme'
import Style from 'App/Containers/CustomerMainScreen/CustomerDrawer/CustomerDrawerStyle'
import {translate} from 'App/Services/TranslationService'
import NavigationService from 'App/Services/NavigationService'
import {UserService} from 'App/Services/GraphQL/UserService'
import EventEmitter from 'App/Services/EventEmitter'
import {LoginManager, AccessToken} from 'react-native-fbsdk'

// import TranslationService 'App/Services/TranslationService'
import InAppBrowserService from 'App/Services/InAppBrowserService'

const data = [
  {
    id: 1,
    name: 'financialInfo',
    subtitle: [
      {
        id: 1,
        name: 'payment',
        icon: Images.payment,
        event: () => {
          NavigationService.navigate('CustomerWithdrawScreen')
        },
      },
    ],
  },
  {
    id: 2,
    name: 'preferences',
    subtitle: [
      {
        id: 1,
        name: 'categories',
        icon: Images.categories,
        event: () => {
          NavigationService.push('CustomerEditCategory')
        },
      },
      {
        id: 2,
        name: 'language',
        icon: Images.language,
        event: () => {
          // TODO: add proper lang switch
          // const lang = TranslationService.languageIsChinese() ? 'en' : 'zh'
          // TranslationService.resetLanguage(lang).then(() => {
          //   NavigationService.navigateAndReset('CustomerMainScreen')
          // })
        },
      },
    ],
  },
  {
    id: 3,
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
          Linking.openURL('mailto:info@ambassador.com')
        },
      },
    ],
  },
  {
    id: 4,
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
    EventEmitter.emitter.addListener(
      'refreshUser',
      () => {
        this._fetchUser()
      },
      null,
    )
  }

  _fetchUser = () => {
    UserService.getCustomerUser().then((res) => {
      this.setState({user: res.data.customerUser})
    })
  }

  _onPressEdit = () => {
    NavigationService.push('CustomerEditProfile')
  }
  _keyExtractor = (item) => item.id.toString()
  render() {
    let user = this.state.user
    if (user === null) {
      return null
    }
    return (
      <View style={Style.container}>
        <View style={Style.backgroundContainer}>
          <View style={Style.profilContainer}>
            <TouchableOpacity
              onPress={() => NavigationService.push('CustomerSelfScreen')}
              style={Style.profilContainer}>
              <Image
                source={
                  user.profileImageUrl
                    ? {
                        uri: user.profileImageUrl,
                      }
                    : user.profileImageUrl === 'M'
                    ? Images.maleProfile
                    : Images.femaleProfile
                }
                style={Style.profileImageContainer}
              />
              <View style={Style.textProfileContainer}>
                <Text style={Style.textName}>
                  {user.firstname} {user.lastname}
                </Text>
                <Text style={Style.textUserName}>@{user.userName}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this._onPressEdit}>
              <Image source={Images.pencil} style={[ApplicationStyles.icon, Style.pencilStyle]} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: Metrics.applyRatio(30)}} />
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
                    // LoginManager.setLoginBehavior('browser')
                    AccessToken.getCurrentAccessToken()
                      .then((data) => {
                        console.log(data.accessToken)
                        LoginManager.logOut()
                      })
                      .catch((error) => {
                        console.log(error)
                      })
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
                          <Text style={Style.itemTextStyle}>{translate(item.item.name)}</Text>
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
            {/*      Linking.openURL('https://www.facebook.com/' + this.state.user.facebookId) */}
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
