import { Injectable, NgZone } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from '@app/api/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanLoad {
    constructor(
        private router: Router,
        private authService: AuthService,
        private ngZone: NgZone,
    ) {}

    canLoad(): boolean {
        if (this.authService.isAuthenticated) {
            return true;
        }
        this.ngZone.run(() => this.router.navigate(['signin']));
        return false;
    }
}
