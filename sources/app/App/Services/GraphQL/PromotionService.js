import gql from 'graphql-tag'
// Services or data
import ApolloClientService from 'App/Services/GraphQL/ApolloClientService'

const GET_PROMOTIONS = gql`
  {
    promotions {
      items {
        uuid
        isOnlinePromo
        isReferrer
        isRedeemed
        isReturningAllowed
        budget
        caption
        description
        promoImageUrl
        startDate
        endDate
        redemptionCount
        referralCount
        myRedemptionCount
        status
        earnedOrPaid
        isOnlinePromo
        isWebUrl
        onlineTransactionType
        onlinePromoPricing {
          id
          customerMinSpending
          customerMaxSpending
          charge
          referrerShare
          redeemerShare
          ambassadorShare
        }
        refers {
          count
        }
        business {
          id
          businessName
          profileImageUrl
          description
          websiteUrl
          appleStoreUrl
          playStoreUrl
          category {
            id
            label
            iconWhiteUrl
            iconGreyUrl
            iconBlackUrl
          }
          subCategory {
            id
          }
        }
        businessLocations {
          uuid
          district {
            id
            name
          }
          caption
          address
        }
        referrerShare
      }
    }
  }
`
const GET_PROMOTION = (id) => gql`
  {
    promotion(id: "${id}") {
      uuid
      isReferrer
      isRedeemed
      isReturningAllowed
      budget
      caption
      description
      promoImageUrl
      startDate
      endDate
      redemptionCount
      referralCount
      myRedemptionCount
      status
      earnedOrPaid
      isOnlinePromo
      isWebUrl
      onlinePromoPricing {
        id
        customerMinSpending
        customerMaxSpending
        charge
        referrerShare
        redeemerShare
        ambassadorShare
      }
      refers {
        count
      }
      business {
        id
        businessName
        profileImageUrl
        description
        websiteUrl
        appleStoreUrl
        playStoreUrl
        category {
          id
          label
          iconWhiteUrl
          iconGreyUrl
          iconBlackUrl
        }
        subCategory {
          id
        }
      }
      businessLocations {
        uuid
        district {
          id
          name
        }
        caption
        address
      }
      referrerShare
    }
  }
`

const GET_PROMOTION_TOS = (id) => gql`
  {
    promotion(id: "${id}") {
      uuid
      termsOfService
    }
  }
`

const GET_PROMOTIONS_BY_CUSTOMER_CATEGORIES = gql`
  {
    promotionsByCustomerCategories {
      uuid
      isReferrer
      isRedeemed
      isReturningAllowed
      budget
      caption
      description
      promoImageUrl
      startDate
      endDate
      redemptionCount
      referralCount
      myRedemptionCount
      status
      earnedOrPaid
      isOnlinePromo
      isWebUrl
      onlineTransactionType
      onlinePromoPricing {
        id
        customerMinSpending
        customerMaxSpending
        charge
        referrerShare
        redeemerShare
        ambassadorShare
      }
      refers {
        count
      }
      business {
        id
        businessName
        profileImageUrl
        description
        websiteUrl
        appleStoreUrl
        playStoreUrl
        category {
          id
          label
          iconWhiteUrl
          iconGreyUrl
          iconBlackUrl
        }
        subCategory {
          id
        }
      }
      businessLocations {
        uuid
        district {
          id
          name
        }
        caption
        address
      }
      referrerShare
    }
  }
`

const GET_PROMOTIONS_BY_CATEGORIES = (categoryIds) => gql`
  {
    promotionsByCategories(categoryIds: ${categoryIds}) {
      uuid
      isReferrer
      isRedeemed
      isReturningAllowed
      budget
      caption
      description
      promoImageUrl
      startDate
      endDate
      redemptionCount
      referralCount
      myRedemptionCount
      status
      earnedOrPaid
      isOnlinePromo
      isWebUrl
      onlineTransactionType
      onlinePromoPricing {
        id
        customerMinSpending
        customerMaxSpending
        charge
        referrerShare
        redeemerShare
        ambassadorShare
      }
      refers {
        count
      }
      business {
        id
        businessName
        profileImageUrl
        description
        websiteUrl
        appleStoreUrl
        playStoreUrl
        category {
          id
          label
          iconWhiteUrl
          iconGreyUrl
          iconBlackUrl
        }
        subCategory {
          id
        }
      }
      businessLocations {
        uuid
        district {
          id
          name
        }
        caption
        address
      }
      referrerShare
    }
  }
`

