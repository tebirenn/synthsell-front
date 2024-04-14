export interface UserInterface {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    // last_login: Date;
    // date_joined: Date;
}

export interface UserLoginInterface {
    username: string;
    password: string;
}

export interface UserCreateInterface {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}
