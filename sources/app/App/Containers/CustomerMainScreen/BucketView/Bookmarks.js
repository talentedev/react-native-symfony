import React, {Component} from 'react'
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import CustomTabContent from 'App/Components/CustomTabContent/CustomTabContent'
import NavigationService from 'App/Services/NavigationService'
import Style from 'App/Containers/CustomerMainScreen/BucketView/BucketViewStyle'
import {PropTypes} from 'prop-types'
import {translate} from 'App/Services/TranslationService'
import {Images, ApplicationStyles} from 'App/Theme'
import {connect} from 'react-redux'
import Models from 'App/Models/Models'

class Bookmarks extends Component {
  keyExtractor = (item) => item.uuid.toString()

  searchFilterFunction = (promotions) => {
    const bookmarkedUuids = this.props.bookmarkedPromotions.map((p) => p.uuid)
    return promotions.filter(function(item) {
      return bookmarkedUuids.includes(item.uuid)
    })
  }

  render() {
    const filteredPromotions = this.searchFilterFunction(this.props.data)
    const emptyList = [{uuid: 1}, {uuid: 2}, {uuid: 3}, {uuid: 4}]

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
                contentContainerStyle={ApplicationStyles.flexGrow1}
                refreshControl={
                  <RefreshControl
                    refreshing={this.props.refreshing}
                    onRefresh={this.props.onRefresh}
                  />
                }
                data={filteredPromotions}
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
                    <Text style={Style.emptyTxt}>{translate('comeBackBookmarkedOffer')}</Text>
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
Bookmarks.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  bookmarkedPromotions: Models.promotionsPropTypes,
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  bookmarkedPromotions: state.bookmarks.bookmarkedPromotions,
})

export default connect(mapStateToProps)(Bookmarks)
