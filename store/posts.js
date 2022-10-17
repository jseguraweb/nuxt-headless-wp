import ApolloClient, { gql } from 'apollo-boost'
import fetch from 'isomorphic-fetch'

const postsQuery = gql`
  query GetPosts(
    $where: RootQueryToPostConnectionWhereArgs
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    posts(
      where: $where
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      nodes {
        id
        slug
        title
        excerpt
        uri
        status
      }
    }
  }
`
const postQuery = gql`
  query GetContentNode($id: ID!) {
    contentNode(id: $id, idType: URI) {
      ... on Post {
        id
        slug
        title
        uri
        status
      }
      ... on Page {
        id
        slug
        title
        uri
        status
      }
    }
  }
`

const client = new ApolloClient({
  uri: 'http://jaimesegura.atwebpages.com/graphql',
  fetch
})

export const state = () => ({
  posts: [
    {
      id: '1',
      slug: 'test-post',
      title: 'Test Post',
      image: 'https://www.fillmurray.com/640/360',
      uri: 'test',
      excerpt: `<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>`,
      status: 'published'
    }
  ],
  pageInfo: {
    endCursor: '',
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: '',
  },
  post: {
    id: '1',
    slug: 'test-post',
    title: 'Test Post',
    image: 'https://www.fillmurray.com/640/360',
    uri: 'test',
    excerpt: `<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>`,
    status: 'published'
  },
})

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts
  },
  setPost(state, post) {
    state.post = post
  },
  setPageInfo(state, pageInfo) {
    state.pageInfo = pageInfo
  },
}

export const actions = {
  async getPosts({ commit }, variables) {
    const result = await client.query({
      query: postsQuery,
      variables,
    });

    const { nodes, pageInfo } = result.data.posts;

    commit('setPosts', nodes)
    commit('setPageInfo', pageInfo)
  },

  async getPost({ commit }, slug) {
    const result = await client.query({
      query: postQuery,
      variables: {
        id: slug
      },
    });

    commit('setPost', result.data.contentNode)
  },
}