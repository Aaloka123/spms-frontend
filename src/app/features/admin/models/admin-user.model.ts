/** Matches backend UserResponseDTO */
export interface AdminUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber?: string | null;
  address?: string | null;
  enabled?: boolean;
  roleName: string;
  createdAt?: string;
  updatedAt?: string;
}
