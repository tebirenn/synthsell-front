import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdCreateComponent } from '@app/modules/ad/ad-create/ad-create.component';
import { AdEditComponent } from '@app/modules/ad/ad-edit/ad-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: 'create',
        component: AdCreateComponent,
    },
];

@NgModule({
    declarations: [AdCreateComponent, AdEditComponent],
    imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class AdModule {}
