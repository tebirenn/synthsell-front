import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of, switchMap, take } from 'rxjs';

import { FormWrapperType } from '@app/types/form-wrapper.type';
import { UserLoginInterface } from '@app/interfaces/user.interface';
import { AuthService } from '@app/api/services/auth.service';

@Component({
    selector: 'app-authorization',
    templateUrl: 'authorization.component.html',
    styleUrls: ['authorization.component.css'],
})
export class AuthorizationComponent {
    constructor(private authService: AuthService) {}

    showPassword = false;
    loginForm: FormGroup<FormWrapperType<any>> = new FormGroup<FormWrapperType<any>>({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    ngOnInit() {
        localStorage.clear();
    }

    login(): void {
        if (this.loginForm.invalid) {
            return;
        }
        this.loginAction({
            username: this.loginForm.value['username'],
            password: this.loginForm.value['password'],
        });
    }

    makePasswordVisible(): void {
        this.showPassword = !this.showPassword;
    }

    loginAction(dto: UserLoginInterface): any {
        this.authService
            .auth(dto)
            .pipe(
                take(1),
                switchMap((value) => {
                    return of(value);
                }),
            )
            .subscribe();
    }
}
