import React from 'react'
import {Images, Metrics} from 'App/Theme'
import {
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import Style from '../ProofValidation/ProofValidationStyle'
import NavigationService from 'App/Services/NavigationService'
import CustomHeader from 'App/Components/CustomHeader'
import {UserService} from 'App/Services/GraphQL/UserService'
import {translate} from '../../../Services/TranslationService'
import Moment from 'moment'
import {convertCurrency} from 'App/Services/Utils'
import Spinner from 'react-native-loading-spinner-overlay'
import Colors from 'App/Theme/Colors'

export default class CustomerVerification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      loading: true,
      indicatorLoading: false,
      isAutoApprove: false,
      caption: '',
    }
    this._fetchData()
  }

  onPressLeftIcon = () => {
    NavigationService.pop()
    console.log(this.state)
  }
  keyExtractor = (item) => item.uuid
  _fetchData = () => {
    UserService.getLoggedBusinessPendingRedeemedOnlinePromotions()
      .then((res) => {
        this.setState({
          data: res.data.loggedBusinessPendingRedeemedOnlinePromotions,
          loading: false,
        })
      })
      .catch(() => {
        this.setState({loading: false})
        setTimeout(() => {
          Alert.alert(translate('errors.serverError'), translate('errors.pleaseRetryLater'))
        }, 100)
      })
  }

  removeSelectedItem(uuid, status) {
    let {data} = this.state
    data.map((dataItem) => {
      dataItem.pendingOnlineRedemption.items.map((item) => {
        if (item.uuid === uuid) {
          item.isApproved = status
        }
      })
    })
    this.setState({loading: false, data: data})
  }

  approveRequest = (uuid, status) => {
    Alert.alert(
      status === 'approval' ? translate('confirmApproval') : translate('confirmRejection'),
      '',
      [
        {
          text: translate('cancel'),
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: translate('confirm'),
          onPress: () => {
            let approval = status === 'approval'
            this.setState(
              {
                loading: true,
              },
              () => {
                UserService.approveOrRefusePendingOnlineRedemption(uuid, approval).then((res) => {
                  this.removeSelectedItem(uuid, approval)
                })
              },
            )
          },
        },
      ],
      {cancelable: false},
    )
  }

  renderItem = (item) => {
    return item.item.isApproved === null ? (
      <View style={Style.listSeperatorItemStyle}>
        <View style={[Style.listItemContent, {marginTop: Metrics.applyRatio(23)}]}>
          <View style={Style.leftTxtContainer}>
            <Text style={Style.txtSubTitle}>{item.item.redeemed.userName}</Text>
            <Text style={Style.hkdTxt}>
              {'HK$' + convertCurrency(item.item.onlinePromoPricing.charge)}
            </Text>
            <Text style={Style.hkdMediumTxt}>{item.item.onlineRedemptionInvoiceNumber}</Text>
            <Text style={Style.dateTxt}>
              {Moment(item.item.createdDate, Moment.ISO_8601).fromNow()}
            </Text>
          </View>
          <View style={[Style.listItemButtonContainer, Style.flexStartContainer]}>
            <TouchableOpacity onPress={() => this.approveRequest(item.item.uuid, 'approval')}>
              <Image source={Images.circleCheckIcon} style={Style.validateIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.approveRequest(item.item.uuid, 'rejection')}>
              <Image source={Images.circleCloseIcon} style={Style.validateIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ) : (
      <View />
    )
  }

  render() {
    return (
      <View style={Style.container}>
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
        <Spinner visible={this.state.loading} />
        <CustomHeader
          title={translate('customerValidation')}
          leftComponent="back"
          leftIconPress={this.onPressLeftIcon}
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={false} />}
          style={{marginLeft: Metrics.applyRatio(23), marginRight: Metrics.applyRatio(20)}}>
          {this.state.data && this.state.data.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={this.state.data}
              extraData={this.state}
              keyExtractor={this.keyExtractor}
              renderItem={({item}) => {
                return (
                  <View style={Style.listItemStyle}>
                    <View>
                      <Text style={Style.listItemBoldTitle}>{item.caption}</Text>
                    </View>
                    <View>
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={item.pendingOnlineRedemption.items}
                        extraData={this.state}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                        horizontal={false}
                      />
                    </View>
                  </View>
                )
              }}
              horizontal={false}
            />
          ) : this.state.indicatorLoading ? (
            <ActivityIndicator
              style={{marginTop: Metrics.applyRatio(30)}}
              color={Colors.black1}
              size={'large'}
            />
          ) : (
            <View />
          )}
        </ScrollView>
      </View>
    )
  }
}
