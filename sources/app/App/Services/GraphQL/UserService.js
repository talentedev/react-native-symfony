import gql from 'graphql-tag'
// Services or data
import ApolloClientService from 'App/Services/GraphQL/ApolloClientService'
import {TokenService} from 'App/Services/AsyncStorage/TokenService'
import StorageService from 'App/Services/AsyncStorage/StorageService'

const CUSTOMER = 'CUSTOMER'
const BUSINESS = 'BUSINESS'

const BUSINESS_SIGN_UP = (
  token,
  regionId,
  userName,
  businessName,
  subCategoryId,
  email,
  profileImageUrl,
  instagramId,
  facebookUrl,
) => {
  profileImageUrl = profileImageUrl ? `"${profileImageUrl}"` : null
  instagramId = instagramId ? `"${instagramId}"` : null
  facebookUrl = facebookUrl ? `"${facebookUrl}"` : null
  return gql`
  mutation {
    businessSignUp(
      token: "${token}"
      regionId: ${regionId} 
      userName: "${userName}"
      businessName: "${businessName}"
      subCategoryId: ${subCategoryId}
      email: "${email}"
      profileImageUrl: ${profileImageUrl}
      instagramId: ${instagramId}
      facebookUrl: ${facebookUrl}
    )
  }
`
}

const CUSTOMER_SIGN_UP = (
  token,
  regionId,
  userName,
  firstname,
  lastname,
  email,
  birthDate,
  civility,
  categoryIds,
  profileImageUrl,
) => gql`
  mutation {
    customerSignUp(
      token: "${token}"
      regionId: ${regionId}
      userName: "${userName}"
      firstname: "${firstname}"
      lastname: "${lastname}"
      email: "${email}"
      birthDate: "${birthDate}"
      civility: "${civility}"
	  categoryIds: [${categoryIds}]
	  profileImageUrl: "${profileImageUrl}"
    )
  }
`

const SET_LOGGED_CUSTOMER_PAYMENT = (email) => gql`
  mutation {
    setLoggedCustomerPayment(paymentEmail: "${email}") {
      uuid
      paymentEmail
    }
  }
`
const APPROVE_OR_REFUSE_PENDING_ONLINE_REDEMPTION = (uuid, approval) => {
  return gql`
      mutation{
        approveOrRefusePendingOnlineRedemption(uuid:"${uuid}", approval:${approval})
      }
  `
}

const APPROVE_OR_REFUSE_APPLY_HISTORY_REDEMPTION = (uuid, approval) => {
  return gql`
      mutation{
        approveOrRefuseApplyHistoryRedemption(uuid:"${uuid}", approval:${approval})
      }
  `
}

const UPDATE_AUTO_APPROVE = (status) => {
  return gql`
      mutation{
        updateAutoApproveBecomeReferrer(value:${status})
      }
  `
}

const GET_BUSINESS_USER = gql`
  {
    businessUser {
      id
      businessCredit
      isAutoApproveBecomeReferrer
      email
      userName
      phoneNumber
      status
      rejectedReason
      onlinePromoPricing {
        id
        customerMinSpending
        customerMaxSpending
        charge
        referrerShare
        redeemerShare
        ambassadorShare
      }
      category {
        id
        label
        iconWhiteUrl
        iconGreyUrl
        iconBlackUrl
        subCategories {
          items {
            id
            label
          }
        }
      }
      subCategory {
        id
        label
      }
      businessName
      instagramId
      facebookId
      facebookUrl
      websiteUrl
      appleStoreUrl
      playStoreUrl
      profileImageUrl
      description
      passcode
      businessLocations {
        items {
          uuid
          caption
          district {
            id
            name
          }
          address
        }
        count
      }
      offlinePromoPricing {
        id
        charge
        referrerShare
        ambassadorShare
      }
      canCreateOfflinePromotion
      canCreateOnlinePromotion
    }
  }
`

const GET_CUSTOMER_USER = gql`
  {
    customerUser {
      id
      email
      lastname
      firstname
      userName
      phoneNumber
      civility
      birthDate
      instagramId
      profileImageUrl
    }
  }
`
const GET_CUSTOMER_CIVILITY = gql`
  {
    customerUser {
      id
      civility
    }
  }
`
const GET_USER_WITHDRAW = gql`
  {
    transactions {
      items {
        uuid
        status
        amount
        type
        updatedDate
      }
    }
  }
`
const BUSINESS_STRIPE_INVOICE = gql`
  {
    loggedBusinessStripeInvoices {
      id
      amountInCents
      pdfLink
      timestamp
    }
  }
`

