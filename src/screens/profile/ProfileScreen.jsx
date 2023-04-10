import React, { useContext } from 'react'
import { UserInfoScreen } from '../user/UserInfoScreen'
import { LoginScreen } from '../login/LoginScreen'
import { UserContext } from '../../contexts/UserContext'

export const ProfileScreen = () => {
  const { currentUser } = useContext(UserContext)

  return (
    <>
      {currentUser
        ? (
          <UserInfoScreen />
          )
        : (
          <LoginScreen />
          )}
    </>

  )
}
