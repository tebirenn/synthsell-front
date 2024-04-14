import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('@app/modules/home/home.module').then((m) => m.HomeModule),
            },
        ],
    },
];

@NgModule({
    declarations: [MainComponent],
    imports: [CommonModule, RouterModule.forChild(routes), HeaderComponent],
})
export class MainModule {}
