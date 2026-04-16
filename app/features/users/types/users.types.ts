export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  email: string;
  phone: string;
  username: string;
  role?: string;
  image?: string;
  isDeleted?: boolean;
}

export interface PaginatedUsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  role?: string;
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  age?: number;
  email?: string;
  phone?: string;
  role?: string;
}
