import React, {Component} from 'react'
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native'
import CustomTabContent from 'App/Components/CustomTabContent/CustomTabContent'
import NavigationService from 'App/Services/NavigationService'
import Style from 'App/Containers/CustomerMainScreen/BucketView/BucketViewStyle'
import {PropTypes} from 'prop-types'
import {translate} from 'App/Services/TranslationService'
import {Images, ApplicationStyles} from 'App/Theme'

export default class UnReferring extends Component {
  keyExtractor = (item) => item.uuid.toString()

  searchFilterFunction = (promotions) => {
    const data = promotions.filter(function(item) {
      return !item.isReferrer && item.isRedeemed
    })
    return data
  }

  render() {
    const emptyList = [{uuid: 1}, {uuid: 2}, {uuid: 3}, {uuid: 4}]
    const filteredPromotions = this.searchFilterFunction(this.props.data)
    return (
      <View style={Style.listViewContainer}>
        {this.props.loading ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={emptyList}
            keyExtractor={this.keyExtractor}
            renderItem={(item) => (
              <CustomTabContent isExpanded={true} item={item} isReferring={true} loading />
            )}
            horizontal={false}
          />
        ) : (
          <>
            {filteredPromotions.length > 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={this.props.refreshing}
                    onRefresh={this.props.onRefresh}
                  />
                }
                data={filteredPromotions}
                contentContainerStyle={ApplicationStyles.flexGrow1}
                keyExtractor={this.keyExtractor}
                renderItem={(item) => <CustomTabContent item={item} />}
                horizontal={false}
              />
            ) : (
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={this.props.refreshing}
                    onRefresh={this.props.onRefresh}
                  />
                }>
                <View style={Style.centerView}>
                  <View style={Style.emptyContainer}>
                    <Image source={Images.undrawEmpty} style={Style.undrawEmptyImg} />
                    <Text style={Style.emptyTxt}>{translate('comeBackRedeemedOffer')}</Text>
                    <TouchableOpacity
                      style={Style.textWithIcon}
                      onPress={() => NavigationService.navigate('ExploreView')}>
                      <Image source={Images.exploreOffer} style={Style.offerIcon} />
                      <Text style={Style.navigationTxt}>{translate('exploreOffers')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            )}
          </>
        )}
      </View>
    )
  }
}
UnReferring.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
}
