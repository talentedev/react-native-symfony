import {create} from 'apisauce'
import {Config} from 'App/Config'

/**
 * This is an example of a service that connects to a 3rd party API.
 *
 * Feel free to remove this example from your application.
 */

const instagramApiClient = create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: Config.IG_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

function fetchIGFeedImages(username, count) {
  return instagramApiClient.get(username + '/?__a=1').then((response) => {
    if (
      response.ok &&
      response.data &&
      response.data.graphql &&
      response.data.graphql.user &&
      response.data.graphql.user.edge_owner_to_timeline_media &&
      response.data.graphql.user.edge_owner_to_timeline_media.edges
    ) {
      const edges = response.data.graphql.user.edge_owner_to_timeline_media.edges
      let feedImages = []
      for (let i = 0; i < Math.min(count, edges.length); i++) {
        let feedImage = {
          shortcode: edges[i].node.shortcode,
          uri: edges[i].node.thumbnail_src,
          // uri: edges[i].node.display_url,
        }
        feedImages.push(feedImage)
      }
      return feedImages
    }
    return null
  })
}

export const InstagramService = {
  fetchIGFeedImages,
}
