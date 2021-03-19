import gql from 'graphql-tag'
// Services or data
import ApolloClientService from 'App/Services/GraphQL/ApolloClientService'

const UPDATE_LOGGED_CUSTOMER = (firstname, lastname, email, profileImageUrl, instagramId) => {
  instagramId = instagramId !== null ? `"${instagramId}"` : 'null'
  return gql`
    mutation{
      updateLoggedCustomer(firstname:"${firstname}", lastname:"${lastname}", email: "${email}", profileImageUrl: "${profileImageUrl}", instagramId: ${instagramId}){
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
}

const WITHDRAW = (amount, paypalEmail) => {
  return gql`
    mutation {
      withdraw(amount: "${amount}", paypalEmail: "${paypalEmail}") {
        uuid
        status
      }
    }
  `
}

const updateLoggedCustomer = (
  firstname = null,
  lastname = null,
  email = null,
  profileImageUrl = null,
  instagramId = null,
) =>
  ApolloClientService.client.mutate({
    mutation: UPDATE_LOGGED_CUSTOMER(firstname, lastname, email, profileImageUrl, instagramId),
  })

const withdraw = (amount, paypalEmail) =>
  ApolloClientService.client.mutate({
    mutation: WITHDRAW(amount, paypalEmail),
  })

export const CustomerService = {
  updateLoggedCustomer,
  withdraw,
}
