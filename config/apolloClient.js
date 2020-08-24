import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
const MYIP = '192.168.100.157:4000'

const client = new ApolloClient({
  uri: `http://${MYIP}`,
  cache: new InMemoryCache()
})

export const IS_LOGIN = gql`
  query {
    isLogin {
      token
      email
    }
  }
`

export const GET_DOCTORS = gql`
  query {
    doctors {
      _id
      name
      polyclinic
    }
  }
`

export const GET_Users = gql`
  query {
    users {
      _id
      name
      dob
      email
      password
      phoneNumber
      role
    }
  }
`

client.writeQuery({
  query: IS_LOGIN,
  data: {
    isLogin: {
      token: "",
      email: ""
    }
  }
})

export default client

