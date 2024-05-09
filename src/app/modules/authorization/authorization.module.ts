import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthorizationComponent } from '@app/modules/authorization/authorization.component';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
    {
        path: '',
        component: AuthorizationComponent,
    },
];

@NgModule({
    declarations: [AuthorizationComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
    ],
    providers: [],
    exports: [],
})
export class AuthorizationModule {}