const CUSTOMER_OR_BUSINESS = gql`
  {
    customerOrBusiness
  }
`

const LOGOUT = gql`
  {
    logout
  }
`
const SEND_VERIFICATION_SMS = (countryCode, number) => gql`
  mutation {
    sendVerificationSms(countryCode: "${countryCode}", number: "${number}")
  }
`
const SMS_LOGIN = (token) => gql`
  mutation {
    smsLogin(token:"${token}")
  }
`
const GET_ALL_CUSTOMERS = gql`
  {
    customers {
      items {
        id
        userName
        firstname
        lastname
        profileImageUrl
      }
    }
  }
`
const GET_ALL_DISTRICTS = gql`
  {
    districts {
      items {
        id
        name
      }
    }
  }
`
const GET_CUSTOMER_OTHER = (id) => gql`
{
    customer(id: "${id}"){
      id
      email
      lastname
      firstname
      userName
      phoneNumber
      civility
      birthDate
      instagramId
      profileImageUrl
    }
  }`
const GET_BUSINESS_OTHER = (id) => gql`
  {
    business(id: "${id}") {
      id
      email
      userName
      phoneNumber
      status
      rejectedReason
      category {
        id
        label
        iconWhiteUrl
        iconGreyUrl
        iconBlackUrl
        subCategories {
          items {
            id
            label
          }
        }
      }
      subCategory {
        id
        label
      }
      businessName
      instagramId
      facebookId
      facebookUrl
      websiteUrl
      profileImageUrl
      description
      businessLocations {
        items {
          uuid
          caption
          district {
            id
            name
          }
          address
        }
        count
      }
    }
  }
`
const LOGGED_CUSTOMER_WALLET = gql`
  {
    loggedCustomerWallet {
      uuid
      balance
    }
  }
`
const LOGGED_CUSTOMER_PAYMENT = gql`
  {
    loggedCustomerPayment {
      uuid
      paymentEmail
    }
  }
`
const LOGGED_CUSTOMER_TRANSACTIONS = gql`
  {
    loggedCustomerAllTransactions {
      uuid
      status
      business {
        id
        businessName
      }
      amount
      type
      updatedDate
    }
  }
`
const VERIFY_CODE_AND_GET_TOKEN = (countryCode, number, code) => gql`
  mutation {
    verifyCodeAndGetToken(countryCode:"${countryCode}", number:"${number}", code:"${code}")  
    }
`
const VALID_REFERRER_LIST = (promotionId) => gql`
  {
    validReferrerList(promotionId: "${promotionId}") {
      id
      userName
      firstname
      lastname
      profileImageUrl
    }
  }
`

const DELETE_PROMOTION_BY_ID = (id) => gql` 
	mutation{
		deletePromotionById(promotionId: "${id}")
}`

const USERNAME_AVAILABLE = (userName) => gql`
  {
    userNameAvailable (userName: "${userName}")
  }
`

const BUSINESS_REDEMPTION_COUNT = (id) => gql`
{
  businessRedemptionCount(businessId: "${id}")
}
`
const LOGGED_BUSINESS_REDEMPTION_COUNT = gql`
  {
    loggedBusinessRedemptionCount
  }
`
const CUSTOMER_REFERRALS_COUNT = (id) => gql`
{
  customerReferralsCount(customerId: "${id}")
}
`
const LOGGED_CUSTOMER_REFERRALS_COUNT = gql`
  {
    loggedCustomerReferralsCount
  }
`

const UPDATE_BUSINESS_PASSCODE = (passcode) => gql`
  mutation {
    updateBusinessPasscode(passcode: "${passcode}")
  }`
const LOGGED_BUSINESS_ALL_BILLS = gql`
  {
    loggedBusinessAllBills {
      uuid
      amount
      createdDate
      refer {
        redeemed {
          id
          userName
        }
        promotion {
          uuid
        }
      }
    }
  }
`
const GET_LOGGED_BUSINESS_PENDING_REDEEMED_ONLINE_PROMOTIONS = gql`
  {
    loggedBusinessPendingRedeemedOnlinePromotions {
      uuid
      caption
      pendingOnlineRedemption {
        count
        items {
          uuid
          onlinePromoPricing {
            id
            charge
          }
          redeemed {
            id
            userName
          }
          onlineRedemptionInvoiceNumber
          isApproved
          createdDate
        }
      }
    }
  }
`