const GET_PROMOTIONS_BY_BUSINESS = gql`
  {
    loggedBusinessPromotions {
      uuid
      isOnlinePromo
      targetNumber
      isReferrer
      isRedeemed
      isReturningAllowed
      budget
      caption
      description
      promoImageUrl
      startDate
      endDate
      status
      rejectedReason
      redemptionCount
      referralCount
      earnedOrPaid
      isOnlinePromo
      isWebUrl
      onlineTransactionType
      onlinePromoPricing {
        id
        customerMinSpending
        customerMaxSpending
        charge
        referrerShare
        redeemerShare
        ambassadorShare
      }
      isActive
      refers {
        count
      }
      business {
        id
        businessName
        profileImageUrl
        description
        websiteUrl
        appleStoreUrl
        playStoreUrl
        category {
          id
          label
          iconWhiteUrl
          iconGreyUrl
          iconBlackUrl
        }
        subCategory {
          id
        }
      }
      businessLocations {
        uuid
        district {
          id
          name
        }
        caption
        address
      }
      referrerShare
    }
  }
`
const GET_PROMOTIONS_BY_BUSINESS_SEARCH = (id) => gql`{
  businessPromotions(businessId: "${id}") {
    uuid
    isReferrer
    isRedeemed
    isReturningAllowed
    budget
    caption
    description
    promoImageUrl
    startDate
    endDate
    status
    redemptionCount
    referralCount
    earnedOrPaid
    isOnlinePromo
    isWebUrl
    onlineTransactionType
    onlinePromoPricing {
      id
      customerMinSpending
      customerMaxSpending
      charge
      referrerShare
      redeemerShare
      ambassadorShare
    }
    refers {
      count
    }
    business {
      id
      businessName
      profileImageUrl
      description
      websiteUrl
      appleStoreUrl
      playStoreUrl
      category {
        id
        label
        iconWhiteUrl
        iconGreyUrl
        iconBlackUrl
      }
      subCategory {
        id
      }
    }
    businessLocations {
      uuid
      district {
        id
        name
      }
      caption
      address
    }
    referrerShare
  }
}`

const GET_REFERRED_PROMOTIONS = gql`
  {
    loggedCustomerReferredPromotions {
      uuid
      isReferrer
      isRedeemed
      isReturningAllowed
      budget
      caption
      description
      promoImageUrl
      startDate
      endDate
      status
      redemptionCount
      referralCount
      myRedemptionCount
      earnedOrPaid
      isOnlinePromo
      isWebUrl
      onlineTransactionType
      onlinePromoPricing {
        id
        customerMinSpending
        customerMaxSpending
        charge
        referrerShare
        redeemerShare
        ambassadorShare
      }
      refers {
        count
      }
      business {
        id
        businessName
        profileImageUrl
        description
        websiteUrl
        appleStoreUrl
        playStoreUrl
        category {
          id
          label
          iconWhiteUrl
          iconGreyUrl
          iconBlackUrl
        }
        subCategory {
          id
        }
      }
      businessLocations {
        uuid
        district {
          id
          name
        }
        caption
        address
      }
      referrerShare
    }
  }
`

const GET_LOGGED_CUSTOMER_PENDING_ONLINE_REDEMPTIONS = gql`
  {
    loggedCustomerPendingOnlineRedemptions {
      uuid
      promotion {
        uuid
        caption
        business {
          id
          userName
        }
      }
      onlineRedemptionInvoiceNumber
      onlineRedemptionTransactionValue
      isApproved
      createdDate
    }
  }
`

