import {PropTypes} from 'prop-types'

const promotionPropTypes = PropTypes.shape({
  uuid: PropTypes.string.isRequired,
})

const promotionsPropTypes = PropTypes.arrayOf(promotionPropTypes)

export default {
  promotionPropTypes,
  promotionsPropTypes,
}
