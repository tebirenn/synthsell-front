import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('@app/modules/home/home.module').then((m) => m.HomeModule),
            },
            {
                path: 'profile',
                loadChildren: () => import('@app/modules/profile/profile.module').then((m) => m.ProfileModule),
            },
        ],
    },
];

@NgModule({
    declarations: [MainComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HeaderComponent,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
    ],
})
export class MainModule {}
