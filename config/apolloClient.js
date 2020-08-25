import { ApolloClient, InMemoryCache, gql, makeVar, HttpLink, split } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
// const MYIP = '192.168.100.157:4000'

export const currentChange = makeVar({})

const wsLink = new WebSocketLink({
  uri: 'ws://54.254.218.69:4000/graphql',
  options: {
    reconnect: true
  }
})

const httpLink = new HttpLink({
  uri: "http://54.254.218.69:4000/"
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  uri: "http://54.254.218.69:4000/",
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          currentChange: {
            read() {
              return currentChange()
            }
          }
        }
      }
    }
  }),
})

// const client = new ApolloClient({
//   uri: 'http://54.254.218.69:4000/',
//   cache: new InMemoryCache()
// })

export const IS_LOGIN = gql`
  query IsLogin {
    isLogin {
      token
      email
    }
  }
`

export const LOCAL_USER = gql`
  query LocalUser {
    localUser {
      _id
      name
      email
      dob
      phoneNumber
      role
    }
  }
`

export const GET_DOCTORS = gql`
  query GetDoctors($access_token:String) {
    doctors(access_token: $access_token) {
      _id
      name
      polyclinic
    }
  }
`

export const GET_USERS = gql`
  query GetUsers($access_token: String) {
    users(access_token: $access_token) {
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

export const GET_APPOINTMENTS = gql`
  query GetAppointments($access_token:String) {
    appointments(access_token: $access_token) {
      _id
    userId
    doctorId
    queueNumber
    status
    createdAt
    user{
      email
      name
    }
    doctor{
      _id
      name
      polyclinic
    }
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

client.writeQuery({
  query: LOCAL_USER,
  data: {
    localUser: {
      _id: "",
      name: "",
      email: "",
      dob: "",
      phoneNumber: "",
      role: ""
    }
  }
})

export default client

