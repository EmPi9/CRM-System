export interface UserRegistration { 
  login: string; 
  username: string; 
  password: string; 
  email: string; 
  phoneNumber?: string; 
}

export type Role = ADMIN | USER | MODERATOR;