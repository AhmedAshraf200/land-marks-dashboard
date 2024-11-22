export type User ={
  id?:string,
  name?:string,
  email: string,
  password: string,
  isAdmin?: boolean,
}

export type UserResponse = {
  user: User,
  access_token: string
}