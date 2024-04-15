import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, tap } from 'rxjs';

import { Nullable } from '@app/types/nullable.type';
import { UsersService } from '@app/api/services/users.service';
import { authEndpoints } from '@app/api/endpoints/auth.endpoints';
import { UserInterface, UserLoginInterface } from '@app/interfaces/user.interface';
import { UserLoginResponseInterface } from '@app/interfaces/user-response.interface';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = environment.apiUrl;
    private isAuth: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    private currentToken: Nullable<string> = null;
    private currentUser: Nullable<UserInterface> = null;

    constructor(
        private http: HttpClient,
        private ngZone: NgZone,
        private router: Router,
        private usersService: UsersService,
    ) {
        const userString = localStorage.getItem('user');
        const user: UserInterface | null = userString ? JSON.parse(userString) : null;
        const token: string | null = localStorage.getItem('token');
        if (token && user) {
            this.currentToken = token;
            this.currentUser = user;
            this.isAuth.next(true);
            this.getUserAndSaveInLocalStorage(token);
            // this.checkToken();
        }
    }

    auth(user: UserLoginInterface): Observable<UserLoginResponseInterface> {
        return this.http.post<UserLoginResponseInterface>(this.apiUrl + authEndpoints.login(), user).pipe(
            tap((value) => {
                this.currentToken = value.access;
                localStorage.setItem('token', value.access);
                this.isAuth.next(true);
                this.getUserAndSaveInLocalStorage(value.access);
                this.ngZone.run(() => this.router.navigate(['']));
            }),
        );
    }

    logout(): void {
        // return this.http.get(this.apiUrl + authEndpoints.logout()).pipe(
        //     finalize(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.currentToken = null;
        this.currentUser = null;
        this.isAuth.next(false);
        this.ngZone.run(() => this.router.navigate(['signin']));
        //     }),
        // );
    }

    // checkToken(): Observable<unknown> {
    //     return this.usersService.getUserById(this.currentUser.id).pipe(
    //         catchError(() => {
    //             // localStorage.removeItem('user');
    //             localStorage.removeItem('token');
    //             // this.currentUser = this.currentToken = null;
    //             this.isAuth.next(false);
    //             this.ngZone.run(() => this.router.navigate(['login']));
    //             return EMPTY;
    //         }),
    //     );
    // }

    get isAuthenticatedStream(): Observable<boolean> {
        return this.isAuth.asObservable();
    }

    get isAuthenticated(): boolean {
        return !!this.token;
    }

    get token(): Nullable<string> {
        return this.currentToken;
    }

    private getUserAndSaveInLocalStorage(accessToken: string) {
        this.usersService.getUserByToken(accessToken).subscribe((user: UserInterface) => {
            this.currentUser = user;
            localStorage.setItem('user', JSON.stringify(user));
        });
    }

    get user(): Nullable<UserInterface> {
        return this.currentUser;
    }
}
