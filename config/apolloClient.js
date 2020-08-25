import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
const MYIP = '172.20.10.3:4000'

const client = new ApolloClient({
  uri: "http://54.254.218.69:4000/",
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

export const GET_USERS = gql`
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

export const GET_APPOINTMENTS = gql`
  query GetAppointments{
    appointments {
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

export default client

