import React, {createRef, PureComponent} from 'react'
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native'
import Style from './RedemptionEnterInfoStyle'
import {Colors, Images, Metrics} from 'App/Theme'
import {translate} from 'App/Services/TranslationService'
import CustomHeader from 'App/Components/CustomHeader'
import CustomButton from 'App/Components/CustomButton/CustomButton'
import {PropTypes} from 'prop-types'
import NavigationService from 'App/Services/NavigationService'
import CodeInput from 'react-native-confirmation-code-field'
import Spinner from 'react-native-loading-spinner-overlay'
import {PromotionService} from 'App/Services/GraphQL/PromotionService'
import ErrorEnum from 'App/Enums/ErrorEnum'
import EventEmitter from 'App/Services/EventEmitter'
import {ApplicationStyles} from '../../../Theme'
import TextWithBold from 'App/Components/TextWithBold/TextWithBold'
import {convertCurrency, onlinePromoBoxClick} from 'App/Services/Utils'

export default class RedemptionEnterInfo extends PureComponent {
  constructor(props) {
    super(props)
    const {
      itemData,
      search,
      scanCode,
      popIndex,
      selectedReferrer,
    } = this.props.navigation.state.params
    this.state = {
      itemData: itemData,
      isFullCode: false,
      passcode: scanCode,
      match: true,
      spinner: false,
      referrer: search,
      selectedReferrer: selectedReferrer,
      isScanCode: false,
      popIndex: popIndex ? popIndex + 1 : 1,
      onlineRedemptionInvoiceNumber: '',
      onlineRedemptionTransactionValue: '',
      validNext: false,
      onlineRedemptionIndex: 0,
    }
  }

  componentDidMount() {
    const {scanCode} = this.props.navigation.state.params
    const scandCodeRegex = /^[0-9]*$/
    if (scanCode) {
      if (scandCodeRegex.test(scanCode) && scanCode.length === 6) {
        this.pasteCode(scanCode)
      } else {
        Alert.alert(translate('errors.error'), translate('invalidCode'))
        this.clearCode()
      }
    }
  }

  onPressNext = () => {
    const {referrer, passcode} = this.state
    this.setState({spinner: true}, () => {
      PromotionService.redeemOfflinePromotion(
        this.state.itemData.uuid,
        referrer || 'ambassador',
        passcode,
      )
        .then(() =>
          setTimeout(() => {
            this.setState({spinner: false, match: true}, () =>
              EventEmitter.emitter.emit('refreshPromotions'),
            )
            this.state.itemData.isReferrer
              ? NavigationService.push('ReferalGoingOnScreen', {itemData: this.state.itemData})
              : NavigationService.push('ReferPromotionScreen', {
                  itemData: this.state.itemData,
                  justRedeemed: true,
                })
          }, 100),
        )
        .catch((err) => {
          this.setState({spinner: false}, () => {
            if (err.message && err.message.includes(ErrorEnum.ERROR_WRONG_PASSCODE)) {
              this.clearCode()
              this.setState({
                match: false,
              })
            } else if (
              err.message &&
              err.message.includes(ErrorEnum.ERROR_PROMOTION_MULTIPLE_REDEEM_WITH_SAME_REFERRER)
            ) {
              this.clearCode()
              setTimeout(() => {
                Alert.alert(translate('errors.error'), translate('errors.redeemSameReferrer'))
              }, 100)
            } else {
              this.clearCode()
              setTimeout(() => {
                Alert.alert(translate('errors.serverError'), translate('errors.pleaseRetryLater'))
              }, 100)
            }
          })
        })
    })
  }
  handlerOnFulfill = (code) => {
    this.setState({passcode: code}, () => {
      this.onPressNext()
    })
  }

