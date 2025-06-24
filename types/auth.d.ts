import type { User } from './user'

export interface LoginResponse {
    token: string;
    refreshToken?: string;
    expiresIn?: number;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    surname?: string;
    username: string;
    password: string;
    email: string;
    role?: string; // 'USER', 'ADMIN', etc.
    confirmPassword?: string;
}

export interface RegisterResponse {
    username: string;
    role: string;
    token: string;
    refreshToken?: string;
    expiresIn?: number;

    name: string;
    surname?: string;
    email: string;
}


export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: number | null;
}

