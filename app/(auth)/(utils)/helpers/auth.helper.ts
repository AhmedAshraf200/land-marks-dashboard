import { User, UserResponse } from '@/app/(auth)/(utils)/types/user.type'

export const saveUserInfo = (userResponse: UserResponse) => {
  localStorage.setItem('user', JSON.stringify(userResponse.user))
  console.log(userResponse.access_token)
  localStorage.setItem('access_token', userResponse.access_token)
}

export const isLoggedIn = () => {
  return !!localStorage.getItem('user')
}

export const logout = (): void => {
  localStorage.removeItem('user')
  localStorage.removeItem('access_token')
}

export const getUsername = (): string | undefined => {
  const localUser: string = localStorage.getItem('user') || ''
  const user: User = JSON.parse(localUser)
  return user.name
}

export const checkIsAdmin = (): boolean => {
  const localUser: string = localStorage.getItem('user') || ''
  const user: User = JSON.parse(localUser)
  console.log(user)
  return user.isAdmin || false;
}
export const getAccessToken = (): string => {
  return localStorage.getItem('access_token') || ''
}

export const requestHeaders = (): any => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAccessToken()}`
  }
}