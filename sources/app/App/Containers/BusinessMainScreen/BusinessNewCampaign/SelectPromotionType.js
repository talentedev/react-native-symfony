import React from 'react'
import {
  Image,
  NativeModules,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native'
import {PropTypes} from 'prop-types'
import {translate} from 'App/Services/TranslationService'
import NavigationService from 'App/Services/NavigationService'

import Style from './BusinessNewCampaignStyle'
import {ApplicationStyles, Fonts, Images} from 'App/Theme'

const {UIManager} = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

export default class SelectPromotionType extends React.Component {
  constructor(props) {
    super(props)
    const {websiteUrl, appleStoreUrl, playStoreUrl} = this.props.navigation.state.params
    this.state = {
      selectedPromotionType: '',
      activeNextBtn: false,
      websiteUrl: websiteUrl,
      appleStoreUrl: appleStoreUrl,
      playStoreUrl: playStoreUrl,
    }
  }

  onPressLeftIcon = () => {
    NavigationService.pop()
  }

  onPressNext = () => {
    if (this.state.selectedPromotionType === 'online') {
      const {websiteUrl, appleStoreUrl, playStoreUrl} = this.state
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
    } else if (this.state.selectedPromotionType === 'instore') {
      NavigationService.push('NewOfflineCampaignScreen')
    }
  }

  selectPromotiontype(promoType) {
    if (this.state.selectedPromotionType === promoType) {
      this.setState({
        selectedPromotionType: '',
        activeNextBtn: false,
      })
    } else {
      this.setState({
        selectedPromotionType: promoType,
        activeNextBtn: true,
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          hidden={false}
          // To hide statusBar
          // Background color of statusBar
          translucent={true}
          // allowing light, but not detailed shapes
          networkActivityIndicatorVisible={true}
        />
        <View style={Style.customSliderContainer} />
        <TouchableOpacity
          style={[ApplicationStyles.backIcon, ApplicationStyles.backIconWrapper]}
          onPress={this.onPressLeftIcon}
          activeOpacity={1}>
          <Image source={Images.backIcon} style={ApplicationStyles.backIcon} />
        </TouchableOpacity>
        <SafeAreaView style={Style.imagePickerButton}>
          <Text style={[Fonts.style.title, ApplicationStyles.screen.textAlignCenter]}>
            {translate('newOnlineCampaignStep1')}
          </Text>
        </SafeAreaView>
        <SafeAreaView style={Style.contentContainer}>
          <ScrollView
            ref={(scrollView) => {
              this.scrollView = scrollView
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={Style.sliderWrapper}>
              <TouchableOpacity
                onPress={() => {
                  this.selectPromotiontype('online')
                  this.scrollView.scrollTo({x: 0, y: 0, animated: true})
                }}>
                <View
                  style={[
                    Style.redeemInnerView,
                    this.state.selectedPromotionType === 'online' ? Style.redeemSelected : {},
                  ]}>
                  <Image source={Images.redeemOnline} style={Style.redeemImg} />
                  <Text style={Style.redeemTitle}>{translate('redeemOnline')}</Text>
                  <Text style={Style.redeemDesc}>{translate('redeemOnlineDesc')}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.selectPromotiontype('instore')
                  this.scrollView.scrollToEnd()
                }}>
                <View
                  style={[
                    Style.redeemInnerView,
                    this.state.selectedPromotionType === 'instore' ? Style.redeemSelected : {},
                  ]}>
                  <Image source={Images.redeemInstore} style={Style.redeemImg} />
                  <Text style={Style.redeemTitle}>{translate('redeemInstore')}</Text>
                  <Text style={Style.redeemDesc}>{translate('redeemInstoreDesc')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
        <View style={Style.nextContainer}>
          <TouchableOpacity
            style={[Style.validationButton, this.state.activeNextBtn ? '' : Style.inactiveButton]}
            onPress={this.onPressNext}
            activeOpacity={1}
            disabled={!this.state.activeNextBtn}>
            <Text style={Style.validationText}>{`${translate('next')}`}</Text>
          </TouchableOpacity>
        </View>
      </React.Fragment>
    )
  }
}
SelectPromotionType.propTypes = {
  navigation: PropTypes.object,
}