const GET_LOGGED_BUSINESS_PENDING_APPLY_HISTORY_REDEMPTIONS = gql`
  {
    loggedBusinessPendingApplyHistoryRedemptions {
      uuid
      redeemed {
        id
        userName
      }
      createdDate
      customerDescription
      isApproved
      customerProofImageUrl
    }
  }
`

const businessSignUp = (
  token,
  regionId,
  userName,
  businessName,
  subCategoryId,
  email,
  profileImageUrl,
  instagramId,
  facebookUrl,
) =>
  ApolloClientService.client.mutate({
    mutation: BUSINESS_SIGN_UP(
      token,
      regionId,
      userName,
      businessName,
      subCategoryId,
      email,
      profileImageUrl,
      instagramId,
      facebookUrl,
    ),
  })

const customerSignUp = (
  token,
  regionId,
  userName,
  firstname,
  lastname,
  email,
  birthDate,
  civility,
  categoryIds,
  profileImageUrl,
) =>
  ApolloClientService.client.mutate({
    mutation: CUSTOMER_SIGN_UP(
      token,
      regionId,
      userName,
      firstname,
      lastname,
      email,
      birthDate,
      civility,
      categoryIds,
      profileImageUrl,
    ),
  })

const getBusinessUser = () =>
  ApolloClientService.client.query({
    query: GET_BUSINESS_USER,
    fetchPolicy: 'network-only',
  })
const getBusinessOther = (id) =>
  ApolloClientService.client.query({
    query: GET_BUSINESS_OTHER(id),
    fetchPolicy: 'network-only',
  })

const getCustomerUser = () =>
  ApolloClientService.client.query({
    query: GET_CUSTOMER_USER,
    fetchPolicy: 'network-only',
  })

const getCustomerOther = (id) =>
  ApolloClientService.client.query({
    query: GET_CUSTOMER_OTHER(id),
    fetchPolicy: 'network-only',
  })

const getUserWithdraw = () =>
  ApolloClientService.client.query({
    query: GET_USER_WITHDRAW,
    fetchPolicy: 'network-only',
  })

const isCustomerOrBusiness = () =>
  ApolloClientService.client.mutate({
    mutation: CUSTOMER_OR_BUSINESS,
  })

const setLoggedCustomerPayment = (email) =>
  ApolloClientService.client.mutate({
    mutation: SET_LOGGED_CUSTOMER_PAYMENT(email),
  })

const logoutAndClearTokens = () =>
  ApolloClientService.client
    .query({
      query: LOGOUT,
      fetchPolicy: 'network-only',
    })
    .finally(() => {
      global.storage.remove({
        key: StorageService.USER_PHONE_NUMBER_DATA_KEY,
      })
      TokenService.resetSmsSignInData()
    })

const sendVerificationSms = (countryCode, number) =>
  ApolloClientService.client.mutate({
    mutation: SEND_VERIFICATION_SMS(countryCode, number),
  })

const verifyCodeAndGetToken = (countryCode, number, code) =>
  ApolloClientService.client.mutate({
    mutation: VERIFY_CODE_AND_GET_TOKEN(countryCode, number, code),
  })

const smsLogin = (token) =>
  ApolloClientService.client.mutate({
    mutation: SMS_LOGIN(token),
  })

const getAllCustomers = () =>
  ApolloClientService.client.query({
    query: GET_ALL_CUSTOMERS,
    // fetchPolicy: 'network-only',
  })
const getAllDistricts = () =>
  ApolloClientService.client.query({
    query: GET_ALL_DISTRICTS,
    // fetchPolicy: 'network-only',
  })

const getValidReferrerList = (promotionId) =>
  ApolloClientService.client.query({
    query: VALID_REFERRER_LIST(promotionId),
    fetchPolicy: 'network-only',
  })

const deletePromotionById = (id) =>
  ApolloClientService.client.mutate({
    mutation: DELETE_PROMOTION_BY_ID(id),
    // fetchPolicy: 'network-only',
  })
const isUsernameAvailable = (userName) =>
  ApolloClientService.client.query({
    query: USERNAME_AVAILABLE(userName),
    fetchPolicy: 'network-only',
  })

const getTransactionsData = () =>
  ApolloClientService.client.query({
    query: LOGGED_CUSTOMER_TRANSACTIONS,
    fetchPolicy: 'network-only',
  })
