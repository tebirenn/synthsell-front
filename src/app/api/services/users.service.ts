import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { UserCreateInterface, UserInterface } from '@app/interfaces/user.interface';
import { usersEndpoints } from '@app/api/endpoints/users.endpoints';
import { environment } from '@env/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private ngZone: NgZone,
        private router: Router,
    ) {}

    getUserById(id: number): Observable<UserInterface> {
        return this.http.get<UserInterface>(this.apiUrl + usersEndpoints.getOneById(id));
    }

    getUserByToken(accessToken: string): Observable<UserInterface> {
        return this.http.get<UserInterface>(this.apiUrl + usersEndpoints.getOneByToken(), {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    }

    create(user: UserCreateInterface): Observable<UserCreateInterface> {
        return this.http.post<UserCreateInterface>(this.apiUrl + usersEndpoints.createUser(), user).pipe(
            tap((value) => {
                this.ngZone.run(() => this.router.navigate(['/signin']));
            }),
        );
    }

    edit(id: number, user: UserInterface) {
        // to finish later
        return;
    }

    delete(ids: number[]) {
        // to finish later
        return;
    }
}
