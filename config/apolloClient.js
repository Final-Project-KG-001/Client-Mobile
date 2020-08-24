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

export const GET_APPOINTMENT = gql`
  query {
    localAppointment {
      _id
      queueNumber
      status
      user
      doctor
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
  query: GET_APPOINTMENT,
  data: {
    localAppointment: [
      {
        _id: 1,
        queueNumber: 1,
        status: "done",
        user: {
          _id: 1,
          name: 'user1',
          email: "user1@mail.com"
        },
        doctor: {
          _id: 1,
          name: "sandi",
          polyclinic: "umum"
        }
      },
      {
        _id: 2,
        queueNumber: 2,
        status: "onProcess",
        user: {
          _id: 2,
          name: 'user2',
          email: "user2@mail.com"
        },
        doctor: {
          _id: 2,
          name: "sandi",
          polyclinic: "umum"
        }
      },
      {
        _id: 3,
        queueNumber: 3,
        status: "waiting",
        user: {
          _id: 3,
          name: 'user3',
          email: "user3@mail.com"
        },
        doctor: {
          _id: 2,
          name: "fiah",
          polyclinic: "tht"
        }
      }
    ]
  }
})

export default client

