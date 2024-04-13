import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from '@app/modules/registration/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: RegistrationComponent,
    },
];

@NgModule({
    declarations: [RegistrationComponent],
    imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class RegistrationModule {}
