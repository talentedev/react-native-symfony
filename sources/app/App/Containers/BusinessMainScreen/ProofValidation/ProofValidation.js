import React from 'react'
import {Images, Metrics} from 'App/Theme'
import {
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native'
import Style from './ProofValidationStyle'
import NavigationService from 'App/Services/NavigationService'
import CustomHeader from 'App/Components/CustomHeader'
import Colors from 'App/Theme/Colors'
import {translate} from 'App/Services/TranslationService'
import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel'
import ViewMoreText from 'react-native-view-more-text'
import {UserService} from 'App/Services/GraphQL/UserService'
import Spinner from 'react-native-loading-spinner-overlay'

export default class ProofValidation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      loading: true,
      isAutoApprove: false,
    }
    this.fetchAll()
  }
  onPressLeftIcon = () => {
    NavigationService.pop()
  }
  componentDidMount() {}

  _fetchUser = () => {
    return UserService.getBusinessUser().then((res) => {
      this.setState({isAutoApprove: res.data.businessUser.isAutoApproveBecomeReferrer})
    })
  }
  _fetchData = () => {
    UserService.getLoggedBusinessPendingApplyHistoryRedemptions()
      .then((res) => {
        this.setState({
          data: res.data.loggedBusinessPendingApplyHistoryRedemptions,
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

  fetchAll = () => {
    this._fetchUser().then(() => {
      this._fetchData()
    })
  }

  reload() {
    this.setState(
      {
        loading: true,
      },
      () => {
        this._fetchData()
      },
    )
  }

  keyExtractor = (item) => item.uuid
  renderCarousel = (imgUrl) => (
    <Carousel style={{width: Metrics.DEVICE_WIDTH, height: Metrics.DEVICE_HEIGHT}}>
      <Image
        style={Style.bottomContainer}
        resizeMode="contain"
        source={{
          uri: imgUrl || null,
        }}
      />
    </Carousel>
  )

  renderViewMore = (onPress) => {
    return (
      <Text onPress={onPress} style={Style.moreBtn}>
        {translate('readMore')}
      </Text>
    )
  }
  renderViewLess = (onPress) => {
    return (
      <Text onPress={onPress} style={Style.moreBtn}>
        {translate('readLess')}
      </Text>
    )
  }
  approveRequest = (uuid, status) => {
    Alert.alert(
      status === 'approval' ? translate('confirmApproval') : translate('confirmRejection'),
      '',
      [
        {
          text: translate('cancel'),
          onPress: () => console.log(uuid),
          style: 'cancel',
        },
        {
          text: translate('confirm'),
          onPress: () => {
            let approval = status === 'approval'
            UserService.approveOrRefuseApplyHistoryRedemption(uuid, approval).then((res) => {
              this.reload()
            })
          },
        },
      ],
      {cancelable: false},
    )
  }

  updateAutoApprove = () => {
    const newValue = !this.state.isAutoApprove
    this.setState({loading: true, isAutoApprove: newValue})
    UserService.updateAutoApprove(newValue).then((res) => {
      this.setState({isAutoApprove: res.data.updateAutoApprove, loading: false})
    })
  }

  render() {
    return (
      <View style={Style.container}>
        <Spinner visible={this.state.loading} />
        <CustomHeader
          title={translate('referrerValidation')}
          leftComponent="back"
          leftIconPress={this.onPressLeftIcon}
        />
        <View style={Style.headerContainer}>
          <Text style={Style.approveTxt}>{translate('autoApprove')}</Text>
          <Switch
            ios_backgroundColor={Colors.lightBlueGrey}
            trackColor={{true: Colors.brightBlue, false: Colors.lightBlueGrey}}
            onValueChange={this.updateAutoApprove}
            value={this.state.isAutoApprove}
          />
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{marginLeft: Metrics.applyRatio(23), marginRight: Metrics.applyRatio(20)}}>
          {this.state.data && this.state.data.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={this.state.data}
              keyExtractor={this.keyExtractor}
              ItemSeparatorComponent={() => {
                return <View style={Style.separatorStyle} />
              }}
              renderItem={({item}) => {
                return item.isApproved === null ? (
                  <View style={Style.listItemStyle}>
                    <View>
                      <Text style={Style.listItemTitle}>{item.redeemed.userName}</Text>
                    </View>
                    <View style={Style.listItemContent}>
                      <Lightbox
                        springConfig={{speed: 100000, bounciness: 0}}
                        swipeToDismiss={true}
                        renderContent={() => this.renderCarousel(item.customerProofImageUrl)}>
                        <Image
                          source={{uri: item.customerProofImageUrl}}
                          style={Style.proofListImg}
                        />
                      </Lightbox>
                      <View style={Style.flexendContainer}>
                        <ViewMoreText
                          numberOfLines={5}
                          renderViewMore={this.renderViewMore}
                          renderViewLess={this.renderViewLess}
                          textStyle={Style.listItemDesc}>
                          <Text>{item.customerDescription}</Text>
                        </ViewMoreText>
                      </View>
                      <View style={Style.listItemButtonContainer}>
                        <TouchableOpacity
                          onPress={() => this.approveRequest(item.uuid, 'approval')}>
                          <Image source={Images.circleCheckIcon} style={Style.validateIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.approveRequest(item.uuid, 'rejection')}>
                          <Image source={Images.circleCloseIcon} style={Style.validateIcon} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View />
                )
              }}
              horizontal={false}
            />
          ) : (
            <View />
          )}
        </ScrollView>
      </View>
    )
  }
}
