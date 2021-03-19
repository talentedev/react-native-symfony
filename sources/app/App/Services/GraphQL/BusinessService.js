import gql from 'graphql-tag'
// Services or data
import ApolloClientService from 'App/Services/GraphQL/ApolloClientService'

const REPLACE_LOCATION = (businessLocations) => {
  const locationArgs = {
    businessLocations: businessLocations.map((item) => {
      return {
        uuid: item.uuid,
        districtId: parseInt(item.district.id),
        address: item.address,
        caption: item.caption,
      }
    }),
  }
  const locationArgsString = JSON.stringify(locationArgs)
  const graphQLLocationArgs = locationArgsString.replace(/"([^(")"]+)":/g, '$1:')
  const cleanGraphQLLocationArgs = graphQLLocationArgs.slice(1, -1)
  console.log(cleanGraphQLLocationArgs)
  return gql`
    mutation {
      replaceBusinessLocations(${cleanGraphQLLocationArgs}){
        uuid
      }
    }`
}

const REMOVE_INSTAGRAM_INFO = gql`
  mutation {
    removeInstagramInfo {
      id
      instagramId
      instagramUrl
    }
  }
`

const REMOVE_FACEBOOK_INFO = gql`
  mutation {
    removeFacebookInfo {
      id
      facebookId
      facebookUrl
    }
  }
`

const GET_LOGGED_BUSINESS_PAYMENT = gql`
  {
    loggedBusinessPayment {
      uuid
      stripeCardLast4
    }
  }
`
const UPDATE_LOGGED_BUSINESS_PAYMENT = (stripeTokenId) => gql`
  mutation {
    updateLoggedBusinessPayment (stripeTokenId: "${stripeTokenId}") {
      uuid
      stripeCardLast4
    }
  }
`

const replaceBusinessLocations = (businessLocations) =>
  ApolloClientService.client.mutate({
    mutation: REPLACE_LOCATION(businessLocations),
  })

const removeInstagramInfo = () =>
  ApolloClientService.client.mutate({
    mutation: REMOVE_INSTAGRAM_INFO,
  })

const removeFacebookInfo = () =>
  ApolloClientService.client.mutate({
    mutation: REMOVE_FACEBOOK_INFO,
  })

const getLoggedBusinessPayment = () =>
  ApolloClientService.client.query({
    query: GET_LOGGED_BUSINESS_PAYMENT,
    fetchPolicy: 'network-only',
  })

const updateLoggedBusinessPayment = (stripeTokenId) =>
  ApolloClientService.client.mutate({
    mutation: UPDATE_LOGGED_BUSINESS_PAYMENT(stripeTokenId),
  })

export const BusinessService = {
  replaceBusinessLocations,
  removeInstagramInfo,
  removeFacebookInfo,
  getLoggedBusinessPayment,
  updateLoggedBusinessPayment,
}
