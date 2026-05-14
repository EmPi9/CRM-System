export interface User {
  id: number;
  username: string;
  email: string;
  date: string; 
  isBlocked: boolean;
  roles: Roles[]; 
  phoneNumber: string;
}

export interface UserFilters { 
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isBlocked?: boolean;
  limit?: number;  
  page?: number; 
}

export interface MetaResponse<T> { 
  data: T[]
  meta: {   
    totalAmount: number;   
    sortBy: string;   
    sortOrder: 'asc' | 'desc'; 
  }
}

export interface UserFilters { 
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isBlocked?: boolean;
  limit?: number;  
  page?: number;  
}


enum Roles [
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR"
  USER = "USER"
]