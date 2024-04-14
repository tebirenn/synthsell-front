import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/api/services/auth.service';
import { Nullable } from '@app/types/nullable.type';
import { UserInterface } from '@app/interfaces/user.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    user: Nullable<UserInterface> | undefined;

    constructor(public authService: AuthService) {}

    ngOnInit() {
        const userString = localStorage.getItem('user');
        if (this.authService.isAuthenticated && userString) {
            this.user = JSON.parse(userString);
        }
    }
}