const loggedCustomerWallet = () =>
  ApolloClientService.client.query({
    query: LOGGED_CUSTOMER_WALLET,
    fetchPolicy: 'network-only',
  })

const loggedCustomerPayment = () =>
  ApolloClientService.client.query({
    query: LOGGED_CUSTOMER_PAYMENT,
  })
const getBusinessRedemptionCount = (id) =>
  ApolloClientService.client.query({
    query: BUSINESS_REDEMPTION_COUNT(id),
    fetchPolicy: 'network-only',
  })
const getLoggedBusinessRedemptionCount = () =>
  ApolloClientService.client.query({
    query: LOGGED_BUSINESS_REDEMPTION_COUNT,
    fetchPolicy: 'network-only',
  })
const getCustomerReferralsCount = (id) =>
  ApolloClientService.client.query({
    query: CUSTOMER_REFERRALS_COUNT(id),
    fetchPolicy: 'network-only',
  })
const getLoggedCustomerReferralsCount = () =>
  ApolloClientService.client.query({
    query: LOGGED_CUSTOMER_REFERRALS_COUNT,
    fetchPolicy: 'network-only',
  })

const updateBusinessPasscode = (code) =>
  ApolloClientService.client.mutate({
    mutation: UPDATE_BUSINESS_PASSCODE(code),
    // fetchPolicy: 'network-only',
  })
const getBusinessStripeInvoice = () =>
  ApolloClientService.client.query({
    query: BUSINESS_STRIPE_INVOICE,
    fetchPolicy: 'network-only',
  })
const getLoggedBusinessAllBills = () =>
  ApolloClientService.client.query({
    query: LOGGED_BUSINESS_ALL_BILLS,
    fetchPolicy: 'network-only',
  })
const getCustomerCivility = () =>
  ApolloClientService.client.query({
    query: GET_CUSTOMER_CIVILITY,
    // fetchPolicy: 'network-only', // no need
  })
const getLoggedBusinessPendingRedeemedOnlinePromotions = () =>
  ApolloClientService.client.query({
    query: GET_LOGGED_BUSINESS_PENDING_REDEEMED_ONLINE_PROMOTIONS,
    fetchPolicy: 'network-only', // no need
  })
const approveOrRefusePendingOnlineRedemption = (uuid, approval) =>
  ApolloClientService.client.mutate({
    mutation: APPROVE_OR_REFUSE_PENDING_ONLINE_REDEMPTION(uuid, approval),
  })

const getLoggedBusinessPendingApplyHistoryRedemptions = () =>
  ApolloClientService.client.query({
    query: GET_LOGGED_BUSINESS_PENDING_APPLY_HISTORY_REDEMPTIONS,
    fetchPolicy: 'network-only', // no need
  })
const approveOrRefuseApplyHistoryRedemption = (uuid, approval) =>
  ApolloClientService.client.mutate({
    mutation: APPROVE_OR_REFUSE_APPLY_HISTORY_REDEMPTION(uuid, approval),
  })
const updateAutoApprove = (status) =>
  ApolloClientService.client.mutate({
    mutation: UPDATE_AUTO_APPROVE(status),
  })
export const UserService = {
  CUSTOMER,
  BUSINESS,
  businessSignUp,
  customerSignUp,
  getBusinessUser,
  getCustomerUser,
  isCustomerOrBusiness,
  logoutAndClearTokens,
  sendVerificationSms,
  smsLogin,
  verifyCodeAndGetToken,
  getUserWithdraw,
  getTransactionsData,
  loggedCustomerWallet,
  getValidReferrerList,
  getAllDistricts,
  deletePromotionById,
  isUsernameAvailable,
  getAllCustomers,
  getCustomerOther,
  loggedCustomerPayment,
  getLoggedBusinessPendingRedeemedOnlinePromotions,
  approveOrRefusePendingOnlineRedemption,
  getLoggedBusinessPendingApplyHistoryRedemptions,
  approveOrRefuseApplyHistoryRedemption,
  updateAutoApprove,
  getBusinessRedemptionCount,
  getLoggedBusinessRedemptionCount,
  getCustomerReferralsCount,
  getLoggedCustomerReferralsCount,
  setLoggedCustomerPayment,
  updateBusinessPasscode,
  getBusinessOther,
  getBusinessStripeInvoice,
  getLoggedBusinessAllBills,
  getCustomerCivility,
}
