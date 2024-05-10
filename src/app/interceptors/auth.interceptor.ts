import { Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '@app/api/services/auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private toastr: ToastrService,
        private ngZone: NgZone,
        private authService: AuthService,
    ) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.authService.token;
        if (token) {
            req = this.addToken(req, token);
        }

        return next.handle(req).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    this.ngZone.run(() => this.router.navigate(['signin']));
                }
                if (error.status === 0) {
                    this.toastr.error('Ошибка доступа к серверу');
                }
                return throwError(error);
            }),
        );
    }

    private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}