const SEARCH_BUSINESS_PROMOTION = (text, categoryId) => gql`
  {
    allApprovedBusiness {
      items {
        id
        businessName
        profileImageUrl
        category {
          id
          label
          iconWhiteUrl
          iconGreyUrl
          iconBlackUrl
        }
        subCategory {
          id
        }
        searchPromotions(text: "${text}", categoryId: ${categoryId}) {
          uuid
          isReferrer
          isRedeemed
          isReturningAllowed
          budget
          caption
          description
          promoImageUrl
          startDate
          endDate
          status
          redemptionCount
          referralCount
          myRedemptionCount
          earnedOrPaid
          isOnlinePromo
          isWebUrl
          onlineTransactionType
          onlinePromoPricing {
            id
            customerMinSpending
            customerMaxSpending
            charge
            referrerShare
            redeemerShare
            ambassadorShare
          }
          refers {
            count
          }
          business {
            id
            businessName
            profileImageUrl
            description
            websiteUrl
            appleStoreUrl
            playStoreUrl
            category {
              id
              label
              iconWhiteUrl
              iconGreyUrl
              iconBlackUrl
            }
            subCategory {
              id
            }
          }
          businessLocations {
            uuid
            district {
              id
              name
            }
            caption
            address
          }
          referrerShare
        }
      }
    }
  }
`

const GET_REFERRED_PROMOTIONS_OTHER = (id) => gql`
  {
    customerReferredPromotions(customerId: "${id}") {
      uuid
      isReferrer
      isRedeemed
      isReturningAllowed
      budget
      caption
      description
      promoImageUrl
      startDate
      endDate
      status
      redemptionCount
      referralCount
      earnedOrPaid
      isOnlinePromo
      isWebUrl
      onlineTransactionType
      onlinePromoPricing {
        id
        customerMinSpending
        customerMaxSpending
        charge
        referrerShare
        redeemerShare
        ambassadorShare
      }
      refers {
        count
      }
      business {
        id
        businessName
        profileImageUrl
        description
        websiteUrl
        appleStoreUrl
        playStoreUrl
        category {
          id
          label
          iconWhiteUrl
          iconGreyUrl
          iconBlackUrl
        }
        subCategory {
          id
        }
      }
      businessLocations {
        uuid
        district {
          id
          name
        }
        caption
        address
      }
      referrerShare
    }
  }
`
const CREATE_OR_UPDATE_ONLINE_PROMOTION = (
  uuid,
  isWebUrl,
  targetNumber,
  caption,
  description,
  termsOfService,
  promoImageUrl,
  startDate,
  endDate,
  onlineTransactionType,
  isReturningAllowed,
) => {
  const promotionArgs = {
    uuid: uuid,
    isWebUrl: isWebUrl,
    targetNumber: targetNumber,
    caption: caption,
    description: description,
    termsOfService: termsOfService,
    promoImageUrl: promoImageUrl,
    startDate: startDate,
    endDate: endDate,
    onlineTransactionType: onlineTransactionType,
    isReturningAllowed: isReturningAllowed,
  }
  const promotionArgsString = JSON.stringify(promotionArgs)
  const graphQLPromotionArgs = promotionArgsString.replace(/"([^(")"]+)":/g, '$1:')
  const cleanGraphQLPromotionArgs = graphQLPromotionArgs.slice(1, -1)
  return gql`
  mutation {
    createOrUpdateOnlinePromotion(
    ${cleanGraphQLPromotionArgs}
   ){
    uuid
   }
}
`
}

const CREATE_OR_UPDATE_OFFLINE_PROMOTION = (
  uuid,
  targetNumber,
  caption,
  description,
  termsOfService,
  promoImageUrl,
  startDate,
  endDate,
  promoPassword,
  businessLocations,
  isReturningAllowed,
) => {
  const promotionArgs = {
    uuid: uuid,
    targetNumber: targetNumber,
    caption: caption,
    description: description,
    termsOfService: termsOfService,
    promoImageUrl: promoImageUrl,
    startDate: startDate,
    endDate: endDate,
    passcode: promoPassword,
    businessLocations: businessLocations.map((item) => {
      return {
        uuid: item.uuid,
        districtId: parseInt(item.district.id),
        address: item.address,
        caption: item.caption,
      }
    }),
    isReturningAllowed: isReturningAllowed,
  }
  const promotionArgsString = JSON.stringify(promotionArgs)
  const graphQLPromotionArgs = promotionArgsString.replace(/"([^(")"]+)":/g, '$1:')
  const cleanGraphQLPromotionArgs = graphQLPromotionArgs.slice(1, -1)
  return gql`
  mutation {
    createOrUpdateOfflinePromotion(
    ${cleanGraphQLPromotionArgs}
   ){
    uuid
   }
}
`
}

