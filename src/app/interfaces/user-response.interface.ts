import { UserInterface } from '@app/interfaces/user.interface';

export interface UserLoginResponseInterface {
    access: string;
    refresh: string;
    user: UserInterface;
}
