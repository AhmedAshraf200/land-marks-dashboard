import { User, UserResponse } from '@/app/(auth)/(utils)/types/user.type'
import { AUTH_URL } from '@/app/(auth)/(utils)/constants'
import { loginUser } from '@/app/(auth)/(utils)/api/login'

export const signUpUser = async (user: User): Promise<UserResponse | null> => {

  const response: Response = await fetch(`${AUTH_URL}/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

  if (response.ok) {
    return await loginUser(userDto(user))
  } else {
    return null
  }
}

const userDto = (user: User): User => {
  return { email: user.email, password: user.password }
}