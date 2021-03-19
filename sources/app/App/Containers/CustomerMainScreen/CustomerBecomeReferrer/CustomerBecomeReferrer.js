import React, {Component} from 'react'
import {
  Alert,
  Clipboard,
  FlatList,
  Image,
  Keyboard,
  LayoutAnimation,
  Linking,
  NativeModules,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {PropTypes} from 'prop-types'
import NavigationService from 'App/Services/NavigationService'
import Style from './CustomerBecomeReferrerStyle'
import {translate} from 'App/Services/TranslationService'
// Components
import CustomHeader from 'App/Components/CustomHeader'
import CustomButton from 'App/Components/CustomButton/CustomButton'
import CustomTabs from 'App/Components/CustomTabs/CustomTabs'
import {ApplicationStyles, Colors, Fonts, Images, Metrics} from 'App/Theme'
import ViewShot from 'react-native-view-shot'
import moment from 'moment'
import {UserService} from 'App/Services/GraphQL/UserService'
import {PromotionService} from 'App/Services/GraphQL/PromotionService'
import EventEmitter from 'App/Services/EventEmitter'
import Share from 'react-native-share'
import CameraRoll from '@react-native-community/cameraroll'
import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel'
import ToastService from 'App/Services/ToastService'
import InAppBrowserService from 'App/Services/InAppBrowserService'
import StorageService from 'App/Services/AsyncStorage/StorageService'
import {convertCurrency} from 'App/Services/Utils'
import TextWithBold from 'App/Components/TextWithBold/TextWithBold'

const {UIManager} = NativeModules

const URL = 'ambassador://promotion/'

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

export default class CustomerBecomeReferrer extends Component {
  constructor(props) {
    super(props)
    const {itemData} = this.props.navigation.state.params

    this.state = {
      currentIndex: 0,
      itemData: itemData,
      username: '',
      profileImageUrl: '',
      viewShotImgUri: '',
    }
    this._fetchUser()
  }

  tabs = [{title: translate('IMAGE')}, {title: translate('TEXT')}]

  _fetchUser = () => {
    UserService.getCustomerUser()
      .then((res) => {
        this.setState({
          username: res.data.customerUser.userName,
          profileImageUrl: res.data.customerUser.profileImageUrl,
        })
      })
      .finally(() => {
        this.setState({spinner: false})
      })
  }

  getLocationNameList = () => {
    this.items = this.state.itemData.businessLocations.map((item, key) => (
      <Text key={item.uuid} style={[Style.descTxt, {fontSize: Fonts.size.xxsmall2}]}>
        {key === 0 ? item.caption : ' • ' + item.caption}
      </Text>
    ))
    return this.items
  }

  // onPress Method
  onPressLeftIcon = () => {
    const {currentIndex} = this.state
    if (currentIndex === 0) {
      NavigationService.pop()
      return
    }
    LayoutAnimation.easeInEaseOut()
    this.setState({
      currentIndex: currentIndex - 1,
    })
  }

  onPressNext = () => {
    const {currentIndex} = this.state
    if (currentIndex === 3) {
      return
    }
    if (currentIndex === 0) {
      this.saveImageToTmpFolder()
    }
    LayoutAnimation.easeInEaseOut()
    this.setState({
      currentIndex: currentIndex + 1,
    })
  }

  onPressSave = () => {
    PromotionService.referPromotion(this.state.itemData.uuid)
      .then((res) => {
        if (res.data.referPromotion === true) {
          EventEmitter.emitter.emit('refreshPromotions')
          NavigationService.popToTop('CustomerMainScreen')
        } else {
          Alert.alert(translate('errors.serverError'), translate('errors.cannotReferPromotion'))
        }
      })
      .catch(() =>
        Alert.alert(translate('errors.serverError'), translate('errors.pleaseRetryLater')),
      )
  }

  saveImageToCameraRoll = () => {
    StorageService.checkPhotoPermission().then((res) => {
      if (res === true) {
        this._saveImageToCameraRoll()
      }
    })
  }

  saveImageToTmpFolder = () => {
    // On iOS need to link RCTCameraRoll lib : https://facebook.github.io/react-native/docs/cameraroll.html
    this.viewShot
      .capture()
      .then((uri) => {
        this.setState({viewShotImgUri: uri})
      })
      .catch((err) => {
        console.log(err)
      })
  }

  _saveImageToCameraRoll = () => {
    const viewShotImgUri = this.state.viewShotImgUri
    CameraRoll.saveToCameraRoll(viewShotImgUri, 'photo')
      .then((newUri) => {
        this.setState({viewShotImgUri: newUri})
        ToastService.show(translate('imageSaved'))
      })
      .catch((err) => {
        console.log(err)
      })
  }
  _keyExtractor = (item) => item.uuid
  gMapOpener = (location) => {
    const url = Platform.select({
      ios: 'maps:?q=' + location,
      android: 'geo:?q=' + location,
    })

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        return Linking.openURL(url)
      } else {
        const url = 'https://www.google.com/maps/?q=' + location
        return InAppBrowserService.openInAppBrowserLink(url)
      }
    })
  }
  setTextClipboard = async (text) => {
    await Clipboard.setString(text)
    ToastService.show(translate('textCopy'))
  }

  writeToClipboard = async () => {
    const {itemData} = this.state

    await Clipboard.setString(URL + itemData.uuid)
    ToastService.show(translate('urlCopy'))
  }
  _renderListItem = (buttonItem) => {
    if (buttonItem.index < 3) {
      return <Text style={Style.listButtonIcon}>{buttonItem.item.caption}</Text>
    } else if (buttonItem.index === 3) {
      let leftCount = this.state.itemData.businessLocations.length - 3
      return <Text style={Style.listButtonIcon}>+ {leftCount}</Text>
    } else {
    }
  }
  shareImageClick = () => {
    const viewShotImgUri = this.state.viewShotImgUri
    const shareOption = {
      url: viewShotImgUri,
    }
    Share.open(shareOption)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        err && console.log(err)
      })
  }

  renderCarousel = () => (
    <Carousel style={{width: Metrics.DEVICE_WIDTH, height: Metrics.DEVICE_HEIGHT}}>
      <Image
        style={Style.bottomContainer}
        resizeMode="contain"
        source={{
          uri: this.state.viewShotImgUri ? this.state.viewShotImgUri : null,
        }}
      />
    </Carousel>
  )

  renderImageView = () => {
    return (
      <View style={Style.tabImgContentWrapper}>
        <Lightbox
          springConfig={{speed: 100000, bounciness: 0}}
          swipeToDismiss={true}
          renderContent={this.renderCarousel}>
          <Image
            style={Style.lightBoxImg}
            resizeMode="contain"
            source={{
              uri: this.state.viewShotImgUri ? this.state.viewShotImgUri : null,
            }}
          />
        </Lightbox>

        <View style={[Style.btnWrapper, Style.positionBtn]}>
          <TouchableOpacity style={Style.btnWithIcon} onPress={() => this.shareImageClick()}>
            <Image source={Images.shareIcon} style={Style.imageTabBtnIcon} />
            <Text style={Style.buttonRightBoldTxt}> {translate('shareImage')} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.btnWithIcon} onPress={() => this.saveImageToCameraRoll()}>
            <Image source={Images.arrowDown} style={Style.imageTabBtnIcon} />
            <Text style={Style.buttonRightBoldTxt}> {translate('saveImage')} </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderTextView = () => {
    const {itemData} = this.state
    return (
      <View style={Style.tabContentWrapper}>
        <View style={Style.textTabContentWithBg}>
          <View style={Style.promoTextContainer}>
            <Text style={Style.promoText}>{itemData.business.description}</Text>
          </View>
        </View>
        <View style={Style.copyTextBtnWrapper}>
          <TouchableOpacity
            style={Style.btnWithIcon}
            onPress={() => this.setTextClipboard(itemData.business.description)}>
            <Image source={Images.copyContentInactive} style={Style.imageTabBtnLinkIcon} />
            <Text style={Style.buttonRightBoldTxt}> {translate('copyText')} </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // render Method
  renderScreen = () => {
    const {currentIndex} = this.state
    switch (currentIndex) {
      case 0:
        return this.renderFirstScreen()

      case 1:
        return this.renderSecondScreen()

      case 2:
        return this.renderThirdScreen()

      default:
        return null
    }
  }

  renderFirstScreen = () => {
    const {itemData} = this.state

    return (
      <View style={Style.container}>
        <View style={Style.contentContainer}>
          <ScrollView
            contentContainerStyle={Style.scrollContainer}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {itemData.isRedeemed ? (
              <View style={Style.containerIem}>
                <Image source={Images.beReferCongrats} style={Style.congrateImg} />
                <Text style={Style.titleTextStyle}>{translate('congratulations')}</Text>
                <Text style={Style.subTitleStyle}>{translate('congrateDesc')}</Text>
                {itemData.referrerShare ? (
                  <View style={Style.congCircle}>
                    <Text style={Style.boldText}>{`$${Number(itemData.referrerShare)}`}</Text>
                  </View>
                ) : (
                  <View />
                )}
              </View>
            ) : (
              <View style={Style.containerIem}>
                <Image source={Images.beReferAlmostDone} style={Style.almostDoneImg} />
                <Text style={Style.titleTextStyle}>{translate('almostThere')}</Text>
                <Text style={Style.subTitleStyle}>{translate('almostThereDesc')}</Text>
              </View>
            )}
          </ScrollView>
        </View>
        <View style={Style.bottomContainer}>
          <CustomButton
            areYouManuallyGivingPositionFromBottom={true}
            buttonPositionFromBottom={0}
            primaryButtonInputText={
              itemData.isRedeemed ? translate('letsReferrer') : translate('goBack')
            }
            primaryButtonStyle={Style.buttonContainer}
            primaryButtonOnPress={() => {
              Keyboard.dismiss()
              itemData.isRedeemed ? this.onPressNext() : NavigationService.pop()
            }}
          />
          {/* <ClickableText
            inputText={itemData.isRedeemed ? translate('letsReferrer') : translate('goBack')}
            style={Style.buttonContainer}
            textStyle={Style.buttonTextStyle}
            onPress={() => {
              Keyboard.dismiss()
              itemData.isRedeemed ? this.onPressNext() : NavigationService.pop()
            }}
          /> */}
        </View>
      </View>
    )
  }

  renderSecondScreen = () => {
    const {itemData} = this.state

    return (
      <View style={Style.container}>
        <View style={Style.mainContainer}>
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <Text style={Style.topTitle}>{translate('referring')}</Text>
            <View style={[Style.promotionDisplay, Style.shadowView]}>
              <View style={Style.promotionDisplay}>
                <Image
                  source={{uri: itemData.promoImageUrl}}
                  style={{
                    height: Metrics.applyRatio(66),
                    width: Metrics.applyRatio(66),
                    margin: Metrics.applyRatio(10),
                    marginRight: Metrics.applyRatio(0),
                    borderRadius: Metrics.applyRatio(8),
                  }}
                />
                <View style={Style.textBox}>
                  <Text style={Style.titleBox}>{itemData.caption}</Text>
                  <Text style={Style.descriptionBox}>
                    <TextWithBold
                      fullTxt={translate('earnRefer', {x: convertCurrency(itemData.referrerShare)})}
                      boldTxtStyle={{...Style.descriptionBox, color: Colors.black}}
                      boldTxtList={['$' + convertCurrency(itemData.referrerShare)]}
                    />
                  </Text>
                  <View style={Style.listItemButtonList}>
                    {itemData.businessLocations.length > 0 ? (
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={itemData.businessLocations}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderListItem}
                        horizontal={true}
                      />
                    ) : (
                      <Text />
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View style={Style.listCardContainer}>
              <Text style={Style.leftTitle}>{translate('mustKnow')}</Text>
              <View style={Style.listTextItem}>
                <Image source={Images.pointCircle} style={Style.posintCircleImg} />
                <Text style={Style.pointText}>{translate('loremIpsum')}</Text>
              </View>
              <View style={Style.listTextItem}>
                <Image source={Images.pointCircle} style={Style.posintCircleImg} />
                <Text style={Style.pointText}>{translate('loremIpsum')}</Text>
              </View>
              <View style={Style.listTextItem}>
                <Image source={Images.pointCircle} style={Style.posintCircleImg} />
                <Text style={Style.pointText}>{translate('loremIpsum')}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={Style.bottomContainerWithText}>
          <Text style={Style.proceedingText}>{translate('byProceeding')}</Text>
          <Text style={Style.termsText}>{translate('termsAndConditions')}</Text>
          {/* <ClickableText
            inputText={translate('next')}
            style={Style.buttonContainer}
            textStyle={Style.buttonTextStyle}
            onPress={() => {
              Keyboard.dismiss()
              this.onPressNext()
            }}
          /> */}
          <CustomButton
            areYouManuallyGivingPositionFromBottom={true}
            buttonPositionFromBottom={0}
            primaryButtonInputText={translate('next')}
            primaryButtonStyle={Style.buttonContainer}
            primaryButtonOnPress={() => {
              Keyboard.dismiss()
              this.onPressNext()
            }}
          />
        </View>
      </View>
    )
  }

  renderThirdScreen = () => {
    const {itemData} = this.state
    return (
      <View style={Style.container}>
        <View style={Style.mainContainer}>
          <Text style={Style.topTitle}>{translate('referring')}</Text>
          <View style={Style.promotionDisplay}>
            <Image
              source={{uri: itemData.promoImageUrl}}
              style={{
                height: Metrics.applyRatio(66),
                width: Metrics.applyRatio(66),
                margin: Metrics.applyRatio(10),
                marginRight: Metrics.applyRatio(0),
                borderRadius: Metrics.applyRatio(8),
              }}
            />
            <View style={Style.textBox}>
              <Text style={Style.titleBox}>{itemData.caption}</Text>
              <Text style={Style.descriptionBox}>
                <TextWithBold
                  fullTxt={translate('earnRefer', {x: convertCurrency(itemData.referrerShare)})}
                  boldTxtStyle={{...Style.descriptionBox, color: Colors.black}}
                  boldTxtList={['$' + convertCurrency(itemData.referrerShare)]}
                />
              </Text>
              <View style={Style.listItemButtonList}>
                {itemData.businessLocations.length > 0 ? (
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={itemData.businessLocations}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderListItem}
                    horizontal={true}
                  />
                ) : (
                  <Text />
                )}
              </View>
            </View>
          </View>
          <View style={Style.tabContainer}>
            <CustomTabs
              tabs={this.tabs}
              initialPage={0}
              tabBarStyle={Style.tabBarStyle}
              tabBarBackgroundColor={Colors.transparent}
              tabBarActiveTextColor={Colors.active}
              tabBarInactiveTextColor={Colors.inActive}
              tabBarTextStyle={ApplicationStyles.tabTextStyle}
              screens={[this.renderImageView(), this.renderTextView()]}
            />
            <View />
          </View>
        </View>
        <View style={Style.bottomContainer}>
          <View style={[Style.btnWrapper, Style.footerItem]}>
            <TouchableOpacity style={Style.btnWithIcon} onPress={this.writeToClipboard}>
              <Image source={Images.copyContent} style={Style.imageTabBtnLinkIcon} />
              <Text style={Style.buttonRightTxt}> {URL + itemData.uuid} </Text>
            </TouchableOpacity>
          </View>
          {/* <ClickableText
            inputText={translate('finish')}
            style={Style.buttonContainer}
            textStyle={Style.buttonTextStyle}
            onPress={() => {
              Keyboard.dismiss()
              this.onPressSave()
            }}
          /> */}
          <CustomButton
            areYouManuallyGivingPositionFromBottom={true}
            buttonPositionFromBottom={0}
            primaryButtonInputText={translate('finish')}
            primaryButtonStyle={Style.buttonContainer}
            primaryButtonOnPress={() => {
              Keyboard.dismiss()
              this.onPressSave()
            }}
          />
        </View>
      </View>
    )
  }

  render() {
    const {itemData, profileImageUrl} = this.state
    return (
      <React.Fragment>
        <CustomHeader
          compact
          leftComponent="back"
          leftIconPress={this.onPressLeftIcon}
          title={this.state.currentIndex > 0 ? '' : ''}
          manRaiseHand={this.state.currentIndex > 0}
        />
        <SafeAreaView style={Style.container}>{this.renderScreen()}</SafeAreaView>

        <View style={Style.viewShotContainer}>
          <ViewShot
            ref={(viewShot) => (this.viewShot = viewShot)}
            options={{format: 'jpg', quality: 1}}>
            <View style={Style.tabContentWithBg}>
              <Image source={Images.beReferralBg} style={Style.tabImgBg} />
              <View style={Style.imgOverContent}>
                <View style={Style.imgOverContainer}>
                  <Image
                    source={{
                      uri: itemData.business.profileImageUrl
                        ? itemData.business.profileImageUrl
                        : null,
                    }}
                    style={Style.fabricIcon}
                  />
                  <Text style={Style.titleTxt}>{itemData.business.businessName}</Text>
                  <Text
                    style={[
                      Style.descTxt,
                      {
                        color: Colors.blueyGrey,
                        fontFamily: Fonts.fonts.PoppinsMedium,
                        fontSize: Fonts.size.xxsmall,
                        width: Metrics.applyRatio(134),
                      },
                    ]}>
                    {this.getLocationNameList()}
                  </Text>
                  <View style={Style.bgContainer}>
                    <Image source={Images.cornerBg} style={Style.cornerBgImg} />
                    <View style={Style.cornerBgContent}>
                      <View style={Style.barStyle}>
                        <Text
                          style={[
                            Style.titleTxt,
                            {
                              fontSize: Metrics.applyRatio(
                                Math.min(12, 4 + 220 / itemData.caption.length),
                              ),
                            },
                          ]}>
                          {itemData.caption}
                        </Text>
                      </View>

                      <Text style={Style.descTxt}>
                        {translate('redeemAt') +
                          ' ' +
                          itemData.business.businessName +
                          ' ' +
                          translate('fromNowUntil') +
                          ' '}
                        <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>
                          {moment(itemData.endDate).format('DD MMM YYYY') + ' 👀'}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <Image source={Images.appleAndPlay} style={Style.appleAndPlayIcon} />
                  <Text style={Style.descTxt}>
                    {translate('download')}
                    <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>
                      {' '}
                      {translate('ambassador') + ' '}
                    </Text>
                    {translate('downloadambassador') + ' 👇'}
                  </Text>
                  <Image
                    source={
                      profileImageUrl
                        ? {
                            uri: profileImageUrl,
                          }
                        : this.state.civility === 'M'
                        ? Images.maleProfile
                        : Images.femaleProfile
                    }
                    style={Style.femaleIcon}
                  />
                  <Text style={Style.emailStyle}> {`@${this.state.username} `} </Text>
                  <Image source={Images.logoWithName} style={Style.logoWithNameStyle} />
                  <Text
                    style={[
                      Style.descTxt,
                      {fontSize: Fonts.size.xxsmall2, width: Metrics.applyRatio(120)},
                    ]}>
                    {translate('earn')}
                    <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>
                      {`${' '} ${'HKD$' + Number(itemData.referrerShare)} ${' '}`}
                    </Text>
                    {translate('everyReferral')}
                  </Text>
                </View>
              </View>
            </View>
          </ViewShot>
        </View>
      </React.Fragment>
    )
  }
}

CustomerBecomeReferrer.propTypes = {
  navigation: PropTypes.object,
}
