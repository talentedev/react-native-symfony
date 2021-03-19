import React, {Component} from 'react'
import {
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import ActiveCom from 'App/Containers/BusinessMainScreen/CampaignView/Active/ActiveCom'
import {PropTypes} from 'prop-types'
import Style from '../CampaignView/CampaignViewStyle'
import StartPromotion from './StartPromotion'
import {translate} from 'App/Services/TranslationService'
import NavigationService from 'App/Services/NavigationService'

export default class Active extends Component {
  constructor(props) {
    super(props)
    this.state = {
      promotionItems: props.dataItem,
      canCreateOfflinePromotion: props.canCreateOfflinePromotion,
      canCreateOnlinePromotion: props.canCreateOnlinePromotion,
      websiteUrl: props.websiteUrl,
      appleStoreUrl: props.appleStoreUrl,
      playStoreUrl: props.playStoreUrl,
    }
  }

  onReloadPromotion = (index) => {
    const {promotionItems} = this.state
    if (promotionItems.length > index) {
      promotionItems.splice(index, 1)
      this.setState({
        promotionItems,
      })
    }
  }

  onPressPromotionDetails = (item, index) => {
    NavigationService.navigate('PromotionDetailsScreen', {
      itemData: item,
      index: index,
      onReloadPromotion: this.onReloadPromotion,
    })
  }

  onPressPromotion = (item, index) => {
    NavigationService.navigate('PromotionDetailScreen', {
      itemData: item,
      index: index,
      onReloadPromotion: this.onReloadPromotion,
    })
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
    const {
      promotionItems,
      canCreateOfflinePromotion,
      canCreateOnlinePromotion,
      websiteUrl,
      appleStoreUrl,
      playStoreUrl,
    } = this.state
    return promotionItems.length > 0 ? (
      <View style={(Style.container, Style.marginHeader)}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={this.props.refreshing} onRefresh={this.props.onRefresh} />
          }>
          <TouchableOpacity style={Style.activeHeader} onPress={this.goToPromotionType}>
            <Text style={Style.startPromotionTxt}>{translate('startAnotherPromotion')}</Text>
          </TouchableOpacity>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={Style.activeStyle}
            data={promotionItems}
            keyExtractor={(item) => item.uuid.toString()}
            extraData={promotionItems}
            renderItem={({item, index}) => (
              <ActiveCom
                item={item}
                index={index}
                onPressPromotion={this.onPressPromotion}
                onPressPromotionDetails={this.onPressPromotionDetails}
              />
            )}
            horizontal={false}
          />
        </ScrollView>
      </View>
    ) : (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={this.props.refreshing} onRefresh={this.props.onRefresh} />
        }>
        <View style={(Style.container, Style.marginHeader)}>
          {this.props.status ? (
            <StartPromotion
              status={this.props.status}
              canCreateOfflinePromotion={canCreateOfflinePromotion}
              canCreateOnlinePromotion={canCreateOnlinePromotion}
              websiteUrl={websiteUrl}
              appleStoreUrl={appleStoreUrl}
              playStoreUrl={playStoreUrl}
            />
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
    )
  }
}
Active.propTypes = {
  dataItem: PropTypes.array.isRequired,
  status: PropTypes.string,
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  canCreateOfflinePromotion: PropTypes.bool,
  canCreateOnlinePromotion: PropTypes.bool,
  websiteUrl: PropTypes.string,
  appleStoreUrl: PropTypes.string,
  playStoreUrl: PropTypes.string,
}

Active.defaultProps = {
  dataItem: [],
}
