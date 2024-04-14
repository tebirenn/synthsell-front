import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of, switchMap, take } from 'rxjs';
import { FormWrapperType } from '@app/types/form-wrapper.type';
import { UserCreateInterface } from '@app/interfaces/user.interface';
import { UsersService } from '@app/api/services/users.service';
import { passwordMatchValidator } from '@app/validators/password.validator';

@Component({
    selector: 'app-registration',
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.css'],
})
export class RegistrationComponent {
    constructor(private usersService: UsersService) {}

    showPassword: boolean = false;
    regForm: FormGroup<FormWrapperType<any>> = new FormGroup<FormWrapperType<any>>(
        {
            username: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            first_name: new FormControl('', Validators.required),
            last_name: new FormControl('', Validators.required),
            password1: new FormControl('', Validators.required),
            password2: new FormControl('', Validators.required),
        },
        { validators: passwordMatchValidator },
    );

    register(): void {
        console.log('done');
        if (this.regForm.invalid) {
            return;
        }
        if (this.regForm.value['password1'] !== this.regForm.value['password2']) {
            return;
        }
        this.registerAction({
            username: this.regForm.value['username'],
            email: this.regForm.value['email'],
            first_name: this.regForm.value['first_name'],
            last_name: this.regForm.value['last_name'],
            password: this.regForm.value['password1'],
        });
    }

    registerAction(dto: UserCreateInterface): any {
        this.usersService
            .create(dto)
            .pipe(
                take(1),
                switchMap((value) => {
                    return of(value);
                }),
            )
            .subscribe();
    }
}
