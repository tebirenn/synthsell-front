import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/api/services/auth.service';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [RouterLink, MatMenuModule, MatButtonModule, MatTooltipModule],
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
