// What we SEND to Spring Boot (must match LoginRequestDTO)
export interface LoginRequest {
  username: string;
  password: string;
}

// Step 1 response: password OK, OTP sent (NO JWT yet)
export interface PendingOtpResponse {
  otpRequired: boolean;
  otpToken: string;
  maskedEmail: string;
  message: string;
}

// Step 2 request
export interface VerifyOtpRequest {
  otpToken: string;
  code: string;
}

// Step 2 success response (JWT) — same as before
export interface LoginResponse {
  message: string;
  userId: number;
  username: string;
  role: string;
  accessToken: string;
}