const UPDATE_LOGGED_BUSINESS = (
  profileImageUrl,
  businessName,
  subCategoryId,
  description,
  email,
  instagramId,
  facebookUrl,
  websiteUrl,
  appleStoreUrl,
  playStoreUrl,
) => {
  profileImageUrl = profileImageUrl ? `"${profileImageUrl}"` : null
  return gql`
  mutation{
    updateLoggedBusiness(
    profileImageUrl:${profileImageUrl},
    businessName: "${businessName}",
    subCategoryId: ${subCategoryId},
    description: """${description}""",
    email: "${email}",
    instagramId: "${instagramId}",
    facebookUrl: "${facebookUrl}",
    websiteUrl: "${websiteUrl}",
    appleStoreUrl: "${appleStoreUrl}",
    playStoreUrl: "${playStoreUrl}",
  ){
   id 
  }
}
`
}

const REDEEM_OFFLINE_PROMOTION = (promotionId, referrerUsername, passcode) => gql`
  mutation {
    redeemOfflinePromotion(promotionId: "${promotionId}", referrerUsername: "${referrerUsername}", passcode: "${passcode}") {
      uuid
    }
  }
`
const REDEEM_ONLINE_PROMOTION = (
  promotionId,
  referrerUsername,
  onlineRedemptionInvoiceNumber,
  onlineRedemptionTransactionValue,
) => gql`
  mutation {
    redeemOnlinePromotion(promotionId: "${promotionId}", referrerUsername: "${referrerUsername}", onlineRedemptionInvoiceNumber: "${onlineRedemptionInvoiceNumber}", onlineRedemptionTransactionValue: "${onlineRedemptionTransactionValue}") {
      uuid
      createdDate
      onlineRedemptionTransactionValue
      onlinePromoPricing {
        id
        customerMinSpending
        customerMaxSpending
        redeemerShare
      }
    }
  }
`

const REFER_PROMOTION = (promotionId) => gql`
  mutation {
    referPromotion(promotionId: "${promotionId}")
  }
`

const getPromotionsGraphql = () =>
  ApolloClientService.client.query({
    query: GET_PROMOTIONS,
    fetchPolicy: 'network-only',
  })
const getPromotionGraphql = (id) =>
  ApolloClientService.client.query({
    query: GET_PROMOTION(id),
    fetchPolicy: 'network-only',
  })
const getPromotionTermsOfService = (id) =>
  ApolloClientService.client.query({
    query: GET_PROMOTION_TOS(id),
    // fetchPolicy: 'network-only',
  })
const getPromotionsByCustomerCategories = () =>
  ApolloClientService.client.query({
    query: GET_PROMOTIONS_BY_CUSTOMER_CATEGORIES,
    fetchPolicy: 'network-only',
  })
const getPromotionsByCategories = (categoryIds) =>
  ApolloClientService.client.query({
    query: GET_PROMOTIONS_BY_CATEGORIES(categoryIds),
    fetchPolicy: 'network-only',
  })

const getPromotionsByBusiness = () =>
  ApolloClientService.client.query({
    query: GET_PROMOTIONS_BY_BUSINESS,
    fetchPolicy: 'network-only',
  })
const getPromotionsByBusinessSearch = (id) =>
  ApolloClientService.client.query({
    query: GET_PROMOTIONS_BY_BUSINESS_SEARCH(id),
    fetchPolicy: 'network-only',
  })

