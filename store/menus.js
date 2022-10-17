import ApolloClient, { gql } from 'apollo-boost'
import fetch from 'isomorphic-fetch'

const mainMenuQuery = gql`
  query getMainMenu($id: ID!) {
    menu(id: $id, idType: NAME) {
      menuItems {
        nodes {
          label
          path
          order
          id
        }
      }
    }
  }
`

const client = new ApolloClient({
  uri: 'http://jaimesegura.atwebpages.com/graphql',
  fetch
})

export const state = () => ({
  mainMenuItems: [
    {
      id: '1',
      path: '/',
      order: '1',
      label: 'Home'
    },
    {
      id: '2',
      path: '/info',
      order: '2',
      label: 'Info'
    },
    {
      id: '3',
      path: '/contact',
      order: '3',
      label: 'Contact'
    }
  ]
})

export const mutations = {
  setMainMenu(state, mainMenuItems) {
    state.mainMenuItems = mainMenuItems
  }
}

export const actions = {
  async getMainMenu({ commit }, name) {
    const result = await client.query({
      query: mainMenuQuery,
      variables: {
        id: name
      }
    });

    const { nodes } = result.data.menu.menuItems;

    commit('setMainMenu', nodes)
  },
}