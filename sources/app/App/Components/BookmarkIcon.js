import React from 'react'
import {Image, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {PropTypes} from 'prop-types'
import Models from 'App/Models/Models'
import ToastService from 'App/Services/ToastService'
import BookmarksActions from 'App/Stores/Bookmarks/Actions'
import {BookmarksService} from 'App/Services/AsyncStorage/BookmarksService'
import {Images, Metrics} from 'App/Theme'

class BookmarkIcon extends React.Component {
  constructor(props) {
    super(props)
    if (BookmarksService.getBookmarksKey() !== global.bookmarksKey) {
      BookmarksService.changeBookmarksKey(global.bookmarksKey)
      this.props.fetchBookmarks()
    }
  }

  _isInBookmarks = () => {
    return (
      this.props.promotion &&
      this.props.bookmarkedPromotions.find((p) => p.uuid === this.props.promotion.uuid)
    )
  }

  _onIconPressed = () => {
    if (this.props.bookmarkedPromotions) {
      if (this._isInBookmarks()) {
        BookmarksService.removeBookmark(this.props.promotion)
        ToastService.show('Offer removed from your bookmarks 📌')
      } else {
        BookmarksService.addBookmark(this.props.promotion)
        ToastService.show('Offer saved to your bookmarks 📌')
      }
      this.props.fetchBookmarks()
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this._onIconPressed()}
        style={{padding: Metrics.applyRatio(10)}}>
        <Image
          style={{height: Metrics.applyRatio(18), width: Metrics.applyRatio(14)}}
          source={this._isInBookmarks() ? Images.bookmarkCheck : Images.bookmarkUnCheck}
        />
      </TouchableOpacity>
    )
  }
}

BookmarkIcon.propTypes = {
  promotion: Models.promotionPropTypes,
  bookmarkedPromotions: Models.promotionsPropTypes,
  fetchBookmarks: PropTypes.func,
}

const mapStateToProps = (state) => ({
  bookmarkedPromotions: state.bookmarks.bookmarkedPromotions,
})

const mapDispatchToProps = (dispatch) => ({
  fetchBookmarks: () => dispatch(BookmarksActions.fetchBookmarks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkIcon)
