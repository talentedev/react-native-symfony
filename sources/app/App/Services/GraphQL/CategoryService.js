import gql from 'graphql-tag'
import ApolloClientService from 'App/Services/GraphQL/ApolloClientService'

const GET_CATEGORIES = gql`
  {
    categories {
      count
      items {
        id
        label
        isSelected
        iconWhiteUrl
        iconGreyUrl
        iconBlackUrl
        subCategories {
          items {
            id
            label
            subCategoryCustomerAverageSpending {
              items {
                id
                region {
                  id
                }
                minAverageSpending
                maxAverageSpending
              }
            }
          }
        }
      }
    }
  }
`

const UPDATE_CUSTOMER_CATEGORIES = (categoryIds) => gql`
  mutation {
    updateCustomerCategories(categoryIds: [${categoryIds.toString()}],)
  }
`

const getCategories = () =>
  ApolloClientService.client.query({
    query: GET_CATEGORIES,
    fetchPolicy: 'network-only',
  })

const updateCustomerCategories = (categoryIds) =>
  ApolloClientService.client.mutate({
    mutation: UPDATE_CUSTOMER_CATEGORIES(categoryIds),
  })

export const CategoryService = {
  getCategories,
  updateCustomerCategories,
}
