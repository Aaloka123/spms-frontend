// What we SEND to Spring Boot (must match LoginRequestDTO)
export interface LoginRequest {
  username: string;
  password: string;
}

// What we RECEIVE from Spring Boot (must match LoginResponseDTO)
export interface LoginResponse {
  message: string;
  userId: number;
  username: string;
  role: string;
  accessToken: string;
}
