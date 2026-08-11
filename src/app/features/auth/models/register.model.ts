/** Matches backend UserRequestDTO for public signup */
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  roleId: number;
}

/** Matches backend RoleResponseDTO */
export interface RoleDto {
  roleId: number;
  roleName: string;
  description?: string;
}

/** Matches backend UserResponseDTO (fields we care about after signup) */
export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  roleName?: string;
}