const getReferredPromotions = () =>
  ApolloClientService.client.query({
    query: GET_REFERRED_PROMOTIONS,
    fetchPolicy: 'network-only',
  })
const getReferredPromotionsOther = (id) =>
  ApolloClientService.client.query({
    query: GET_REFERRED_PROMOTIONS_OTHER(id),
    fetchPolicy: 'network-only',
  })

const getLoggedCustomerPendingOnlineRedemptions = () =>
  ApolloClientService.client.query({
    query: GET_LOGGED_CUSTOMER_PENDING_ONLINE_REDEMPTIONS,
    fetchPolicy: 'network-only',
  })

const createOrUpdateOfflinePromotion = (
  uuid,
  targetNumber = 10,
  caption,
  description,
  termsOfService,
  promoImageUrl,
  startDate,
  endDate,
  promoPassword,
  businessLocations = [],
  isReturningAllowed,
) =>
  ApolloClientService.client.mutate({
    mutation: CREATE_OR_UPDATE_OFFLINE_PROMOTION(
      uuid,
      targetNumber,
      caption,
      description,
      termsOfService,
      promoImageUrl,
      startDate,
      endDate,
      promoPassword,
      businessLocations,
      isReturningAllowed,
    ),
  })

const createOrUpdateOnlinePromotion = (
  uuid,
  isWebUrl,
  targetNumber = 10,
  caption,
  description,
  termsOfService,
  promoImageUrl,
  startDate,
  endDate,
  onlineTransactionType,
  isReturningAllowed,
) =>
  ApolloClientService.client.mutate({
    mutation: CREATE_OR_UPDATE_ONLINE_PROMOTION(
      uuid,
      isWebUrl,
      targetNumber,
      caption,
      description,
      termsOfService,
      promoImageUrl,
      startDate,
      endDate,
      onlineTransactionType,
      isReturningAllowed,
    ),
  })

const updateLoggedBusiness = (
  profileImageUrl = null,
  businessName = null,
  subCategoryId = null,
  description = null,
  email = null,
  instagramId = null,
  facebookUrl = null,
  websiteUrl = null,
  appleStoreUrl = null,
  playStoreUrl = null,
) =>
  ApolloClientService.client.mutate({
    mutation: UPDATE_LOGGED_BUSINESS(
      profileImageUrl,
      businessName,
      subCategoryId,
      description,
      email,
      instagramId,
      facebookUrl,
      websiteUrl,
      appleStoreUrl,
      playStoreUrl,
    ),
  })
const redeemOfflinePromotion = (promotionId, referrerUsername, passcode) =>
  ApolloClientService.client.mutate({
    mutation: REDEEM_OFFLINE_PROMOTION(promotionId, referrerUsername, passcode),
  })
const redeemOnlinePromotion = (
  promotionId,
  referrerUsername,
  onlineRedemptionInvoiceNumber,
  onlineRedemptionTransactionValue,
) =>
  ApolloClientService.client.mutate({
    mutation: REDEEM_ONLINE_PROMOTION(
      promotionId,
      referrerUsername,
      onlineRedemptionInvoiceNumber,
      onlineRedemptionTransactionValue,
    ),
  })
const referPromotion = (promotionId) =>
  ApolloClientService.client.mutate({
    mutation: REFER_PROMOTION(promotionId),
  })

const searchBusinessPromotion = (text, categoryId) =>
  ApolloClientService.client.mutate({
    mutation: SEARCH_BUSINESS_PROMOTION(text, categoryId),
  })

export const PromotionService = {
  getPromotionGraphql,
  getPromotionsGraphql,
  getPromotionTermsOfService,
  getPromotionsByCategories,
  getPromotionsByCustomerCategories,
  getPromotionsByBusiness,
  getPromotionsByBusinessSearch,
  getLoggedCustomerPendingOnlineRedemptions,
  updateLoggedBusiness,
  createOrUpdateOfflinePromotion,
  createOrUpdateOnlinePromotion,
  redeemOfflinePromotion,
  redeemOnlinePromotion,
  referPromotion,
  getReferredPromotions,
  getReferredPromotionsOther,
  searchBusinessPromotion,
}
