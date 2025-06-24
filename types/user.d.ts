export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export interface User {
    name: string;
    surname?: string;
    email: string;
    gender?: Gender;
    height?: number;
    weight?: number;
}

export interface UpdateUserPayload {
    name?: string;
    surname?: string;
    email?: string;
    gender?: Gender;
    height?: number;
    weight?: number;
}

export interface UserDto {
    id: string;
    name: string;
    surname?: string;
    email: string;
    gender?: Gender;
    height?: number;
    weight?: number;
}