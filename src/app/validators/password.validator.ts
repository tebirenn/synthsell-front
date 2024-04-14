import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password1 = control.get('password1');
    const password2 = control.get('password2');

    if (!password1 || !password2) {
        return null;
    }

    return password1 && password2 && password1.value !== password2.value ? { passwordMismatch: true } : null;
};
