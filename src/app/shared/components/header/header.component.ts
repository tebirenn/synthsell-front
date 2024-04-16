import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/api/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [RouterLink],
})
export class HeaderComponent implements OnInit {
    user: any;

    constructor(public authService: AuthService) {}

    ngOnInit() {
        const userString = localStorage.getItem('user');
        if (this.authService.isAuthenticated && userString) {
            this.user = JSON.parse(userString);
        }
    }

    logout(): void {
        this.authService.logout();
    }
}
