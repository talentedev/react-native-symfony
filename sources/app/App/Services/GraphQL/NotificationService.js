import gql from 'graphql-tag'
// Services or data
import ApolloClientService from 'App/Services/GraphQL/ApolloClientService'
import {Images} from 'App/Theme'
import NotificationTypeEnum from 'App/Enums/NotificationTypeEnum'

const getIconByType = (civility, type) => {
  switch (type) {
    case NotificationTypeEnum.NEW_REFERRAL:
      return Images.handShake

    case NotificationTypeEnum.WITHDRAW:
      return Images.money

    case NotificationTypeEnum.REFERRED:
      return civility === 'M' ? Images.raiseHandMan : Images.raiseHandWoman

    case NotificationTypeEnum.REDEEMED:
      return Images.fire

    default:
      return null
  }
}

const GET_NOTIFICATIONS = (limit, offset) => gql`
  {
    notifications(limit: ${limit}, offset: ${offset}) {
      count
      items {
        type
        timestamp
        businessName
        amount
      }
    }
  }
`

const getNotifications = (limit, offset) =>
  ApolloClientService.client.query({
    query: GET_NOTIFICATIONS(limit, offset),
    fetchPolicy: 'network-only',
  })

export const NotificationService = {
  getIconByType,
  getNotifications,
}
