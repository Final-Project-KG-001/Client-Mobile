import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

export const GET_DOCTORS = gql`
  query {
    localDoctors {
      _id
      name
      polyclinic
    }
  }
`

export const LOGIN = gql`
  query {
    login {
      token
      isLogin
      email
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

export const GET_Users = gql`
  query {
    localUsers {
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
  query: GET_DOCTORS,
  data: {
    localDoctors: [
      {
        _id: 1,
        name: "sandi",
        polyclinic: "umum"
      },
      {
        _id: 2,
        name: "fiah",
        polyclinic: "tht"
      }
    ]
  }
})

client.writeQuery({
  query: GET_Users,
  data: {
    localUsers: [
      {
        _id: 1,
        name: 'user1',
        dob: '280920',
        email: 'user1@mail.com',
        password: 'password',
        phoneNumber: '08912345678',
        role: 'user'
      },
      {
        _id: 2,
        name: 'user2',
        dob: '280920',
        email: 'user2@mail.com',
        password: 'password',
        phoneNumber: '08912345678',
        role: 'user'
      }
    ]
  }
})

client.writeQuery({
  query: LOGIN,
  data: {
    login: {
      token: "",
      isLogin: false,
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
        status: "onProcess",
        user: {
          email: "user@mail.com"
        },
        doctor: {
          name: "sandi",
          polyclinic: "umum"
        }
      },
      {
        _id: 2,
        queueNumber: 1,
        status: "waiting",
        user: {
          email: "user1@mail.com"
        },
        doctor: {
          name: "sandi",
          polyclinic: "umum"
        }
      }
    ]
  }
})

export default client