  field = createRef()
  clearCode() {
    const {current} = this.field
    if (current) {
      current.clear()
    }
  }
  pasteCode(value) {
    const {current} = this.field
    if (current) {
      current.handlerOnTextChange(value)
      this.setState({
        passcode: value,
      })
    }
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
        return Linking.openURL(url)
      }
    })
  }

  goToScan = () => {
    const {itemData, referrer, popIndex, selectedReferrer} = this.state
    NavigationService.push('ScanPasscode', {
      itemData: itemData,
      search: referrer,
      popIndex: popIndex,
      selectedReferrer: selectedReferrer,
    })
  }

  onChangeOrderNumber = (txt) => {
    let validNext = true
    if (txt === '') {
      validNext = false
    }
    this.setState({
      onlineRedemptionInvoiceNumber: txt,
      validNext: validNext,
    })
  }

  onChangeTransactionValue = (txt) => {
    let validNext = true
    const numberRegex = /^[0-9]*\.?[0-9]*$/
    if (numberRegex.test(txt)) {
      if (txt === '') {
        validNext = false
      }
      this.setState({
        onlineRedemptionTransactionValue: txt,
        validNext: validNext,
      })
    }
  }

  onPressLeftIcon = () => {
    const {popIndex, onlineRedemptionIndex, itemData, onlineRedemptionInvoiceNumber} = this.state
    if (onlineRedemptionIndex === 1 && itemData.isOnlinePromo) {
      let validNext = false
      if (onlineRedemptionInvoiceNumber !== '') {
        validNext = true
      }
      this.setState({
        onlineRedemptionIndex: onlineRedemptionIndex - 1,
        validNext: validNext,
      })
    } else {
      NavigationService.pop(popIndex)
    }
  }

  onlinePressNext = () => {
    let {onlineRedemptionIndex, onlineRedemptionTransactionValue} = this.state
    onlineRedemptionIndex++
    if (onlineRedemptionIndex === 1) {
      this.setState({
        onlineRedemptionIndex: onlineRedemptionIndex,
        validNext: onlineRedemptionTransactionValue !== '',
      })
    } else {
      this.setState({spinner: true}, () => {
        const {
          itemData,
          referrer,
          onlineRedemptionInvoiceNumber,
          onlineRedemptionTransactionValue,
        } = this.state
        PromotionService.redeemOnlinePromotion(
          itemData.uuid,
          referrer || 'ambassador',
          onlineRedemptionInvoiceNumber,
          onlineRedemptionTransactionValue,
        )
          .then((res) => {
            this.setState({spinner: false})
            NavigationService.push('OnlineRedemptionComplete', {
              redemptionData: res.data.redeemOnlinePromotion,
            })
          })
          .catch((error) => {
            console.log(error)
            this.setState({spinner: false}, () => {
              Alert.alert(translate('errors.serverError'), translate('errors.pleaseRetryLater'))
            })
          })
      })
    }
  }

  renderOffLinePromo = () => {
    const {itemData, passcode, selectedReferrer} = this.state
    return (
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <Text style={Style.subtitleStyle}>{translate('redeeming')}</Text>
        <View
          style={[
            Style.promotionDisplay,
            ApplicationStyles.shadowView,
            {backgroundColor: Colors.white},
          ]}>
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
            <Text style={Style.titleBox} numberOfLines={1}>
              {itemData.caption}
            </Text>
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

        {selectedReferrer ? (
          <Text style={Style.referreByTxt}>
            {translate('referredBy')}
            <Text style={Style.boldTxt}>
              {' ' +
                selectedReferrer.firstname +
                ' ' +
                selectedReferrer.lastname +
                ' (@' +
                selectedReferrer.userName +
                ')'}
            </Text>
          </Text>
        ) : (
          <Text />
        )}
        <Text style={Style.semiTitle}>{translate('getThePasscode')}</Text>
        <Text style={Style.businessPasscode}>
          <Text style={Style.boldTxt}>{itemData.business.businessName}</Text>
          {translate('passcodeWaiting')}
        </Text>
        <View style={Style.codeInputWrapper}>
          <CodeInput
            ref={this.field}
            // secureTextEntry // doesn't work
            inputPosition="full-width"
            variant="clear"
            keyboardType="number-pad"
            codeLength={6}
            size={Metrics.applyRatio(44)}
            activeColor={Colors.black1}
            inactiveColor={Colors.black1}
            cellProps={{style: Style.codeCellItem}}
            containerProps={{style: Style.codeCellContainer}}
            onFulfill={this.handlerOnFulfill}
            defaultCode={passcode}
          />
        </View>
        <Text style={Style.invalidText}>
          {this.state.match ? '' : 'Invalid passcode. Please try again'}
        </Text>
        <Text style={Style.orTxt}>{translate('or')}</Text>
        <CustomButton
          primaryButton={false}
          isImageSecondButton={true}
          isImageSecondButtonViewStyle={[
            ApplicationStyles.screen.containerRow,
            Style.validationButton,
          ]}
          isImageSource={Images.qrcodeScanIcon}
          isImageStyle={Style.scanIcon}
          isImageSecondButtonTextStyle={Style.scanQRcodeTxt}
          isImageSecondButtonInputText={translate('scanQRcode')}
          isImageSecondButtonOnPress={this.goToScan}
        />
        <TouchableOpacity style={Style.bookmarkContainer}>
          <Image source={Images.boldFullCheck} style={Style.moreIcon} />
          <Text style={Style.editPasscodeTxt}>{translate('bookmarkLater')}</Text>
        </TouchableOpacity>
        <View style={Style.footerTextContent}>
          <View>
            <Text style={Style.passcodeFooterTxt}>🚨</Text>
            <Text style={Style.passcodeFooterTxt}>
              {translate('refusingPasscode')}
              <Text style={Style.boldTxt}>{translate('HKD')}200 </Text>
              {translate('toYourBalance')}
            </Text>
          </View>
          <TouchableOpacity style={[Style.bookmarkContainer, {marginTop: Metrics.applyRatio(20)}]}>
            <Image source={Images.whatsappIcon} style={Style.whatsAppIcon} />
            <Text style={Style.editPasscodeTxt}>{translate('reportWhatsapp')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
  renderOnlinePromo = () => {
    const {
      itemData,
      onlineRedemptionIndex,
      onlineRedemptionInvoiceNumber,
      onlineRedemptionTransactionValue,
    } = this.state
    return (
      <View style={Style.container}>
        <View style={Style.contentContainer}>
          <Text style={Style.subtitleStyle}>{translate('redeeming')}</Text>
          <View
            style={[
              Style.promotionDisplay,
              ApplicationStyles.shadowView,
              {backgroundColor: Colors.white},
            ]}>
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
              <Text style={Style.titleBox} numberOfLines={1}>
                {itemData.caption}
              </Text>
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
                {itemData.isOnlinePromo && (
                  <TouchableOpacity onPress={() => onlinePromoBoxClick(itemData)}>
                    <Text style={Style.listButtonIcon}>{translate('onlinePromoStore')}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          <Text style={Style.orderTitle}>
            {onlineRedemptionIndex === 0
              ? translate('whatIsYourOrderNumber')
              : translate('howMuchDidYouSpent')}
          </Text>
          {onlineRedemptionIndex === 0 ? (
            <Text style={Style.orderDec}>
              <TextWithBold
                fullTxt={translate('youMayEnterMembership', {
                  membership: translate('membership'),
                  userID: translate('userID'),
                })}
                boldTxtStyle={Style.boldTxt}
                boldTxtList={[translate('membership'), translate('userID')]}
              />
            </Text>
          ) : (
            <Text style={Style.orderDec}>
              {translate('pleaseEnter')}
              <Text style={Style.boldTxt}>{itemData.onlineTransactionType}</Text>
            </Text>
          )}
          <View>
            <TextInput
              style={Style.inputStyle}
              placeholder={onlineRedemptionIndex === 0 ? '' : translate('HK$')}
              placeholderTextColor={Colors.coolGrey}
              keyboardType={onlineRedemptionIndex === 0 ? 'default' : 'number-pad'}
              value={
                onlineRedemptionIndex === 0
                  ? onlineRedemptionInvoiceNumber
                  : onlineRedemptionTransactionValue
              }
              onChangeText={
                onlineRedemptionIndex === 0
                  ? this.onChangeOrderNumber
                  : this.onChangeTransactionValue
              }
            />
          </View>
        </View>
        <View style={Style.footerContainer}>
          <Text style={Style.footerDesc}>{translate('cashbackWillCalculate')}</Text>
          <CustomButton
            primaryButtonInputText={translate('next')}
            primaryButtonOnPress={this.onlinePressNext}
            primaryButtonEditable={!this.state.validNext}
          />
          <TouchableOpacity style={Style.bookmarkContainer}>
            <Image source={Images.boldFullCheck} style={Style.moreIcon} />
            <Text style={Style.editPasscodeTxt}>{translate('bookmarkLater')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  render() {
    const {itemData} = this.state

    return (
      <View style={Style.container}>
        <View style={Style.container}>
          <CustomHeader leftComponent="back" raiseHand leftIconPress={this.onPressLeftIcon} />
          <Spinner visible={this.state.spinner} />
          <View style={Style.scrollContainer}>
            {itemData.isOnlinePromo ? this.renderOnlinePromo() : this.renderOffLinePromo()}
          </View>
        </View>
      </View>
    )
  }
}

RedemptionEnterInfo.propTypes = {
  navigation: PropTypes.object,
}
