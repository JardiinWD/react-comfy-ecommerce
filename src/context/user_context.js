import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {

  /* Destructuring of useAuth */
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0()
  // useState method for user. Initial state set as null
  const [myUser, setMyUser] = useState(null)

  // useEffect method
  useEffect(() => {
    if (isAuthenticated) {
      setMyUser(user)
    } else {
      setMyUser(false)
    }
    // console.log(`"user" : ${user}`);
    // console.log(`"isAuthenticated" : ${isAuthenticated}`);
    // console.log(`"isLoading" : ${isLoading}`);
  }, [isAuthenticated, user, isLoading])

  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
      {children}
    </UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
